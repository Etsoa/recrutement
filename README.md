
PERN Project 🚀
Projet full-stack PostgreSQL, Express, React, Node.js avec Sequelize, dotenv et ESLint.

📦 Installation & Configuration

Créer la structure
----------------------
mkdir backend frontend


🔧 Backend (Express + Sequelize + PostgreSQL)

1. Initialiser le projet
------------------------
cd backend
npm init -y

2. Installer les dépendances
----------------------------
npm install express sequelize pg pg-hstore dotenv cors
npm install --save-dev eslint nodemon

3. Configurer ESLint
--------------------
npx eslint --init
👉 Choisir : Node.js, CommonJS, pas de framework.

4. Fichier .env
---------------
backend/.env :
DB_NAME=pern_db
DB_USER=postgres
DB_PASS=your_password
DB_HOST=localhost
PORT=5000

5. Scripts package.json
-----------------------
backend/package.json :
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js",
  "lint": "eslint ."
}

6. Lancer le backend
--------------------
npm run dev
👉 Backend disponible sur http://localhost:5000


🎨 Frontend (React)

1. Créer l’app React
--------------------
cd ../frontend
npx create-react-app .

2. Installer Axios (optionnel)
------------------------------
npm install axios

3. Variables d’environnement
----------------------------
frontend/.env :
REACT_APP_API_URL=http://localhost:5000/api

4. Lancer le frontend
---------------------
npm start
👉 Frontend disponible sur http://localhost:3000


⚡ Lancer Backend + Frontend en même temps

1. Installer concurrently à la racine
-------------------------------------
cd ..
npm install --save-dev concurrently

2. Ajouter script global
------------------------
package.json (à la racine) :
"scripts": {
  "dev": "concurrently \\"npm run dev --prefix backend\\" \\"npm start --prefix frontend\\""
}

3. Lancer les deux serveurs
---------------------------
npm run dev


✅ Résultat
- Backend (Express + Sequelize) → http://localhost:5000
- Frontend (React) → http://localhost:3000
- Les deux communiquent via http://localhost:5000/api/...

"""

# Sauvegarde dans un fichier .txt
file_path = "/mnt/data/README_PERN.txt"
with open(file_path, "w", encoding="utf-8") as f:
    f.write(readme_content)

file_path
