import React, { useState } from "react";
import "../styles/LoginCeo.css";

const LoginCeo = () => {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/ceo/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, mot_de_passe: motDePasse }),
      });

      const result = await response.json();
      setMessage(result.message);

      if (result.success) {
        // Stocker le token si besoin
        localStorage.setItem("ceoToken", result.data.token);
      }
    } catch (err) {
      setMessage("Erreur réseau, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-ceo-container fade-in">
      <form className="login-ceo-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Connexion CEO</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="motDePasse">Mot de passe</label>
          <input
            type="password"
            id="motDePasse"
            placeholder="Entrez votre mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn-submit"
          disabled={loading}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        {message && <p className="login-message">{message}</p>}
      </form>
    </div>
  );
};

export default LoginCeo;
