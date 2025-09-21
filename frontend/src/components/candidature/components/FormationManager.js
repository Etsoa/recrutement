import React, { useState, useEffect } from 'react';
import { Dropdown, Checkbox, Button } from '../../index';
import parametresService from '../../../services/parametresService';

const FormationManager = ({ formData, updateFormData, errors = {} }) => {
  const [parametres, setParametres] = useState({
    series: [], // Séries pour le BAC (Serie A, C, D, S, L)
    filieres: [], // Filières universitaires (Informatique, Gestion, etc.)
    niveaux: [] // Tous les niveaux
  });
  const [loading, setLoading] = useState(true);

  // Charger les paramètres au montage du composant
  useEffect(() => {
    const loadParametres = async () => {
      try {
        setLoading(true);
        const response = await parametresService.getAllParametres();
        
        if (response.success && response.data) {
          // Séparer les séries des filières universitaires
          const allFilieres = response.data.filieres || [];
          const series = allFilieres.filter(f => f.valeur.startsWith('Serie '));
          const filieres = allFilieres.filter(f => !f.valeur.startsWith('Serie '));
          
          // Filtrer les niveaux universitaires (à partir de Licence)
          const allNiveaux = response.data.niveaux || [];
          const niveauxUniversitaires = allNiveaux.filter(n => 
            ['Licence', 'Licence Pro', 'Master', 'Doctorat'].includes(n.valeur)
          );
          
          setParametres({
            series: parametresService.formatForDropdown(series),
            filieres: parametresService.formatForDropdown(filieres),
            niveaux: parametresService.formatForDropdown(niveauxUniversitaires)
          });
        } else {
          console.error('Erreur lors du chargement des paramètres:', response.message);
          setParametres({
            series: [],
            filieres: [],
            niveaux: []
          });
        }
      } catch (error) {
        console.error('Erreur lors du chargement des paramètres:', error);
        setParametres({
          series: [],
          filieres: [],
          niveaux: []
        });
      } finally {
        setLoading(false);
      }
    };

    loadParametres();
  }, []);

  // === FORMATIONS PRÉ-UNIVERSITAIRES ===
  
  // Gestion du BEPC
  const handleBepcChange = (checked) => {
    const formationsPreUniv = { ...(formData.formationsPreUniversitaires || {}) };
    formationsPreUniv.bepc = checked;
    updateFormData({ formationsPreUniversitaires: formationsPreUniv });
  };

  // Gestion des BAC (ajout d'un nouveau BAC)
  const handleAddBac = () => {
    const formationsPreUniv = { ...(formData.formationsPreUniversitaires || {}) };
    const bacs = [...(formationsPreUniv.bacs || [])];
    bacs.push({ serie: '' });
    formationsPreUniv.bacs = bacs;
    updateFormData({ formationsPreUniversitaires: formationsPreUniv });
  };

  // Suppression d'un BAC
  const handleRemoveBac = (index) => {
    const formationsPreUniv = { ...(formData.formationsPreUniversitaires || {}) };
    const bacs = [...(formationsPreUniv.bacs || [])];
    bacs.splice(index, 1);
    formationsPreUniv.bacs = bacs;
    updateFormData({ formationsPreUniversitaires: formationsPreUniv });
  };

  // Changement de série pour un BAC
  const handleBacSerieChange = (value, index) => {
    const formationsPreUniv = { ...(formData.formationsPreUniversitaires || {}) };
    const bacs = [...(formationsPreUniv.bacs || [])];
    bacs[index] = { ...bacs[index], serie: value };
    formationsPreUniv.bacs = bacs;
    updateFormData({ formationsPreUniversitaires: formationsPreUniv });
  };

  // === FORMATIONS UNIVERSITAIRES ===
  // === FORMATIONS UNIVERSITAIRES ===
  
  // Gestion des formations universitaires (ajout d'une filière)
  const handleAddFiliere = () => {
    const formations = [...(formData.formationsUniversitaires || [])];
    formations.push({
      filiere: '',
      niveaux: []
    });
    updateFormData({ formationsUniversitaires: formations });
  };

  // Suppression d'une filière universitaire
  const handleRemoveFiliere = (index) => {
    const formations = [...(formData.formationsUniversitaires || [])];
    formations.splice(index, 1);
    updateFormData({ formationsUniversitaires: formations });
  };

  // Changement de filière universitaire
  const handleFiliereChange = (value, fieldName, index) => {
    const formations = [...(formData.formationsUniversitaires || [])];
    formations[index] = { ...formations[index], filiere: value, niveaux: [] };
    updateFormData({ formationsUniversitaires: formations });
  };

  // Gestion des niveaux pour une filière universitaire
  const handleNiveauToggle = (checked, fieldName, niveau, formationIndex) => {
    const formations = [...(formData.formationsUniversitaires || [])];
    const formation = formations[formationIndex];
    
    if (checked) {
      formation.niveaux = [...formation.niveaux, niveau];
    } else {
      formation.niveaux = formation.niveaux.filter(n => n !== niveau);
    }
    
    updateFormData({ formationsUniversitaires: formations });
  };

  return (
    <div className="section">
      <h3>Formation académique</h3>
      <p className="section-description">Renseignez vos formations pré-universitaires et universitaires</p>
      
      {/* SECTION PRÉ-UNIVERSITAIRE */}
      <div className="formation-preuniv-section">
        <h4>Formations pré-universitaires</h4>
        
        {/* BEPC */}
        <div className="bepc-section">
          <Checkbox
            label="BEPC obtenu"
            name="bepc"
            checked={formData.formationsPreUniversitaires?.bepc || false}
            onChange={handleBepcChange}
          />
        </div>
        
        {/* BAC(s) */}
        <div className="bac-section">
          <div className="section-header">
            <h5>Baccalauréat(s)</h5>
            <Button 
              variant="primary"
              size="sm"
              onClick={handleAddBac}
              disabled={loading || (parametres.series || []).length === 0}
            >
              + Ajouter un BAC
            </Button>
          </div>
          
          <div className="bacs-list">
            {(formData.formationsPreUniversitaires?.bacs || []).map((bac, index) => (
              <div key={index} className="bac-item">
                <div className="bac-header">
                  <span>BAC #{index + 1}</span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveBac(index)}
                    className="remove-filiere-btn"
                  >
                    ×
                  </Button>
                </div>
                <Dropdown
                  label="Série"
                  name={`bac-serie-${index}`}
                  value={bac.serie || ''}
                  onChange={(value) => handleBacSerieChange(value, index)}
                  options={parametres.series || []}
                  placeholder={loading ? "Chargement..." : (parametres.series || []).length === 0 ? "Aucune série disponible" : "Choisir une série"}
                  disabled={loading || (parametres.series || []).length === 0}
                />
              </div>
            ))}
            
            {(!formData.formationsPreUniversitaires?.bacs || formData.formationsPreUniversitaires.bacs.length === 0) && (
              <div className="empty-state">
                <p>Aucun BAC ajouté. Cliquez sur "Ajouter un BAC" pour commencer.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SECTION UNIVERSITAIRE */}
      <div className="formation-univ-section">
        <div className="section-header">
          <h4>Formations universitaires</h4>
          <Button 
            variant="primary"
            size="sm"
            onClick={handleAddFiliere}
            disabled={loading || (parametres.filieres || []).length === 0}
          >
            + Ajouter une filière
          </Button>
        </div>
        
        <div className="formations-list">
          {(formData.formationsUniversitaires || []).map((formation, index) => (
            <div key={index} className="formation-item">
              <div className="formation-header">
                <h5>Formation #{index + 1}</h5>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveFiliere(index)}
                  className="remove-filiere-btn"
                >
                  ×
                </Button>
              </div>
              
              <div className="formation-content">
                <div className="formation-grid">
                  <div className="filiere-section">
                    <Dropdown
                      label="Filière d'études"
                      name={`formation.filiere`}
                      value={formation.filiere || ''}
                      onChange={(value, fieldName) => handleFiliereChange(value, fieldName, index)}
                      options={parametres.filieres || []}
                      placeholder={loading ? "Chargement..." : (parametres.filieres || []).length === 0 ? "Aucune filière disponible" : "Choisir une filière"}
                      disabled={loading || (parametres.filieres || []).length === 0}
                      className="filiere-select"
                    />
                  </div>
                  
                  {formation.filiere && (parametres.niveaux || []).length > 0 && (
                    <div className="niveaux-section">
                      <div className="form-group">
                        <label className="niveaux-label">Niveaux d'études :</label>
                        <div className="niveaux-checkboxes-inline">
                          {(parametres.niveaux || []).map(niveau => (
                            <Checkbox
                              key={niveau.value}
                              label={niveau.label}
                              name={`formation.niveau`}
                              value={niveau.value}
                              checked={formation.niveaux.includes(niveau.value)}
                              onChange={(checked, fieldName, value) => handleNiveauToggle(checked, fieldName, value, index)}
                              className="niveau-checkbox"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {formation.filiere && (parametres.niveaux || []).length === 0 && (
                    <div className="niveaux-section">
                      <div className="form-group">
                        <label className="niveaux-label">Niveaux d'études :</label>
                        <p className="no-options-message">
                          {loading ? "Chargement des niveaux..." : "Aucun niveau d'étude disponible"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {(!formData.formationsUniversitaires || formData.formationsUniversitaires.length === 0) && (
          <div className="empty-state">
            <p>Aucune formation universitaire ajoutée. Cliquez sur "Ajouter une filière" pour commencer.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormationManager;