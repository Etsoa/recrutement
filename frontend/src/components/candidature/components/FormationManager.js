import React from 'react';
import { Dropdown, Checkbox } from '../../index';

const FormationManager = ({ formData, updateFormData, errors = {} }) => {
  // Gestion des formations
  const handleAddFiliere = () => {
    const formations = formData.formations || [];
    formations.push({
      filiere: '',
      niveaux: []
    });
    updateFormData({ formations });
  };

  const handleRemoveFiliere = (index) => {
    const formations = [...(formData.formations || [])];
    formations.splice(index, 1);
    updateFormData({ formations });
  };

  const handleFiliereChange = (value, fieldName, index) => {
    const formations = [...(formData.formations || [])];
    formations[index] = { ...formations[index], filiere: value, niveaux: [] };
    updateFormData({ formations });
  };

  const handleNiveauToggle = (checked, fieldName, niveau, formationIndex) => {
    const formations = [...(formData.formations || [])];
    const formation = formations[formationIndex];
    
    if (checked) {
      formation.niveaux = [...formation.niveaux, niveau];
    } else {
      formation.niveaux = formation.niveaux.filter(n => n !== niveau);
    }
    
    updateFormData({ formations });
  };

  const filiereOptions = [
    { value: 'Informatique', label: 'Informatique' },
    { value: 'Gestion', label: 'Gestion' },
    { value: 'Commerce', label: 'Commerce' },
    { value: 'Comptabilité', label: 'Comptabilité' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Ressources Humaines', label: 'Ressources Humaines' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Droit', label: 'Droit' },
    { value: 'Médecine', label: 'Médecine' },
    { value: 'Ingénierie', label: 'Ingénierie' },
    { value: 'Architecture', label: 'Architecture' },
    { value: 'Agriculture', label: 'Agriculture' },
    { value: 'Autre', label: 'Autre' }
  ];

  const niveauxParFiliere = {
    'Informatique': ['Licence', 'Master', 'Ingénieur', 'Doctorat'],
    'Gestion': ['Licence', 'Master', 'MBA', 'Doctorat'],
    'Commerce': ['Licence', 'Master', 'MBA'],
    'Comptabilité': ['Licence', 'Master', 'Expert-comptable'],
    'Marketing': ['Licence', 'Master', 'MBA'],
    'Ressources Humaines': ['Licence', 'Master', 'MBA'],
    'Finance': ['Licence', 'Master', 'MBA', 'Doctorat'],
    'Droit': ['Licence', 'Master', 'Doctorat'],
    'Médecine': ['Doctorat en médecine', 'Spécialisation'],
    'Ingénierie': ['Licence', 'Ingénieur', 'Master', 'Doctorat'],
    'Architecture': ['Licence', 'Master', 'Architecte DPLG'],
    'Agriculture': ['Licence', 'Ingénieur agronome', 'Master', 'Doctorat'],
    'Autre': ['Licence', 'Master', 'Doctorat']
  };

  return (
    <div className="section">
      <div className="section-header">
        <h3>Formation académique</h3>
        <button 
          type="button"
          onClick={handleAddFiliere}
          className="btn-add"
        >
          + Ajouter une filière
        </button>
      </div>
      
      <p className="section-description">Ajoutez vos filières d'études et sélectionnez vos niveaux</p>
      
      <div className="formations-list">
        {(formData.formations || []).map((formation, index) => (
          <div key={index} className="formation-item">
            <div className="formation-header">
              <h4>Formation #{index + 1}</h4>
              <button
                type="button"
                onClick={() => handleRemoveFiliere(index)}
                className="remove-filiere-btn"
              >
                ×
              </button>
            </div>
            
            <div className="formation-content">
              <div className="formation-grid">
                <div className="filiere-section">
                  <Dropdown
                    label="Filière d'études"
                    name={`formation.filiere`}
                    value={formation.filiere || ''}
                    onChange={(value, fieldName) => handleFiliereChange(value, fieldName, index)}
                    options={filiereOptions}
                    placeholder="Choisir une filière"
                    className="filiere-select"
                  />
                </div>
                
                {formation.filiere && (
                  <div className="niveaux-section">
                    <div className="form-group">
                      <label className="niveaux-label">Niveaux d'études :</label>
                      <div className="niveaux-checkboxes-inline">
                        {niveauxParFiliere[formation.filiere]?.map(niveau => (
                          <Checkbox
                            key={niveau}
                            label={niveau}
                            name={`formation.niveau`}
                            value={niveau}
                            checked={formation.niveaux.includes(niveau)}
                            onChange={(checked, fieldName, value) => handleNiveauToggle(checked, fieldName, value, index)}
                            className="niveau-checkbox"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {(!formData.formations || formData.formations.length === 0) && (
        <div className="empty-state">
          <p>Aucune formation ajoutée. Cliquez sur "Ajouter une filière" pour commencer.</p>
        </div>
      )}
    </div>
  );
};

export default FormationManager;