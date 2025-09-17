import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUnites, loginUnite } from "../api/unitesApi";
import Header from "../components/Header";
import Input, { Select } from "../components/Input";
import { Button } from "../components";

function Unites() {
  const navigate = useNavigate();
  const [unites, setUnites] = useState([]);
  const [selected, setSelected] = useState(''); // id ou value du select
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUnites();
        setUnites(response.data); // tableau data
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleLogin = async () => {
    if (!selected || !password) {
      setMessage("Veuillez sélectionner une unité et entrer le mot de passe.");
      return;
    }

    try {
      const res = await loginUnite(selected, password);
      if (res.success) {
        setMessage("Connexion réussie !");
        navigate(`/annonces`);
      } else {
        setMessage("Verifiez l'unité selectionné et mot de passe.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Erreur serveur");
    }
  };

  return (
    <div>
      <Header />
      <main className="App-main" style={{ padding: '20px' }}>
        <h1>Se connecter en tant qu’unité</h1>

        <Select
          label="Sélectionner une unité"
          options={unites.map((unite) => ({
            value: unite.nom, //selon backend
            label: unite.nom
          }))}
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          name="user"
        />

        <Input
          label="Mot de passe"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <Button onClick={handleLogin}>
          Se connecter
        </Button>

        {message && <p>{message}</p>}
      </main>
    </div>
  );
}

export default Unites;
