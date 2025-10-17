import { useState, useEffect } from "react";
import { useNavigate } from '../../router/useNavigateHelper';
import { ROUTES } from '../../router/routes';
import { annoncesBackOfficeService, parametresService } from "../../services";
import '../../styles/CreateAnnonceUnite.css';

function CreateAnnonce() {
  const navigate = useNavigate();
  const savedUnite = JSON.parse(localStorage.getItem("unite"));
  const [unite] = useState(savedUnite);
  
  // États
  const [parametrages, setParametrages] = useState([]);
  const [listePostes, setListePostes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [createdAnnonceId, setCreatedAnnonceId] = useState(null);

  // Données du formulaire
  const [postes, setPostes] = useState('');
  const [villes, setVilles] = useState('');
  const [ageMin, setAgeMin] = useState('');
  const [ageMax, setAgeMax] = useState('');
  const [genre, setGenre] = useState('');
  const [qualites, setQualites] = useState([]);

  // Avancés: langues, filière/niveau, expériences, QCM
  const [langues, setLangues] = useState([]); // ids
  const [filiereSelection, setFiliereSelection] = useState('');
  const [niveauSelection, setNiveauSelection] = useState('');
  const [niveauFilierePairs, setNiveauFilierePairs] = useState([]); // {id_filiere, id_niveau, filiereLabel, niveauLabel}
  const [experienceList, setExperienceList] = useState([]); // {id_domaine, nombre_annee, domaineLabel}
  const [domaineSelection, setDomaineSelection] = useState('');
  const [anneesExp, setAnneesExp] = useState('');
  const [questionsRepo, setQuestionsRepo] = useState({ questions: [], reponses: [] });
  const [selectedQuestions, setSelectedQuestions] = useState([]); // ids of question_qcm

  // Chargement initial
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await parametresService.getAllParametres();
        setParametrages(response.data);
        const responsePostes = await parametresService.getPostesByIdUnite(parseInt(unite.id_unite));
        setListePostes(responsePostes);
        // Charger questions/réponses pour QCM
        try {
          const qcmQR = await parametresService.getQuestionsReponses();
          setQuestionsRepo(qcmQR.data || { questions: [], reponses: [] });
        } catch (e) {
          // Non bloquant
          setQuestionsRepo({ questions: [], reponses: [] });
        }
      } catch (error) {
        console.error(error);
        setMessage({ type: 'error', text: 'Erreur lors du chargement des données' });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [unite.id_unite]);

  // Gestion des messages
  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  // Soumission du formulaire
  const handleAnnonce = async () => {
    if (!genre || !postes || !villes) {
      showMessage('error', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      setLoading(true);
      const data = {
        age_min: parseInt(ageMin) || 18,
        age_max: parseInt(ageMax) || 65,
        id_poste: parseInt(postes),
        id_ville: parseInt(villes),
        id_genre: parseInt(genre),
        id_unite: parseInt(unite.id_unite)
      };

      const response = await annoncesBackOfficeService.createAnnonce(data);
      if (!response?.success || !response?.data?.id_annonce) {
        throw new Error('Création de l\'annonce échouée');
      }

  const id_annonce = response.data.id_annonce;
  setCreatedAnnonceId(id_annonce);

      // Construit les promesses d'attachement
      const attachPromises = [];

      // Qualités
      if (qualites && qualites.length) {
        qualites.forEach((id_qualite) => {
          attachPromises.push(
            annoncesBackOfficeService.createQualitesAnnonce({ id_annonce, id_qualite })
          );
        });
      }

      // Langues
      if (langues && langues.length) {
        langues.forEach((id_langue) => {
          attachPromises.push(
            annoncesBackOfficeService.createLanguesAnnonce({ id_annonce, id_langue })
          );
        });
      }

      // Filière/Niveau
      if (niveauFilierePairs && niveauFilierePairs.length) {
        niveauFilierePairs.forEach(({ id_filiere, id_niveau }) => {
          attachPromises.push(
            annoncesBackOfficeService.createNiveauFiliere({ id_annonce, id_filiere, id_niveau })
          );
        });
      }

      // Expériences (domaine + années)
      if (experienceList && experienceList.length) {
        experienceList.forEach(({ id_domaine, nombre_annee }) => {
          attachPromises.push(
            annoncesBackOfficeService.createExperienceAnnonce({ id_annonce, id_domaine, nombre_annee: parseInt(nombre_annee) })
          );
        });
      }

      // QCM (questions associées)
      if (selectedQuestions && selectedQuestions.length) {
        selectedQuestions.forEach((id_question_qcm) => {
          attachPromises.push(
            annoncesBackOfficeService.createQcmAnnonce({ id_annonce, id_question_qcm })
          );
        });
      }

      const results = await Promise.allSettled(attachPromises);
      const failures = results.filter(r => r.status === 'rejected');

      if (failures.length) {
        showMessage('error', `Annonce créée mais ${failures.length} attachements ont échoué`);
      } else {
        showMessage('success', 'Annonce créée avec toutes les informations');
      }

      // Reset du formulaire
      setPostes('');
      setVilles('');
      setAgeMin('');
      setAgeMax('');
      setGenre('');
      setQualites([]);
      setLangues([]);
      setFiliereSelection('');
      setNiveauSelection('');
      setNiveauFilierePairs([]);
      setExperienceList([]);
      setDomaineSelection('');
      setAnneesExp('');
      setSelectedQuestions([]);
    } catch (error) {
      console.error(error);
      showMessage('error', 'Erreur lors de la création de l\'annonce');
    } finally {
      setLoading(false);
    }
  };

  // Aller vers la page de création/édition du QCM pour l'annonce créée
  const handleQCM = () => {
    if (!createdAnnonceId) {
      showMessage('error', "Créez d'abord l'annonce pour accéder au QCM");
      return;
    }
    const path = ROUTES.CREATE_QCM.replace(':id', String(createdAnnonceId));
    navigate(path);
  };

  // Gestion des qualités
  const handleQualiteChange = (qualiteId) => {
    if (qualites.includes(qualiteId)) {
      setQualites(qualites.filter(id => id !== qualiteId));
    } else {
      setQualites([...qualites, qualiteId]);
    }
  };

  const handleLangueChange = (langueId) => {
    if (langues.includes(langueId)) {
      setLangues(langues.filter(id => id !== langueId));
    } else {
      setLangues([...langues, langueId]);
    }
  };

  const addNiveauFilierePair = () => {
    if (!filiereSelection || !niveauSelection) return;
    const filiereObj = parametrages.filieres?.find(f => String(f.id_filiere) === String(filiereSelection));
    const niveauObj = parametrages.niveaux?.find(n => String(n.id_niveau) === String(niveauSelection));
    const newPair = {
      id_filiere: parseInt(filiereSelection),
      id_niveau: parseInt(niveauSelection),
      filiereLabel: filiereObj?.valeur || '',
      niveauLabel: niveauObj?.valeur || ''
    };
    // éviter les doublons
    const exists = niveauFilierePairs.some(p => p.id_filiere === newPair.id_filiere && p.id_niveau === newPair.id_niveau);
    if (!exists) setNiveauFilierePairs([...niveauFilierePairs, newPair]);
  };

  const removeNiveauFilierePair = (idx) => {
    setNiveauFilierePairs(niveauFilierePairs.filter((_, i) => i !== idx));
  };

  const addExperience = () => {
    if (!domaineSelection || !anneesExp) return;
    const domaineObj = parametrages.domaines?.find(d => String(d.id_domaine) === String(domaineSelection));
    const exp = {
      id_domaine: parseInt(domaineSelection),
      nombre_annee: parseInt(anneesExp),
      domaineLabel: domaineObj?.valeur || ''
    };
    setExperienceList([...experienceList, exp]);
    setDomaineSelection('');
    setAnneesExp('');
  };

  const removeExperience = (idx) => {
    setExperienceList(experienceList.filter((_, i) => i !== idx));
  };

  const toggleQuestion = (questionId) => {
    if (selectedQuestions.includes(questionId)) {
      setSelectedQuestions(selectedQuestions.filter(id => id !== questionId));
    } else {
      setSelectedQuestions([...selectedQuestions, questionId]);
    }
  };

  return (
    <div className="create-annonce-unite">
      <div className="create-annonce-unite__container">
        <div className="create-annonce-unite__header">
          <button 
            className="create-annonce-unite__btn create-annonce-unite__btn--ghost"
            onClick={() => navigate(-1)}
          >
            ← Retour
          </button>
          <div>
            <h1 className="create-annonce-unite__title">Nouvelle Annonce</h1>
            <p className="create-annonce-unite__subtitle">Créer une offre d'emploi</p>
          </div>
        </div>

        <div className="create-annonce-unite__content">
          {message.text && (
            <div className={`create-annonce-unite__message create-annonce-unite__message--${message.type}`}>
              {message.text}
            </div>
          )}

          <div className="create-annonce-unite__section">
            <h2 className="create-annonce-unite__section-title">Informations principales</h2>
            <div className="create-annonce-unite__form-grid">
              <div className="create-annonce-unite__form-group">
                <label className="create-annonce-unite__label create-annonce-unite__label--required">
                  Poste
                </label>
                <select 
                  className="create-annonce-unite__select"
                  value={postes}
                  onChange={(e) => setPostes(e.target.value)}
                >
                  <option value="">Sélectionnez un poste</option>
                  {listePostes.data?.map((poste) => (
                    <option key={poste.id_poste} value={poste.id_poste}>
                      {poste.valeur}
                    </option>
                  ))}
                </select>
              </div>

              <div className="create-annonce-unite__form-group">
                <label className="create-annonce-unite__label create-annonce-unite__label--required">
                  Ville
                </label>
                <select 
                  className="create-annonce-unite__select"
                  value={villes}
                  onChange={(e) => setVilles(e.target.value)}
                >
                  <option value="">Sélectionnez une ville</option>
                  {parametrages.villes?.map((ville) => (
                    <option key={ville.id_ville} value={ville.id_ville}>
                      {ville.valeur}
                    </option>
                  ))}
                </select>
              </div>

              <div className="create-annonce-unite__form-group">
                <label className="create-annonce-unite__label create-annonce-unite__label--required">
                  Genre
                </label>
                <select 
                  className="create-annonce-unite__select"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                >
                  <option value="">Sélectionnez un genre</option>
                  {parametrages.genres?.map((g) => (
                    <option key={g.id_genre} value={g.id_genre}>
                      {g.valeur}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="create-annonce-unite__form-grid create-annonce-unite__form-grid--two">
              <div className="create-annonce-unite__form-group">
                <label className="create-annonce-unite__label">Âge minimum</label>
                <input
                  type="number"
                  className="create-annonce-unite__input"
                  value={ageMin}
                  onChange={(e) => setAgeMin(e.target.value)}
                  placeholder="18"
                />
              </div>

              <div className="create-annonce-unite__form-group">
                <label className="create-annonce-unite__label">Âge maximum</label>
                <input
                  type="number"
                  className="create-annonce-unite__input"
                  value={ageMax}
                  onChange={(e) => setAgeMax(e.target.value)}
                  placeholder="65"
                />
              </div>
            </div>
          </div>

          <div className="create-annonce-unite__section">
            <h2 className="create-annonce-unite__section-title">Qualités requises</h2>
            <div className="create-annonce-unite__checkbox-grid">
              {parametrages.qualites?.map((qualite) => (
                <div key={qualite.id_qualite} className="create-annonce-unite__checkbox-item">
                  <input
                    type="checkbox"
                    id={`qualite-${qualite.id_qualite}`}
                    checked={qualites.includes(qualite.id_qualite)}
                    onChange={() => handleQualiteChange(qualite.id_qualite)}
                  />
                  <label htmlFor={`qualite-${qualite.id_qualite}`}>
                    {qualite.valeur}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="create-annonce-unite__section">
            <h2 className="create-annonce-unite__section-title">Langues</h2>
            <div className="create-annonce-unite__checkbox-grid">
              {parametrages.langues?.map((langue) => (
                <div key={langue.id_langue} className="create-annonce-unite__checkbox-item">
                  <input
                    type="checkbox"
                    id={`langue-${langue.id_langue}`}
                    checked={langues.includes(langue.id_langue)}
                    onChange={() => handleLangueChange(langue.id_langue)}
                  />
                  <label htmlFor={`langue-${langue.id_langue}`}>
                    {langue.valeur}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="create-annonce-unite__section">
            <h2 className="create-annonce-unite__section-title">Filière et niveau</h2>
            <div className="create-annonce-unite__form-grid create-annonce-unite__form-grid--two">
              <div className="create-annonce-unite__form-group">
                <label className="create-annonce-unite__label">Filière</label>
                <select 
                  className="create-annonce-unite__select"
                  value={filiereSelection}
                  onChange={(e) => setFiliereSelection(e.target.value)}
                >
                  <option value="">Sélectionnez une filière</option>
                  {parametrages.filieres?.map((f) => (
                    <option key={f.id_filiere} value={f.id_filiere}>{f.valeur}</option>
                  ))}
                </select>
              </div>
              <div className="create-annonce-unite__form-group">
                <label className="create-annonce-unite__label">Niveau</label>
                <select 
                  className="create-annonce-unite__select"
                  value={niveauSelection}
                  onChange={(e) => setNiveauSelection(e.target.value)}
                >
                  <option value="">Sélectionnez un niveau</option>
                  {parametrages.niveaux?.map((n) => (
                    <option key={n.id_niveau} value={n.id_niveau}>{n.valeur}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="create-annonce-unite__actions" style={{justifyContent:'flex-start'}}>
              <button className="create-annonce-unite__btn create-annonce-unite__btn--secondary" type="button" onClick={addNiveauFilierePair}>Ajouter</button>
            </div>
            {niveauFilierePairs.length > 0 && (
              <ul className="create-annonce-unite__list">
                {niveauFilierePairs.map((p, idx) => (
                  <li key={`${p.id_filiere}-${p.id_niveau}-${idx}`} className="create-annonce-unite__list-item">
                    {p.filiereLabel} - {p.niveauLabel}
                    <button className="create-annonce-unite__btn create-annonce-unite__btn--ghost" type="button" onClick={() => removeNiveauFilierePair(idx)}>Retirer</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="create-annonce-unite__section">
            <h2 className="create-annonce-unite__section-title">Expériences requises</h2>
            <div className="create-annonce-unite__form-grid create-annonce-unite__form-grid--two">
              <div className="create-annonce-unite__form-group">
                <label className="create-annonce-unite__label">Domaine</label>
                <select 
                  className="create-annonce-unite__select"
                  value={domaineSelection}
                  onChange={(e) => setDomaineSelection(e.target.value)}
                >
                  <option value="">Sélectionnez un domaine</option>
                  {parametrages.domaines?.map((d) => (
                    <option key={d.id_domaine} value={d.id_domaine}>{d.valeur}</option>
                  ))}
                </select>
              </div>
              <div className="create-annonce-unite__form-group">
                <label className="create-annonce-unite__label">Années d'expérience</label>
                <input
                  type="number"
                  className="create-annonce-unite__input"
                  value={anneesExp}
                  onChange={(e) => setAnneesExp(e.target.value)}
                  placeholder="Ex: 2"
                />
              </div>
            </div>
            <div className="create-annonce-unite__actions" style={{justifyContent:'flex-start'}}>
              <button className="create-annonce-unite__btn create-annonce-unite__btn--secondary" type="button" onClick={addExperience}>Ajouter</button>
            </div>
            {experienceList.length > 0 && (
              <ul className="create-annonce-unite__list">
                {experienceList.map((e, idx) => (
                  <li key={`${e.id_domaine}-${idx}`} className="create-annonce-unite__list-item">
                    {e.domaineLabel} - {e.nombre_annee} an(s)
                    <button className="create-annonce-unite__btn create-annonce-unite__btn--ghost" type="button" onClick={() => removeExperience(idx)}>Retirer</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>

        <div className="create-annonce-unite__actions">
          <button 
            className="create-annonce-unite__btn create-annonce-unite__btn--secondary"
            onClick={() => navigate(-1)}
          >
            Annuler
          </button>
          <button
            className="create-annonce-unite__btn create-annonce-unite__btn--ghost"
            onClick={handleQCM}
            disabled={!createdAnnonceId}
            title={!createdAnnonceId ? "Créer d'abord l'annonce pour configurer le QCM" : "Configurer le QCM pour cette annonce"}
          >
            Configurer le QCM
          </button>
          <button
            className="create-annonce-unite__btn create-annonce-unite__btn--primary"
            onClick={handleAnnonce}
            disabled={loading || !genre || !postes || !villes}
          >
            {loading ? 'Création...' : 'Créer l\'annonce'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateAnnonce;
