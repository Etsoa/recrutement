import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importation des pages
import Home from '../pages/Home';
import CVtest from '../pages/CVtest';
import CVList from '../pages/CVList';

// Composant de layout principal
import Layout from '../components/Layout';

// Routes protégées (peut être étendu avec l'authentification)
const ProtectedRoute = ({ children }) => {
  // Pour l'instant, toutes les routes sont accessibles
  // Vous pouvez ajouter ici la logique d'authentification
  return children;
};

// Composant 404
const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: 'var(--spacing-xl)',
    }}>
      <h1 style={{ 
        fontSize: 'var(--font-size-4xl)', 
        color: 'var(--color-primary)',
        marginBottom: 'var(--spacing-lg)'
      }}>
        404
      </h1>
      <h2 style={{ 
        fontSize: 'var(--font-size-xl)', 
        color: 'var(--color-text)',
        marginBottom: 'var(--spacing-md)'
      }}>
        Page non trouvée
      </h2>
      <p style={{ 
        color: 'var(--color-text-secondary)',
        marginBottom: 'var(--spacing-xl)'
      }}>
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <button 
        onClick={() => window.history.back()}
        style={{
          padding: 'var(--spacing-sm) var(--spacing-lg)',
          backgroundColor: 'var(--color-accent)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--border-radius)',
          cursor: 'pointer',
          fontSize: 'var(--font-size-base)'
        }}
      >
        Retourner
      </button>
    </div>
  );
};

// Configuration des routes principales
const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Route d'accueil */}
          <Route 
            path="/" 
            element={<Navigate to="/home" replace />} 
          />
          
          {/* Page d'accueil */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          
          {/* Page CV */}
          <Route 
            path="/cv" 
            element={
              <ProtectedRoute>
                <CVtest />
              </ProtectedRoute>
            } 
          />
          
          {/* Page Liste des CVs */}
          <Route 
            path="/cv-list" 
            element={
              <ProtectedRoute>
                <CVList />
              </ProtectedRoute>
            } 
          />
          
          {/* Route 404 - Page non trouvée */}
          <Route 
            path="*" 
            element={<NotFound />} 
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;
