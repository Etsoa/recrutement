import React, { useState } from 'react';
import { loginUnite } from '../../services/unite/loginUniteService';

export default function UniteLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUnite(username, password);
      setUsername('');
      setPassword('');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f5f5f5' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', background: '#fff' }}>
        <h2 style={{ textAlign: 'center' }}>Connexion Unite</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <input type="text" placeholder="Nom d utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <button type="submit" style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Se connecter</button>
      </form>
    </div>
  );
}
