import React from 'react';
import '../styles/Card.css';

const Card = ({
  children,
  title,
  subtitle,
  footer,
  variant = 'default',
  clickable = false,
  onClick,
  className = '',
  ...props
}) => {
  const classNames = [
    'card',
    variant !== 'default' ? `card--${variant}` : '',
    clickable ? 'card--clickable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const CardWrapper = clickable ? 'button' : 'div';

  return (
    <CardWrapper
      className={classNames}
      onClick={clickable ? onClick : undefined}
      {...props}
    >
      {(title || subtitle) && (
        <div className="card__header">
          {title && <h3 className="card__title">{title}</h3>}
          {subtitle && <p className="card__subtitle">{subtitle}</p>}
        </div>
      )}
      
      <div className="card__body">
        {children}
      </div>
      
      {footer && (
        <div className="card__footer">
          {footer}
        </div>
      )}
    </CardWrapper>
  );
};

// Composant spécialisé pour les offres d'emploi
export const JobCard = ({ 
  job, 
  onApply, 
  onView,
  className = '',
  ...props 
}) => {
  return (
    <Card 
      className={`job-card ${className}`}
      clickable={true}
      onClick={() => onView && onView(job)}
      {...props}
    >
      {job.isNew && (
        <div className="job-card__badge">Nouveau</div>
      )}
      
      <h3 className="card__title">{job.title}</h3>
      <p className="card__subtitle">{job.company}</p>
      
      <div className="job-card__meta">
        <div className="job-card__meta-item">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          {job.location}
        </div>
        <div className="job-card__meta-item">
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          {job.type}
        </div>
      </div>
      
      <div className="card__footer">
        <span className="job-card__salary">{job.salary}</span>
        <button 
          className="btn btn--primary btn--sm"
          onClick={(e) => {
            e.stopPropagation();
            onApply && onApply(job);
          }}
        >
          Postuler
        </button>
      </div>
    </Card>
  );
};

// Composant spécialisé pour les candidats
export const CandidateCard = ({ 
  candidate, 
  onView, 
  onContact,
  className = '',
  ...props 
}) => {
  const initials = candidate.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card 
      className={`candidate-card ${className}`}
      clickable={true}
      onClick={() => onView && onView(candidate)}
      {...props}
    >
      <div className="candidate-card__avatar">
        {candidate.avatar ? (
          <img src={candidate.avatar} alt={candidate.name} />
        ) : (
          initials
        )}
      </div>
      
      <h3 className="candidate-card__name">{candidate.name}</h3>
      <p className="candidate-card__position">{candidate.position}</p>
      
      {candidate.skills && (
        <div className="candidate-card__skills">
          {candidate.skills.slice(0, 3).map((skill, index) => (
            <span key={index} className="candidate-card__skill">
              {skill}
            </span>
          ))}
          {candidate.skills.length > 3 && (
            <span className="candidate-card__skill">
              +{candidate.skills.length - 3}
            </span>
          )}
        </div>
      )}
      
      <div className="card__footer">
        <span className="candidate-card__experience">
          {candidate.experience} ans d'expérience
        </span>
        <button 
          className="btn btn--primary btn--sm"
          onClick={(e) => {
            e.stopPropagation();
            onContact && onContact(candidate);
          }}
        >
          Contacter
        </button>
      </div>
    </Card>
  );
};

export default Card;
