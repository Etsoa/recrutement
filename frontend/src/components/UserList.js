import React from 'react';
import '../styles/UserList.css';

const UserList = ({ users }) => {
  if (!users || users.length === 0) {
    return (
      <div className="user-list--empty">
        <div className="empty-state">
          <div className="empty-state__icon">
            <svg width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zM4 18v-4h8v-2H4v-2c0-.55-.45-1-1-1s-1 .45-1 1v6c0 1.1.9 2 2 2h12c.55 0 1-.45 1-1s-.45-1-1-1H4z"/>
            </svg>
          </div>
          <h3 className="empty-state__title">Aucun utilisateur trouvé</h3>
          <p className="empty-state__description">
            Connectez-vous au backend pour voir les utilisateurs
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-list">
      <div className="user-list__header">
        <h2 className="user-list__title">Liste des utilisateurs</h2>
        <p className="user-list__count">{users.length} utilisateur(s)</p>
      </div>
      
      <div className="user-list__grid">
        {users.map((user, index) => (
          <div
            key={user.id || index}
            className="user-card"
          >
            <div className="user-card__header">
              <h3 className="user-card__title">{user.name}</h3>
              <p className="user-card__subtitle">{user.email}</p>
            </div>
            
            <div className="user-card__info">
              {user.phone && (
                <div className="user-card__meta">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  {user.phone}
                </div>
              )}
              {user.department && (
                <div className="user-card__meta">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
                  </svg>
                  {user.department}
                </div>
              )}
            </div>
            
            <div className="user-card__actions">
              <button className="btn btn--ghost btn--sm">
                Voir profil
              </button>
              <button className="btn btn--primary btn--sm">
                Contacter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
