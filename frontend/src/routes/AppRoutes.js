import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import UniteRoutes from './uniteRoutes';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/unite/*" element={<UniteRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
