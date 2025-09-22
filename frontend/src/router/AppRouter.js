import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../styles/globals.css';
import '../styles/variables.css';

// Importation du Layout
import Layout from '../components/Layout';
import QCMLayout from '../components/QCMLayout';

// Importation des pages
import Home from '../pages/Home';
import Annonces from '../pages/Annonces';
import CandidaturePage from '../pages/CandidaturePage';
import QCMPage from '../pages/QCMPage';
import TokenUsedPage from '../pages/TokenUsedPage';
import DetailQCM from '../pages/DetailQCM';
import CVtest from '../pages/CVtest';
import CVList from '../pages/CVList';

// Configuration des routes
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Route QCM sans Layout (pas de header/footer) avec token */}
        <Route path="/qcm/:token" element={
          <QCMLayout>
            <QCMPage />
          </QCMLayout>
        } />
        
        {/* Route Token Déjà Utilisé sans Layout */}
        <Route path="/qcm-completed/:token" element={
          <QCMLayout>
            <TokenUsedPage />
          </QCMLayout>
        } />
        
        {/* Autres routes avec Layout normal */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/annonces" element={<Annonces />} />
              <Route path="/candidature/:annonceId" element={<CandidaturePage />} />
              <Route path="/detailQCM" element={<DetailQCM />} />
              <Route path="/cv" element={<CVtest />} />
              <Route path="/cv-list" element={<CVList />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
};

export default AppRouter;
