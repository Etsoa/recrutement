import React, { useState, useEffect } from "react";
import { useNavigate } from '../../router/useNavigateHelper';
import { unitesService } from "../../services";
import "../../styles/LoginCeo.css";

function LoginUnites() {
  const navigate = useNavigate();
  const [unites, setUnites] = useState([]);
  const [selected, setSelected] = useState(''); // id ou value du select
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await unitesService.getAllUnites();
        setUnites(response.data); // tableau data
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    // Validation côté client
    if (!selected || !password) {
      setMessage("Veuillez sélectionner une unité et entrer le mot de passe.");
      setLoading(false);
      return;
    }

    if (password.length < 3) {
      setMessage("Le mot de passe doit contenir au moins 3 caractères.");
      setLoading(false);
      return;
    }

    try {
      // Trouver l'unité complète basée sur le nom sélectionné
      const selectedUnite = unites.find(unite => unite.nom === selected);
      
      if (!selectedUnite) {
        throw new Error('Unité sélectionnée introuvable');
      }
      
      const res = await unitesService.loginUnite(selected, password);
      
      if (res && res.success) {
        // Vérification sécurisée des données de session
        const uniteId = selectedUnite.id_unite || res.data?.unite?.id_unite;
        
        if (!uniteId) {
          throw new Error('Données d\'unité incomplètes');
        }
        
        // Sauvegarder avec expiration (24h)
        const sessionData = {
          selectedUnite: selected,
          id_unite: uniteId,
          loginTime: Date.now(),
          expiresAt: Date.now() + (24 * 60 * 60 * 1000)
        };
        
        localStorage.setItem('uniteSession', JSON.stringify(sessionData));
        localStorage.setItem('selectedUnite', selected);
        localStorage.setItem('id_unite', uniteId.toString());
        
        navigate(`/back-office/liste-annonces`);
      } else {
        setMessage(res?.message || "Identifiants incorrects. Vérifiez l'unité et le mot de passe.");
      }
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setMessage(err.message || "Erreur de connexion au serveur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="brand-logo">
          <h1>Axiom</h1>
        </div>
        
        <div className="login-header">
          <h2 className="login-title">Espace Unité</h2>
          <p className="login-subtitle">Connectez-vous pour accéder à votre espace</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="unite">Unité</label>
            <select
              id="unite"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              required
            >
              <option value="">Sélectionner une unité</option>
              {unites.map((unite) => (
                <option key={unite.id_unite} value={unite.nom}>
                  {unite.nom}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Masquer" : "Afficher"}
              </button>
            </div>
          </div>

          <div className="login-actions">
            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </div>

          {message && (
            <div className={`login-message ${message.includes('Erreur') || message.includes('Veuillez') || message.includes('Vérifiez') ? 'login-message--error' : 'login-message--success'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginUnites;
