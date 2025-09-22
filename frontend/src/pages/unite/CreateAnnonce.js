import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { annoncesBackOfficeService, parametresService } from "../../services";
import Input, { Select } from "../../components/Input";
import { Button } from "../../components";
import '../../styles/Parametrage.css';

function CreateAnnonce() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  // const update = query.get("update") || null;
  const savedUnite = JSON.parse(localStorage.getItem("unite"));
  const [unite] = useState(savedUnite);
  const [parametrages, setparametrages] = useState([]);
  const [listePostes, setListePostes] = useState([]);
  const [postes, setPostes] = useState(0);
  const [villes, setVilles] = useState(0);
  const [ageMin, setAgeMin] = useState(0);
  const [ageMax, setAgeMax] = useState(0);
  const [genre, setGenre] = useState(''); // au lieu de 0
  const [langues, setLangues] = useState([]);
  const [qualites, setQualites] = useState([]);
  const [filiereNiveauList, setFiliereNiveauList] = useState([
    { filiere: '', niveau: '' }
  ]);
  const [experiences, setExperiences] = useState([
    { domaine: 0, nbreAnnee: 0 }
  ]);
  const [qcmAnnonce, setQcmAnnonce] = useState(null); // au lieu de false

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await parametresService.getAllParametres();
        setparametrages(response.data);
        const responsePostes = await parametresService.getPostesByIdUnite(parseInt(unite.id_unite));
        setListePostes(responsePostes); // on met directement la liste
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleAnnonce = async () => {
    try {
      if (!genre) {
        alert("Veuillez sélectionner un genre.");
        return;
      }
      if (postes === 0) {
        alert("Veuillez sélectionner un poste.");
        return;
      }
      if (villes === 0) {
        alert("Veuillez sélectionner une ville.");
        return;
      }
      const data = {
        id_poste: parseInt(postes),
        id_ville: parseInt(villes),
        age_min: parseInt(ageMin),
        age_max: parseInt(ageMax),
        id_genre: parseInt(genre),
        id_unite: parseInt(unite.id_unite)
      };
      console.log("Données de l'annonce à envoyer :", data);
      const response = await annoncesBackOfficeService.createAnnonce(data);


      if (response.success) {
        setQcmAnnonce(response.data.id_annonce); // garde l'id de l'annonce créé
        // Préparer le tableau niveau_filiere
        const niveau_filiere = filiereNiveauList.map(item => ({
          id_annonce: response.data.id_annonce,
          id_filiere: parseInt(item.filiere),
          id_niveau: parseInt(item.niveau)
        }));
        // Envoi à l'API
        for (let item of niveau_filiere) {
          await annoncesBackOfficeService.createNiveauFiliere(item);
        }
        const experience = experiences.map(item => ({
          id_annonce: response.data.id_annonce,
          id_domaine: parseInt(item.domaine),
          nombre_annee: parseInt(item.nbreAnnee)
        }));
        for (let item of experience) {
          await annoncesBackOfficeService.createExperienceAnnonce(item);
        }
        const languesData = langues.map(item => ({
          id_annonce: response.data.id_annonce,
          id_langue: parseInt(item)
        }));
        for (let item of languesData) {
          await annoncesBackOfficeService.createLanguesAnnonce(item);
        }
        const qualitesData = qualites.map(item => ({
          id_annonce: response.data.id_annonce,
          id_qualite: parseInt(item)
        }));
        for (let item of qualitesData) {
          await annoncesBackOfficeService.createQualitesAnnonce(item);
        }
        const statusAnnonceData = {
          id_annonce: response.data.id_annonce,
          id_type_status_annonce: 1,
          date_changement: new Date().toISOString().split('T')[0], // juste la date
          id_unite: parseInt(unite.id_unite)
        };
        await annoncesBackOfficeService.statusAnnonce(statusAnnonceData);
        // ici 
        // Réinitialiser les champs du formulaire
        setPostes(0);
        setVilles(0);
        setAgeMin(0);
        setAgeMax(0);
        setGenre('');
        setLangues([]);
        setQualites([]);
        setFiliereNiveauList([{ filiere: '', niveau: '' }]);
        setExperiences([{ domaine: 0, nbreAnnee: 0 }]);
        alert("Annonce créée avec succès !");
        // navigate('/back-office/createQCM');
      } else {
        alert("Erreur lors de la création du niveaux");
      }
    } catch (error) {
      console.error(error);
      alert("Remplissez toutes les informations", error.message);
    }
  };

  const handeQCM = async () => {
    try {
      if (!qcmAnnonce) {
        alert("Veuillez d'abord créer une annonce.");
        return;
      }
      navigate(`/back-office/createQCM/${qcmAnnonce}`);
    } catch (error) {
      console.error(error);
      alert("Erreur de navigation vers le QCM", error);
    }
  };


  return (
    <div>
      <Button
        variant="primary"
        onClick={() => navigate(-1)}
      >
        Retour
      </Button>
      <h1 style={{ textAlign: "center", marginBottom: "50px" }}>Création d'annonce:</h1>
      <main className="App-main" style={{ padding: '20px', justifyContent: "center", display: "flex" }}>
        <div style={{ width: '50%' }}>
          {/* Formulaire d'ajout */}
          <div className="form-container">
            <Select
              label="Poste"
              options={listePostes.data?.map((unite) => ({
                value: unite.id_poste,
                label: unite.valeur
              }))}
              value={postes}
              onChange={(e) => setPostes(e.target.value)}
            />
            <Select
              label="Ville"
              options={parametrages.villes?.map((unite) => ({
                value: unite.id_ville,
                label: unite.valeur
              }))}
              value={villes}
              onChange={(e) => setVilles(e.target.value)}
            />
            <div style={{ display: "flex" }}>
              <Input
                label="Age minimum"
                type="number"
                onChange={(e) => setAgeMin(e.target.value)}
                value={ageMin}
              />
              <Input
                label="Age maximum"
                type="number"
                onChange={(e) => setAgeMax(e.target.value)}
                value={ageMax}
              />
            </div>
            <Select
              label="Genre"
              options={parametrages.genres?.map((unite) => ({
                value: unite.id_genre,
                label: unite.valeur
              }))}
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
            {/* qualites  */}
            <div>
              <label>Qualites</label>
              <div style={{ flexWrap: "wrap", gap: "10px", maxHeight: "150px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                {parametrages.qualites?.map((qualite) => (
                  <label key={qualite.id_qualite} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <input
                      type="checkbox"
                      value={qualite.id_qualite}
                      checked={Array.isArray(qualites) && qualites.includes(qualite.id_qualite)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setQualites([...(qualites || []), qualite.id_qualite]);
                        } else {
                          setQualites((qualites || []).filter((id) => id !== qualite.id_qualite));
                        }
                      }}
                    />
                    {qualite.valeur}
                  </label>
                ))}
              </div>
            </div>
            {/* Filieres et Niveaux */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {filiereNiveauList.map((item, idx) => (
                <div key={idx} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <Select
                    label="Filieres"
                    options={parametrages.filieres?.map((unite) => ({
                      value: unite.id_filiere,
                      label: unite.valeur
                    }))}
                    value={item.filiere}
                    onChange={(e) => {
                      const newList = [...filiereNiveauList];
                      newList[idx].filiere = e.target.value;
                      setFiliereNiveauList(newList);
                    }}
                  />
                  <Select
                    label="Niveaux"
                    options={parametrages.niveaux?.map((unite) => ({
                      value: unite.id_niveau,
                      label: unite.valeur
                    }))}
                    value={item.niveau}
                    onChange={(e) => {
                      const newList = [...filiereNiveauList];
                      newList[idx].niveau = e.target.value;
                      setFiliereNiveauList(newList);
                    }}
                  />
                  {filiereNiveauList.length > 1 && (
                    <Button
                      variant="danger"
                      onClick={() => {
                        setFiliereNiveauList(filiereNiveauList.filter((_, i) => i !== idx));
                      }}
                    >
                      Supprimer
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="primary"
                onClick={() => setFiliereNiveauList([...filiereNiveauList, { filiere: 0, niveau: 0 }])}
              >
                Plus de filiere et niveau
              </Button>
            </div>
            {/* Langues */}
            <div>
              <label>Langues</label>
              <div style={{ flexWrap: "wrap", gap: "10px", maxHeight: "150px", overflowY: "scroll", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                {parametrages.langues?.map((langue) => (
                  <label key={langue.id_langue} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <input
                      type="checkbox"
                      value={langue.id_langue}
                      checked={Array.isArray(langues) && langues.includes(langue.id_langue)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setLangues([...(langues || []), langue.id_langue]);
                        } else {
                          setLangues((langues || []).filter((id) => id !== langue.id_langue));
                        }
                      }}
                    />
                    {langue.valeur}
                  </label>
                ))}
              </div>
            </div>
            {/* Experiences */}
            <h4>Experiences</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {experiences.map((exp, idx) => (
                <div key={idx} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <Select
                    label="Domaine"
                    options={parametrages.domaines?.map((unite) => ({
                      value: unite.id_domaine,
                      label: unite.valeur
                    }))}
                    value={exp.domaine}
                    onChange={(e) => {
                      const newList = [...experiences];
                      newList[idx].domaine = e.target.value;
                      setExperiences(newList);
                    }}
                  />
                  <Input
                    label="Nombre d'année"
                    type="number"
                    onChange={(e) => {
                      const newList = [...experiences];
                      newList[idx].nbreAnnee = e.target.value;
                      setExperiences(newList);
                    }}
                    value={exp.nbreAnnee}
                  />
                  {experiences.length > 1 && (
                    <Button
                      variant="danger"
                      onClick={() => setExperiences(experiences.filter((_, i) => i !== idx))}
                    >
                      Supprimer
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="primary"
                onClick={() => setExperiences([...experiences, { domaine: 0, nbreAnnee: 0 }])}
              >
                Plus d'expérience
              </Button>
              <Button variant="primary" onClick={handleAnnonce}>
                Ajouter l'annonce
              </Button>
              <Button variant="primary" onClick={handeQCM}>
                QCM
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default CreateAnnonce;