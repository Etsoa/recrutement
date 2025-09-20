import React from 'react';
import { PersonalInfoForm, FormationManager } from './components';
import '../../styles/CandidatureStep.css';

const PersonalInfoStep = ({ formData, updateFormData, errors = {} }) => {
  return (
    <>
      <PersonalInfoForm 
        formData={formData}
        updateFormData={updateFormData}
        errors={errors}
      />
      
      <FormationManager 
        formData={formData}
        updateFormData={updateFormData}
        errors={errors}
      />
    </>
  );
};

export default PersonalInfoStep;