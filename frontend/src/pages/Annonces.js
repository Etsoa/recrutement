import React, { useState, useEffect } from "react";
import { Input, Textarea, Select, SearchInput } from "../components/Input";
import Header from "../components/Header";
import Annonce from "../components/AnnonceBO";


function Annonces() {
  // const [post, setPost] = useState("");
  // const [ville, setVille] = useState("");
  // const [ageMin, setAgeMin] = useState(0);
  // const [ageMax, setAgeMax] = useState(0);
  // const [genre, setGenre] = useState("");
  // const [nbreEnfant, setNbreEnfant] = useState(0);
  // const [situationMatrimoniale, setSituationMatrimoniale] = useState("");
  // const [langues, setLangues] = useState([]);
  // const [qualites, setQualites] = useState([]);
  // const [experiences, setExperiences] = useState([]);
  // const [filiere, setFiliere] = useState([]);
  // const [niveau, setNiveau] = useState([]);
  const [listeAnnonces, setlisteAnnonces] = useState([]);
  const [formData, setFormData] = useState({
    post: "Développeur fullstack",
    ville: "Antananarivo",
    ageMin: 25,
    ageMax: 35,
    genre: "Homme",
    langues: ["Français", "Anglais", "Malagasy"],
    qualites: ["Rigoureux", "Autonome", "Curieux"],
    experiences: [
      { poste: "Développeur Frontend", duree: "2 ans" },
      { poste: "Développeur Backend", duree: "1 an" }
    ],
    filiere: ["Informatique", "Mathématiques"],
    niveau: ["Licence", "Master", "Doctorat"]
  });
  const [showDetails, setShowDetails] = useState(false);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await getUsers();
  //       setMessage(data.message);
  //       setUsers(data.users || []);
  //     } catch (error) {
  //       setMessage("Hello World from Frontend! (Backend not connected)");
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <div>
      <Header />
      <Annonce formData={formData} showDetails={showDetails} setShowDetails={setShowDetails} />
    </div>
  );
}

export default Annonces;
