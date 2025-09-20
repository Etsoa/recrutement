import React from 'react';
import '../../styles/StepIndicator.css';

const StepIndicator = ({ currentStep, totalSteps = 3 }) => {
  const steps = [
    { 
      id: 1, 
      title: 'Informations Personnelles', 
      shortTitle: 'Personnel', 
      description: 'Identité & Formation' 
    },
    { 
      id: 2, 
      title: 'Expérience Professionnelle', 
      shortTitle: 'Professionnel', 
      description: 'Parcours & Compétences' 
    },
    { 
      id: 3, 
      title: 'Récapitulatif & Envoi', 
      shortTitle: 'Récapitulatif', 
      description: 'Vérification finale' 
    }
  ];

  const getStepState = (stepId) => {
    if (currentStep === stepId) return 'current';
    if (currentStep > stepId) return 'completed';
    return 'pending';
  };

  return (
    <div className="step-indicator-wrapper">
      <div 
        className="step-indicator" 
        role="progressbar" 
        aria-valuenow={currentStep} 
        aria-valuemin="1" 
        aria-valuemax={totalSteps}
        aria-label={`Étape ${currentStep} sur ${totalSteps}`}
      >
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={`step-item ${getStepState(step.id)}`}
            role="step"
            aria-current={currentStep === step.id ? 'step' : undefined}
            aria-label={`${step.title} - ${getStepState(step.id) === 'completed' ? 'Terminé' : getStepState(step.id) === 'current' ? 'En cours' : 'À venir'}`}
          >
            <div className="step-circle" aria-hidden="true">
              {getStepState(step.id) === 'completed' ? '' : step.id}
            </div>
            <div className="step-label">
              <span className="step-title">{step.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;