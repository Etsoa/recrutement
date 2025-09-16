INSERT INTO genres (valeur) VALUES ('homme');
INSERT INTO genres (valeur) VALUES ('femme');

INSERT INTO situations_matrimoniales (valeur) VALUES ('célibataire');
INSERT INTO situations_matrimoniales (valeur) VALUES ('marié(e)');
INSERT INTO situations_matrimoniales (valeur) VALUES ('divorcé(e)');
INSERT INTO situations_matrimoniales (valeur) VALUES ('veuf(ve)');

INSERT INTO langues (valeur) VALUES ('malgache');
INSERT INTO langues (valeur) VALUES ('français');
INSERT INTO langues (valeur) VALUES ('anglais');
INSERT INTO langues (valeur) VALUES ('espagnol');
INSERT INTO langues (valeur) VALUES ('allemand');
INSERT INTO langues (valeur) VALUES ('italien');

INSERT INTO filieres (valeur) VALUES ('Série A');
INSERT INTO filieres (valeur) VALUES ('Série C');
INSERT INTO filieres (valeur) VALUES ('Série D');
INSERT INTO filieres (valeur) VALUES ('Série S');
INSERT INTO filieres (valeur) VALUES ('Série L');
INSERT INTO filieres (valeur) VALUES ('Série T');
INSERT INTO filieres (valeur) VALUES ('Informatique');
INSERT INTO filieres (valeur) VALUES ('Gestion');
INSERT INTO filieres (valeur) VALUES ('Droit');
INSERT INTO filieres (valeur) VALUES ('Médecine');
INSERT INTO filieres (valeur) VALUES ('Génie Civil');
INSERT INTO filieres (valeur) VALUES ('Économie');
INSERT INTO filieres (valeur) VALUES ('Agronomie');

INSERT INTO niveaux (valeur) VALUES ('BEPC');
INSERT INTO niveaux (valeur) VALUES ('BAC');
INSERT INTO niveaux (valeur) VALUES ('Licence');
INSERT INTO niveaux (valeur) VALUES ('Licence Pro');
INSERT INTO niveaux (valeur) VALUES ('Master');
INSERT INTO niveaux (valeur) VALUES ('Doctorat');

INSERT INTO qualites (valeur) VALUES ('Ponctuel');
INSERT INTO qualites (valeur) VALUES ('Rigoureux');
INSERT INTO qualites (valeur) VALUES ('Autonome');
INSERT INTO qualites (valeur) VALUES ('Esprit d équipe');
INSERT INTO qualites (valeur) VALUES ('Créatif');
INSERT INTO qualites (valeur) VALUES ('Organisé');
INSERT INTO qualites (valeur) VALUES ('Communicatif');
INSERT INTO qualites (valeur) VALUES ('Flexible');
INSERT INTO qualites (valeur) VALUES ('Leader');

INSERT INTO domaines (valeur) VALUES ('Hôpital');
INSERT INTO domaines (valeur) VALUES ('Banque');
INSERT INTO domaines (valeur) VALUES ('Éducation');
INSERT INTO domaines (valeur) VALUES ('Administration');
INSERT INTO domaines (valeur) VALUES ('Industrie');
INSERT INTO domaines (valeur) VALUES ('Commerce');
INSERT INTO domaines (valeur) VALUES ('Agriculture');
INSERT INTO domaines (valeur) VALUES ('Informatique');
INSERT INTO domaines (valeur) VALUES ('Transport');

INSERT INTO unites (nom, motdepasse) VALUES ('Direction Générale', 'azerty');
INSERT INTO unites (nom, motdepasse) VALUES ('Ressources Humaines', 'azerty');
INSERT INTO unites (nom, motdepasse) VALUES ('Comptabilité', 'azerty');
INSERT INTO unites (nom, motdepasse) VALUES ('Production', 'azerty');
INSERT INTO unites (nom, motdepasse) VALUES ('Commercial', 'azerty');

INSERT INTO postes (valeur, id_unite) VALUES ('Directeur Général', 1);
INSERT INTO postes (valeur, id_unite) VALUES ('Assistant Direction', 1);
INSERT INTO postes (valeur, id_unite) VALUES ('Secrétaire Direction', 1);

INSERT INTO postes (valeur, id_unite) VALUES ('Responsable RH', 2);
INSERT INTO postes (valeur, id_unite) VALUES ('Assistant RH', 2);
INSERT INTO postes (valeur, id_unite) VALUES ('Chargé de recrutement', 2);

INSERT INTO postes (valeur, id_unite) VALUES ('Chef Comptable', 3);
INSERT INTO postes (valeur, id_unite) VALUES ('Comptable', 3);
INSERT INTO postes (valeur, id_unite) VALUES ('Assistant Comptable', 3);

INSERT INTO postes (valeur, id_unite) VALUES ('Chef de Production', 4);
INSERT INTO postes (valeur, id_unite) VALUES ('Ouvrier', 4);
INSERT INTO postes (valeur, id_unite) VALUES ('Technicien', 4);

INSERT INTO postes (valeur, id_unite) VALUES ('Responsable Commercial', 5);
INSERT INTO postes (valeur, id_unite) VALUES ('Commercial', 5);
INSERT INTO postes (valeur, id_unite) VALUES ('Assistant Commercial', 5);

INSERT INTO villes (valeur) VALUES ('Antananarivo');
INSERT INTO villes (valeur) VALUES ('Fianarantsoa');
INSERT INTO villes (valeur) VALUES ('Toamasina');
INSERT INTO villes (valeur) VALUES ('Mahajanga');
INSERT INTO villes (valeur) VALUES ('Toliara');
INSERT INTO villes (valeur) VALUES ('Antsiranana');

INSERT INTO type_status_annonces (valeur) VALUES ('en cours de demande');
INSERT INTO type_status_annonces (valeur) VALUES ('publié');
INSERT INTO type_status_annonces (valeur) VALUES ('non publié');