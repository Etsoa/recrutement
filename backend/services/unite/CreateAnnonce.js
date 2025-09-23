import React from 'react';import { useState, useEffect } from "react";import { useState, useEffect } from "react";

import { useNavigate } from 'react-router-dom';

import { useNavigate, useLocation } from "react-router-dom";import { useNavigate, useLocation } from "react-router-dom";

function CreateAnnonce() {

  const navigate = useNavigate();import { annoncesBackOfficeService, parametresService } from "../../services";import { annoncesBackOfficeService, parametresService } from "../../services";



  return (import '../../styles/CreateAnnonceUnite.css';import '../../styles/CreateAnnonceUnite.css';

    <div className="create-annonce-unite">

      <div className="create-annonce-unite__container">

        <div className="create-annonce-unite__header">

          <h1 className="create-annonce-unite__title">Nouvelle annonce</h1>function CreateAnnonce() {function CreateAnnonce() {

          <p className="create-annonce-unite__subtitle">

            Interface temporairement indisponible - En cours de développement  const navigate = useNavigate();  const navigate = useNavigate();

          </p>

        </div>  const location = useLocation();  const location = useLocation();

        

        <div className="create-annonce-unite__content">  const query = new URLSearchParams(location.search);  const query = new URLSearchParams(location.search);

          <p>Cette page est en cours de développement.</p>

        </div>  const savedUnite = JSON.parse(localStorage.getItem("unite"));  const savedUnite = JSON.parse(localStorage.getItem("unite"));

        

        <div className="create-annonce-unite__actions">  const [unite] = useState(savedUnite);  const [unite] = useState(savedUnite);

          <button

            type="button"  const [parametrages, setparametrages] = useState([]);  const [parametrages, setparametrages] = useState([]);

            className="create-annonce-unite__btn create-annonce-unite__btn--ghost"

            onClick={() => navigate(-1)}  const [listePostes, setListePostes] = useState([]);  const [listePostes, setListePostes] = useState([]);

          >

            Retour  const [postes, setPostes] = useState(0);  const [postes, setPostes] = useState(0);

          </button>

        </div>  const [villes, setVilles] = useState(0);  const [villes, setVilles] = useState(0);

      </div>

    </div>  const [ageMin, setAgeMin] = useState(0);  const [ageMin, setAgeMin] = useState(0);

  );

}  const [ageMax, setAgeMax] = useState(0);  const [ageMax, setAgeMax] = useState(0);



export default CreateAnnonce;  const [genre, setGenre] = useState('');  const [genre, setGenre] = useState('');

  const [langues, setLangues] = useState([]);  const [langues, setLangues] = useState([]);

  const [qualites, setQualites] = useState([]);  const [qualites, setQualites] = useState([]);

  const [filiereNiveauList, setFiliereNiveauList] = useState([  const [filiereNiveauList, setFiliereNiveauList] = useState([

    { filiere: '', niveau: '' }    { filiere: '', niveau: '' }

  ]);  ]);

  const [experiences, setExperiences] = useState([  const [experiences, setExperiences] = useState([

    { domaine: 0, nbreAnnee: 0 }    { domaine: 0, nbreAnnee: 0 }

  ]);  ]);

  const [qcmAnnonce, setQcmAnnonce] = useState(null);  const [qcmAnnonce, setQcmAnnonce] = useState(null);



  useEffect(() => {  useEffect(() => {

    const fetchData = async () => {    const fetchData = async () => {

      try {      try {

        const response = await parametresService.getAllParametres();        const response = await parametresService.getAllParametres();

        setparametrages(response.data);        setparametrages(response.data);

        const responsePostes = await parametresService.getPostesByIdUnite(parseInt(unite.id_unite));        const responsePostes = await parametresService.getPostesByIdUnite(parseInt(unite.id_unite));

        setListePostes(responsePostes);        setListePostes(responsePostes);

      } catch (error) {      } catch (error) {

        console.error(error);        console.error(error);

      }      }

    };    };

    fetchData();    fetchData();

  }, [unite.id_unite]);  }, [unite.id_unite]);



  const handleAnnonce = async () => {  const handleAnnonce = async () => {

    try {    try {

      if (!genre || postes === 0 || villes === 0) {      if (!genre || postes === 0 || villes === 0) {

        alert("Veuillez remplir tous les champs obligatoires.");        alert("Veuillez remplir tous les champs obligatoires.");

        return;        return;

      }      }



      const body = {      const body = {

        id_poste: parseInt(postes),        id_poste: parseInt(postes),

        id_ville: parseInt(villes),        id_ville: parseInt(villes),

        age_min: parseInt(ageMin) || 18,        age_min: parseInt(ageMin) || 18,

        age_max: parseInt(ageMax) || 65,        age_max: parseInt(ageMax) || 65,

        id_genre: parseInt(genre),        id_genre: parseInt(genre),

        langues: Array.isArray(langues) ? langues.map(id => parseInt(id)) : [],        langues: Array.isArray(langues) ? langues.map(id => parseInt(id)) : [],

        qualites: Array.isArray(qualites) ? qualites.map(id => parseInt(id)) : [],        qualites: Array.isArray(qualites) ? qualites.map(id => parseInt(id)) : [],

        filiere_niveau: filiereNiveauList.filter(item => item.filiere && item.niveau).map(item => ({        filiere_niveau: filiereNiveauList.filter(item => item.filiere && item.niveau).map(item => ({

          filiere: parseInt(item.filiere),          filiere: parseInt(item.filiere),

          niveau: parseInt(item.niveau)          niveau: parseInt(item.niveau)

        })),        })),

        experiences: experiences.filter(item => item.domaine && item.nbreAnnee > 0).map(item => ({        experiences: experiences.filter(item => item.domaine && item.nbreAnnee > 0).map(item => ({

          domaine: parseInt(item.domaine),          domaine: parseInt(item.domaine),

          nbreAnnee: parseInt(item.nbreAnnee)          nbreAnnee: parseInt(item.nbreAnnee)

        })),        })),

        qcmAnnonce: qcmAnnonce ? parseInt(qcmAnnonce) : null        qcmAnnonce: qcmAnnonce ? parseInt(qcmAnnonce) : null

      };      };



      const response = await annoncesBackOfficeService.createAnnonceUnite(body);      const response = await annoncesBackOfficeService.createAnnonceUnite(body);

      console.log('Annonce créée:', response);      console.log('Annonce créée:', response);

      alert("Annonce créée avec succès !");      alert("Annonce créée avec succès !");

      navigate('/unite/annonces');      navigate('/unite/annonces');

    } catch (error) {    } catch (error) {

      console.error("Erreur création annonce:", error);      console.error("Erreur création annonce:", error);

      alert("Erreur lors de la création de l'annonce");      alert("Erreur lors de la création de l'annonce");

    }    }

  };  };



  return (  return (

    <div className="create-annonce-unite">    <div className="create-annonce-unite">

      <div className="create-annonce-unite__container">      <div className="create-annonce-unite__container">

        {/* Header */}        {/* Header */}

        <div className="create-annonce-unite__header">        <div className="create-annonce-unite__header">

          <h1 className="create-annonce-unite__title">Nouvelle annonce</h1>          <h1 className="create-annonce-unite__title">Nouvelle annonce</h1>

          <p className="create-annonce-unite__subtitle">          <p className="create-annonce-unite__subtitle">

            Créez une nouvelle offre d'emploi pour votre unité            Créez une nouvelle offre d'emploi pour votre unité

          </p>          </p>

        </div>        </div>



        {/* Contenu principal */}        {/* Contenu principal */}

        <div className="create-annonce-unite__content">        <div className="create-annonce-unite__content">

          {/* Informations de base */}          {/* Informations de base */}

          <div className="create-annonce-unite__section">          <div className="create-annonce-unite__section">

            <h3 className="create-annonce-unite__section-title">Informations générales</h3>            <h3 className="create-annonce-unite__section-title">Informations générales</h3>

            <div className="create-annonce-unite__form-grid create-annonce-unite__form-grid--two">            <div className="create-annonce-unite__form-grid create-annonce-unite__form-grid--two">

              <div className="create-annonce-unite__form-group">              <div className="create-annonce-unite__form-group">

                <label className="create-annonce-unite__label create-annonce-unite__label--required">Poste</label>                <label className="create-annonce-unite__label create-annonce-unite__label--required">Poste</label>

                <select                 <select 

                  className="create-annonce-unite__select"                  className="create-annonce-unite__select"

                  value={postes}                  value={postes}

                  onChange={(e) => setPostes(e.target.value)}                  onChange={(e) => setPostes(e.target.value)}

                >                >

                  <option value="">Sélectionnez un poste</option>                  <option value="">Sélectionnez un poste</option>

                  {listePostes.data?.map((poste) => (                  {listePostes.data?.map((poste) => (

                    <option key={poste.id_poste} value={poste.id_poste}>                    <option key={poste.id_poste} value={poste.id_poste}>

                      {poste.valeur}                      {poste.valeur}

                    </option>                    </option>

                  ))}                  ))}

                </select>                </select>

              </div>              </div>

                            

              <div className="create-annonce-unite__form-group">              <div className="create-annonce-unite__form-group">

                <label className="create-annonce-unite__label create-annonce-unite__label--required">Ville</label>                <label className="create-annonce-unite__label create-annonce-unite__label--required">Ville</label>

                <select                 <select 

                  className="create-annonce-unite__select"                  className="create-annonce-unite__select"

                  value={villes}                  value={villes}

                  onChange={(e) => setVilles(e.target.value)}                  onChange={(e) => setVilles(e.target.value)}

                >                >

                  <option value="">Sélectionnez une ville</option>                  <option value="">Sélectionnez une ville</option>

                  {parametrages.villes?.map((ville) => (                  {parametrages.villes?.map((ville) => (

                    <option key={ville.id_ville} value={ville.id_ville}>                    <option key={ville.id_ville} value={ville.id_ville}>

                      {ville.valeur}                      {ville.valeur}

                    </option>                    </option>

                  ))}                  ))}

                </select>                </select>

              </div>              </div>

            </div>            </div>

          </div>          </div>



          {/* Critères démographiques */}          {/* Critères démographiques */}

          <div className="create-annonce-unite__section">          <div className="create-annonce-unite__section">

            <h3 className="create-annonce-unite__section-title">Critères démographiques</h3>            <h3 className="create-annonce-unite__section-title">Critères démographiques</h3>

            <div className="create-annonce-unite__form-grid create-annonce-unite__form-grid--three">            <div className="create-annonce-unite__form-grid create-annonce-unite__form-grid--three">

              <div className="create-annonce-unite__form-group">              <div className="create-annonce-unite__form-group">

                <label className="create-annonce-unite__label">Âge minimum</label>                <label className="create-annonce-unite__label">Âge minimum</label>

                <input                <input

                  type="number"                  type="number"

                  className="create-annonce-unite__input"                  className="create-annonce-unite__input"

                  value={ageMin}                  value={ageMin}

                  onChange={(e) => setAgeMin(e.target.value)}                  onChange={(e) => setAgeMin(e.target.value)}

                  placeholder="18"                  placeholder="18"

                />                />

              </div>              </div>

                            

              <div className="create-annonce-unite__form-group">              <div className="create-annonce-unite__form-group">

                <label className="create-annonce-unite__label">Âge maximum</label>                <label className="create-annonce-unite__label">Âge maximum</label>

                <input                <input

                  type="number"                  type="number"

                  className="create-annonce-unite__input"                  className="create-annonce-unite__input"

                  value={ageMax}                  value={ageMax}

                  onChange={(e) => setAgeMax(e.target.value)}                  onChange={(e) => setAgeMax(e.target.value)}

                  placeholder="65"                  placeholder="65"

                />                />

              </div>              </div>

                            

              <div className="create-annonce-unite__form-group">              <div className="create-annonce-unite__form-group">

                <label className="create-annonce-unite__label create-annonce-unite__label--required">Genre</label>                <label className="create-annonce-unite__label create-annonce-unite__label--required">Genre</label>

                <select                 <select 

                  className="create-annonce-unite__select"                  className="create-annonce-unite__select"

                  value={genre}                  value={genre}

                  onChange={(e) => setGenre(e.target.value)}                  onChange={(e) => setGenre(e.target.value)}

                >                >

                  <option value="">Sélectionnez le genre</option>                  <option value="">Sélectionnez le genre</option>

                  {parametrages.genres?.map((g) => (                  {parametrages.genres?.map((g) => (

                    <option key={g.id_genre} value={g.id_genre}>                    <option key={g.id_genre} value={g.id_genre}>

                      {g.valeur}                      {g.valeur}

                    </option>                    </option>

                  ))}                  ))}

                </select>                </select>

              </div>              </div>

            </div>            </div>

          </div>          </div>



          {/* Qualités requises */}          {/* Qualités requises */}

          <div className="create-annonce-unite__section">          <div className="create-annonce-unite__section">

            <h3 className="create-annonce-unite__section-title">Qualités requises</h3>            <h3 className="create-annonce-unite__section-title">Qualités requises</h3>

            <div className="create-annonce-unite__checkbox-grid">            <div className="create-annonce-unite__checkbox-grid">

              {parametrages.qualites?.map((qualite) => (              {parametrages.qualites?.map((qualite) => (

                <div key={qualite.id_qualite} className="create-annonce-unite__checkbox-item">                <div key={qualite.id_qualite} className="create-annonce-unite__checkbox-item">

                  <input                  <input

                    type="checkbox"                    type="checkbox"

                    id={`qualite-${qualite.id_qualite}`}                    id={`qualite-${qualite.id_qualite}`}

                    value={qualite.id_qualite}                    value={qualite.id_qualite}

                    checked={Array.isArray(qualites) && qualites.includes(qualite.id_qualite)}                    checked={Array.isArray(qualites) && qualites.includes(qualite.id_qualite)}

                    onChange={(e) => {                    onChange={(e) => {

                      if (e.target.checked) {                      if (e.target.checked) {

                        setQualites([...(qualites || []), qualite.id_qualite]);                        setQualites([...(qualites || []), qualite.id_qualite]);

                      } else {                      } else {

                        setQualites((qualites || []).filter((id) => id !== qualite.id_qualite));                        setQualites((qualites || []).filter((id) => id !== qualite.id_qualite));

                      }                      }

                    }}                    }}

                  />                  />

                  <label htmlFor={`qualite-${qualite.id_qualite}`}>                  <label htmlFor={`qualite-${qualite.id_qualite}`}>

                    {qualite.valeur}                    {qualite.valeur}

                  </label>                  </label>

                </div>                </div>

              ))}              ))}

            </div>            </div>

          </div>          </div>



          {/* Formation requise */}          {/* Formation requise */}

          <div className="create-annonce-unite__section">          <div className="create-annonce-unite__section">

            <h3 className="create-annonce-unite__section-title">Formation requise</h3>            <h3 className="create-annonce-unite__section-title">Formation requise</h3>

            <div className="create-annonce-unite__dynamic-list">            <div className="create-annonce-unite__dynamic-list">

              {filiereNiveauList.map((item, idx) => (              {filiereNiveauList.map((item, idx) => (

                <div key={idx} className="create-annonce-unite__dynamic-item">                <div key={idx} className="create-annonce-unite__dynamic-item">

                  {filiereNiveauList.length > 1 && (                  {filiereNiveauList.length > 1 && (

                    <button                    <button

                      type="button"                      type="button"

                      className="create-annonce-unite__remove-btn"                      className="create-annonce-unite__remove-btn"

                      onClick={() => {                      onClick={() => {

                        const newList = filiereNiveauList.filter((_, i) => i !== idx);                        const newList = filiereNiveauList.filter((_, i) => i !== idx);

                        setFiliereNiveauList(newList);                        setFiliereNiveauList(newList);

                      }}                      }}

                    >                    >

                      ×                      ×

                    </button>                    </button>

                  )}                  )}

                                    

                  <div className="create-annonce-unite__form-grid create-annonce-unite__form-grid--two">                  <div className="create-annonce-unite__form-grid create-annonce-unite__form-grid--two">

                    <div className="create-annonce-unite__form-group">                    <div className="create-annonce-unite__form-group">

                      <label className="create-annonce-unite__label">Filière</label>                      <label className="create-annonce-unite__label">Filière</label>

                      <select                      <select

                        className="create-annonce-unite__select"                        className="create-annonce-unite__select"

                        value={item.filiere}                        value={item.filiere}

                        onChange={(e) => {                        onChange={(e) => {

                          const newList = [...filiereNiveauList];                          const newList = [...filiereNiveauList];

                          newList[idx].filiere = e.target.value;                          newList[idx].filiere = e.target.value;

                          setFiliereNiveauList(newList);                          setFiliereNiveauList(newList);

                        }}                        }}

                      >                      >

                        <option value="">Sélectionnez une filière</option>                        <option value="">Sélectionnez une filière</option>

                        {parametrages.filieres?.map((filiere) => (                        {parametrages.filieres?.map((filiere) => (

                          <option key={filiere.id_filiere} value={filiere.id_filiere}>                          <option key={filiere.id_filiere} value={filiere.id_filiere}>

                            {filiere.valeur}                            {filiere.valeur}

                          </option>                          </option>

                        ))}                        ))}

                      </select>                      </select>

                    </div>                    </div>

                                        

                    <div className="create-annonce-unite__form-group">                    <div className="create-annonce-unite__form-group">

                      <label className="create-annonce-unite__label">Niveau</label>                      <label className="create-annonce-unite__label">Niveau</label>

                      <select                      <select

                        className="create-annonce-unite__select"                        className="create-annonce-unite__select"

                        value={item.niveau}                        value={item.niveau}

                        onChange={(e) => {                        onChange={(e) => {

                          const newList = [...filiereNiveauList];                          const newList = [...filiereNiveauList];

                          newList[idx].niveau = e.target.value;                          newList[idx].niveau = e.target.value;

                          setFiliereNiveauList(newList);                          setFiliereNiveauList(newList);

                        }}                        }}

                      >                      >

                        <option value="">Sélectionnez un niveau</option>                        <option value="">Sélectionnez un niveau</option>

                        {parametrages.niveaux?.map((niveau) => (                        {parametrages.niveaux?.map((niveau) => (

                          <option key={niveau.id_niveau} value={niveau.id_niveau}>                          <option key={niveau.id_niveau} value={niveau.id_niveau}>

                            {niveau.valeur}                            {niveau.valeur}

                          </option>                          </option>

                        ))}                        ))}

                      </select>                      </select>

                    </div>                    </div>

                  </div>                  </div>

                </div>                </div>

              ))}              ))}

                            

              <button              <button

                type="button"                type="button"

                className="create-annonce-unite__add-btn"                className="create-annonce-unite__add-btn"

                onClick={() => {                onClick={() => {

                  setFiliereNiveauList([...filiereNiveauList, { filiere: '', niveau: '' }]);                  setFiliereNiveauList([...filiereNiveauList, { filiere: '', niveau: '' }]);

                }}                }}

              >              >

                + Ajouter une formation                + Ajouter une formation

              </button>              </button>

            </div>            </div>

          </div>          </div>



          {/* Expérience requise */}          {/* Expérience requise */}

          <div className="create-annonce-unite__section">          <div className="create-annonce-unite__section">

            <h3 className="create-annonce-unite__section-title">Expérience requise</h3>            <h3 className="create-annonce-unite__section-title">Expérience requise</h3>

            <div className="create-annonce-unite__dynamic-list">            <div className="create-annonce-unite__dynamic-list">

              {experiences.map((item, idx) => (              {experiences.map((item, idx) => (

                <div key={idx} className="create-annonce-unite__dynamic-item">                <div key={idx} className="create-annonce-unite__dynamic-item">

                  {experiences.length > 1 && (                  {experiences.length > 1 && (

                    <button                    <button

                      type="button"                      type="button"

                      className="create-annonce-unite__remove-btn"                      className="create-annonce-unite__remove-btn"

                      onClick={() => {                      onClick={() => {

                        const newList = experiences.filter((_, i) => i !== idx);                        const newList = experiences.filter((_, i) => i !== idx);

                        setExperiences(newList);                        setExperiences(newList);

                      }}                      }}

                    >                    >

                      ×                      ×

                    </button>                    </button>

                  )}                  )}

                                    

                  <div className="create-annonce-unite__form-grid create-annonce-unite__form-grid--two">                  <div className="create-annonce-unite__form-grid create-annonce-unite__form-grid--two">

                    <div className="create-annonce-unite__form-group">                    <div className="create-annonce-unite__form-group">

                      <label className="create-annonce-unite__label">Domaine</label>                      <label className="create-annonce-unite__label">Domaine</label>

                      <select                      <select

                        className="create-annonce-unite__select"                        className="create-annonce-unite__select"

                        value={item.domaine}                        value={item.domaine}

                        onChange={(e) => {                        onChange={(e) => {

                          const newList = [...experiences];                          const newList = [...experiences];

                          newList[idx].domaine = parseInt(e.target.value);                          newList[idx].domaine = parseInt(e.target.value);

                          setExperiences(newList);                          setExperiences(newList);

                        }}                        }}

                      >                      >

                        <option value="">Sélectionnez un domaine</option>                        <option value="">Sélectionnez un domaine</option>

                        {parametrages.domaines?.map((domaine) => (                        {parametrages.domaines?.map((domaine) => (

                          <option key={domaine.id_domaine} value={domaine.id_domaine}>                          <option key={domaine.id_domaine} value={domaine.id_domaine}>

                            {domaine.valeur}                            {domaine.valeur}

                          </option>                          </option>

                        ))}                        ))}

                      </select>                      </select>

                    </div>                    </div>

                                        

                    <div className="create-annonce-unite__form-group">                    <div className="create-annonce-unite__form-group">

                      <label className="create-annonce-unite__label">Années d'expérience</label>                      <label className="create-annonce-unite__label">Années d'expérience</label>

                      <input                      <input

                        type="number"                        type="number"

                        className="create-annonce-unite__input"                        className="create-annonce-unite__input"

                        value={item.nbreAnnee}                        value={item.nbreAnnee}

                        onChange={(e) => {                        onChange={(e) => {

                          const newList = [...experiences];                          const newList = [...experiences];

                          newList[idx].nbreAnnee = parseInt(e.target.value);                          newList[idx].nbreAnnee = parseInt(e.target.value);

                          setExperiences(newList);                          setExperiences(newList);

                        }}                        }}

                        placeholder="0"                        placeholder="0"

                        min="0"                        min="0"

                      />                      />

                    </div>                    </div>

                  </div>                  </div>

                </div>                </div>

              ))}              ))}

                            

              <button              <button

                type="button"                type="button"

                className="create-annonce-unite__add-btn"                className="create-annonce-unite__add-btn"

                onClick={() => {                onClick={() => {

                  setExperiences([...experiences, { domaine: 0, nbreAnnee: 0 }]);                  setExperiences([...experiences, { domaine: 0, nbreAnnee: 0 }]);

                }}                }}

              >              >

                + Ajouter une expérience                + Ajouter une expérience

              </button>              </button>

            </div>            </div>

          </div>          </div>



          {/* Langues */}          {/* Langues */}

          <div className="create-annonce-unite__section">          <div className="create-annonce-unite__section">

            <h3 className="create-annonce-unite__section-title">Langues</h3>            <h3 className="create-annonce-unite__section-title">Langues</h3>

            <div className="create-annonce-unite__checkbox-grid">            <div className="create-annonce-unite__checkbox-grid">

              {parametrages.langues?.map((langue) => (              {parametrages.langues?.map((langue) => (

                <div key={langue.id_langue} className="create-annonce-unite__checkbox-item">                <div key={langue.id_langue} className="create-annonce-unite__checkbox-item">

                  <input                  <input

                    type="checkbox"                    type="checkbox"

                    id={`langue-${langue.id_langue}`}                    id={`langue-${langue.id_langue}`}

                    value={langue.id_langue}                    value={langue.id_langue}

                    checked={Array.isArray(langues) && langues.includes(langue.id_langue)}                    checked={Array.isArray(langues) && langues.includes(langue.id_langue)}

                    onChange={(e) => {                    onChange={(e) => {

                      if (e.target.checked) {                      if (e.target.checked) {

                        setLangues([...(langues || []), langue.id_langue]);                        setLangues([...(langues || []), langue.id_langue]);

                      } else {                      } else {

                        setLangues((langues || []).filter((id) => id !== langue.id_langue));                        setLangues((langues || []).filter((id) => id !== langue.id_langue));

                      }                      }

                    }}                    }}

                  />                  />

                  <label htmlFor={`langue-${langue.id_langue}`}>                  <label htmlFor={`langue-${langue.id_langue}`}>

                    {langue.valeur}                    {langue.valeur}

                  </label>                  </label>

                </div>                </div>

              ))}              ))}

            </div>            </div>

          </div>          </div>



          {/* QCM */}          {/* QCM */}

          <div className="create-annonce-unite__section">          <div className="create-annonce-unite__section">

            <h3 className="create-annonce-unite__section-title">Évaluation</h3>            <h3 className="create-annonce-unite__section-title">Évaluation</h3>

            <div className="create-annonce-unite__form-group">            <div className="create-annonce-unite__form-group">

              <label className="create-annonce-unite__label">QCM associé</label>              <label className="create-annonce-unite__label">QCM associé</label>

              <select               <select 

                className="create-annonce-unite__select"                className="create-annonce-unite__select"

                value={qcmAnnonce || ''}                value={qcmAnnonce || ''}

                onChange={(e) => setQcmAnnonce(e.target.value || null)}                onChange={(e) => setQcmAnnonce(e.target.value || null)}

              >              >

                <option value="">Aucun QCM</option>                <option value="">Aucun QCM</option>

                {parametrages.qcmAnnonces?.map((qcm) => (                {parametrages.qcmAnnonces?.map((qcm) => (

                  <option key={qcm.id_qcm_annonce} value={qcm.id_qcm_annonce}>                  <option key={qcm.id_qcm_annonce} value={qcm.id_qcm_annonce}>

                    {qcm.valeur}                    {qcm.valeur}

                  </option>                  </option>

                ))}                ))}

              </select>              </select>

            </div>            </div>

          </div>          </div>

        </div>        </div>



        {/* Actions */}        {/* Actions */}

        <div className="create-annonce-unite__actions">        <div className="create-annonce-unite__actions">

          <button          <button

            type="button"            type="button"

            className="create-annonce-unite__btn create-annonce-unite__btn--ghost"            className="create-annonce-unite__btn create-annonce-unite__btn--ghost"

            onClick={() => navigate(-1)}            onClick={() => navigate(-1)}

          >          >

            Annuler            Annuler

          </button>          </button>

                    

          <button          <button

            type="button"            type="button"

            className="create-annonce-unite__btn create-annonce-unite__btn--primary"            className="create-annonce-unite__btn create-annonce-unite__btn--primary"

            onClick={handleAnnonce}            onClick={handleAnnonce}

          >          >

            Créer l'annonce            Créer l'annonce

          </button>          </button>

        </div>        </div>

      </div>      </div>

    </div>    </div>

  );  );

}}



export default CreateAnnonce;export default CreateAnnonce;
      const data = {
        id_poste: parseInt(postes),
        id_ville: parseInt(villes),
        age_min: parseInt(ageMin),
        age_max: parseInt(ageMax),
        id_genre: parseInt(genre)
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
    <div className="create-annonce-unite">
      <div className="create-annonce-unite__container">
        {/* Header */}
        <div className="create-annonce-unite__header">
          <h1 className="create-annonce-unite__title">Nouvelle annonce</h1>
          <p className="create-annonce-unite__subtitle">
            Créez une nouvelle offre d'emploi pour votre unité
          </p>
        </div>

        {/* Contenu principal */}
        <div className="create-annonce-unite__content">
          {/* Informations de base */}
          <div className="create-annonce-unite__section">
            <h3 className="create-annonce-unite__section-title">Informations générales</h3>
            <div className="create-annonce-unite__form-grid create-annonce-unite__form-grid--two">
              <div className="create-annonce-unite__form-group">
                <label className="create-annonce-unite__label create-annonce-unite__label--required">Poste</label>
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
                <label className="create-annonce-unite__label create-annonce-unite__label--required">Ville</label>
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
            </div>
          </div>

          {/* Critères démographiques */}
          <div className="create-annonce-unite__section">
            <h3 className="create-annonce-unite__section-title">Critères démographiques</h3>
            <div className="create-annonce-unite__form-grid create-annonce-unite__form-grid--three">
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
              
              <div className="create-annonce-unite__form-group">
                <label className="create-annonce-unite__label create-annonce-unite__label--required">Genre</label>
                <select 
                  className="create-annonce-unite__select"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                >
                  <option value="">Sélectionnez le genre</option>
                  {parametrages.genres?.map((g) => (
                    <option key={g.id_genre} value={g.id_genre}>
                      {g.valeur}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Qualités requises */}
          <div className="create-annonce-unite__section">
            <h3 className="create-annonce-unite__section-title">Qualités requises</h3>
            <div className="create-annonce-unite__checkbox-grid">
              {parametrages.qualites?.map((qualite) => (
                <div key={qualite.id_qualite} className="create-annonce-unite__checkbox-item">
                  <input
                    type="checkbox"
                    id={`qualite-${qualite.id_qualite}`}
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
                  <label htmlFor={`qualite-${qualite.id_qualite}`}>
                    {qualite.valeur}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Formation requise */}
          <div className="create-annonce-unite__section">
            <h3 className="create-annonce-unite__section-title">Formation requise</h3>
            <div className="create-annonce-unite__dynamic-list">
              {filiereNiveauList.map((item, idx) => (
                <div key={idx} className="create-annonce-unite__dynamic-item">
                  {filiereNiveauList.length > 1 && (
                    <button
                      type="button"
                      className="create-annonce-unite__remove-btn"
                      onClick={() => {
                        const newList = filiereNiveauList.filter((_, i) => i !== idx);
                        setFiliereNiveauList(newList);
                      }}
                    >
                      ×
                    </button>
                  )}
                  
                  <div className="create-annonce-unite__form-grid create-annonce-unite__form-grid--two">
                    <div className="create-annonce-unite__form-group">
                      <label className="create-annonce-unite__label">Filière</label>
                      <select
                        className="create-annonce-unite__select"
                        value={item.filiere}
                        onChange={(e) => {
                          const newList = [...filiereNiveauList];
                          newList[idx].filiere = e.target.value;
                          setFiliereNiveauList(newList);
                        }}
                      >
                        <option value="">Sélectionnez une filière</option>
                        {parametrages.filieres?.map((filiere) => (
                          <option key={filiere.id_filiere} value={filiere.id_filiere}>
                            {filiere.valeur}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="create-annonce-unite__form-group">
                      <label className="create-annonce-unite__label">Niveau</label>
                      <select
                        className="create-annonce-unite__select"
                        value={item.niveau}
                        onChange={(e) => {
                          const newList = [...filiereNiveauList];
                          newList[idx].niveau = e.target.value;
                          setFiliereNiveauList(newList);
                        }}
                      >
                        <option value="">Sélectionnez un niveau</option>
                        {parametrages.niveaux?.map((niveau) => (
                          <option key={niveau.id_niveau} value={niveau.id_niveau}>
                            {niveau.valeur}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                className="create-annonce-unite__add-btn"
                onClick={() => {
                  setFiliereNiveauList([...filiereNiveauList, { filiere: '', niveau: '' }]);
                }}
              >
                + Ajouter une formation
              </button>
            </div>
          </div>

          {/* Expérience requise */}
          <div className="create-annonce-unite__section">
            <h3 className="create-annonce-unite__section-title">Expérience requise</h3>
            <div className="create-annonce-unite__dynamic-list">
              {experiences.map((item, idx) => (
                <div key={idx} className="create-annonce-unite__dynamic-item">
                  {experiences.length > 1 && (
                    <button
                      type="button"
                      className="create-annonce-unite__remove-btn"
                      onClick={() => {
                        const newList = experiences.filter((_, i) => i !== idx);
                        setExperiences(newList);
                      }}
                    >
                      ×
                    </button>
                  )}
                  
                  <div className="create-annonce-unite__form-grid create-annonce-unite__form-grid--two">
                    <div className="create-annonce-unite__form-group">
                      <label className="create-annonce-unite__label">Domaine</label>
                      <select
                        className="create-annonce-unite__select"
                        value={item.domaine}
                        onChange={(e) => {
                          const newList = [...experiences];
                          newList[idx].domaine = parseInt(e.target.value);
                          setExperiences(newList);
                        }}
                      >
                        <option value="">Sélectionnez un domaine</option>
                        {parametrages.domaines?.map((domaine) => (
                          <option key={domaine.id_domaine} value={domaine.id_domaine}>
                            {domaine.valeur}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="create-annonce-unite__form-group">
                      <label className="create-annonce-unite__label">Années d'expérience</label>
                      <input
                        type="number"
                        className="create-annonce-unite__input"
                        value={item.nbreAnnee}
                        onChange={(e) => {
                          const newList = [...experiences];
                          newList[idx].nbreAnnee = parseInt(e.target.value);
                          setExperiences(newList);
                        }}
                        placeholder="0"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                className="create-annonce-unite__add-btn"
                onClick={() => {
                  setExperiences([...experiences, { domaine: 0, nbreAnnee: 0 }]);
                }}
              >
                + Ajouter une expérience
              </button>
            </div>
          </div>

          {/* Langues */}
          <div className="create-annonce-unite__section">
            <h3 className="create-annonce-unite__section-title">Langues</h3>
            <div className="create-annonce-unite__checkbox-grid">
              {parametrages.langues?.map((langue) => (
                <div key={langue.id_langue} className="create-annonce-unite__checkbox-item">
                  <input
                    type="checkbox"
                    id={`langue-${langue.id_langue}`}
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
                  <label htmlFor={`langue-${langue.id_langue}`}>
                    {langue.valeur}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* QCM */}
          <div className="create-annonce-unite__section">
            <h3 className="create-annonce-unite__section-title">Évaluation</h3>
            <div className="create-annonce-unite__form-group">
              <label className="create-annonce-unite__label">QCM associé</label>
              <select 
                className="create-annonce-unite__select"
                value={qcmAnnonce || ''}
                onChange={(e) => setQcmAnnonce(e.target.value || null)}
              >
                <option value="">Aucun QCM</option>
                {parametrages.qcmAnnonces?.map((qcm) => (
                  <option key={qcm.id_qcm_annonce} value={qcm.id_qcm_annonce}>
                    {qcm.valeur}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="create-annonce-unite__actions">
          <button
            type="button"
            className="create-annonce-unite__btn create-annonce-unite__btn--ghost"
            onClick={() => navigate(-1)}
          >
            Annuler
          </button>
          
          <button
            type="button"
            className="create-annonce-unite__btn create-annonce-unite__btn--primary"
            onClick={handleAnnonce}
          >
            Créer l'annonce
          </button>
        </div>
      </div>
    </div>
  );
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