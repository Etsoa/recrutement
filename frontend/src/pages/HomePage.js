import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <h1>Accueil</h1>
      <Link to="/unite">Aller à Unite</Link>
    </div>
  );
}
