import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UniteLoginPage from '../pages/unite/uniteLoginPage';

export default function UniteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UniteLoginPage />} />
    </Routes>
  );
}
