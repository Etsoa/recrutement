import React from 'react';
import { ExperienceManager, SkillsSelector } from './components';
import '../../styles/CandidatureStep.css';

const ProfessionalInfoStep = ({ formData, updateFormData, errors = {} }) => {
  return (
    <>
      <ExperienceManager 
        formData={formData}
        updateFormData={updateFormData}
        errors={errors}
      />
      
      <SkillsSelector 
        formData={formData}
        updateFormData={updateFormData}
        errors={errors}
      />
    </>
  );
};

export default ProfessionalInfoStep;