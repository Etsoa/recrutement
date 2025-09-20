import React from 'react';
import { Checkbox } from './index';
import '../styles/Question.css';

const Question = ({ 
  questionNumber,
  question,
  options = [],
  selectedAnswers = [],
  onChange,
  disabled = false
}) => {
  const handleAnswerChange = (checked, fieldName, optionId) => {
    if (onChange) {
      let updatedAnswers;
      if (checked) {
        updatedAnswers = [...selectedAnswers, optionId];
      } else {
        updatedAnswers = selectedAnswers.filter(id => id !== optionId);
      }
      onChange(updatedAnswers);
    }
  };

  return (
    <div className="question-container">
      <div className="question-header">
        <span className="question-number">Question {questionNumber}</span>
      </div>
      
      <div className="question-content">
        <h3 className="question-text">{question}</h3>
        
        <div className="answers-container">
          {options.map((option, index) => (
            <div key={option.id || index} className="answer-option">
              <Checkbox
                label={option.text || option}
                name={`question_${questionNumber}_option`}
                value={option.id || index}
                checked={selectedAnswers.includes(option.id || index)}
                onChange={handleAnswerChange}
                disabled={disabled}
                size="medium"
                variant="primary"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Question;