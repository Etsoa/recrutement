import React from 'react';
import '../../styles/StepIndicator.css';

const StepIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, title: 'Infos personnelles' },
    { id: 2, title: 'Expériences' },
    { id: 3, title: 'Compétences' },
    { id: 4, title: 'Téléchargements' },
    { id: 5, title: 'Récapitulatif' }
  ];

  return (
    <div className="step-indicator">
      {steps.map((step) => (
        <div 
          key={step.id} 
          className={`step-item ${
            currentStep === step.id ? 'current' : 
            currentStep > step.id ? 'completed' : 
            'pending'
          }`}
        >
          <div className="step-circle">
            {step.id}
          </div>
          <div className="step-label">
            {step.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;