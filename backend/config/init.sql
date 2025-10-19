-- Réinitialiser la base de données
\c postgres
DROP DATABASE IF EXISTS gestion_entreprise;
CREATE DATABASE gestion_entreprise;
\c gestion_entreprise

-- Créer les tables (table.sql)
\i 'table.sql'

-- Insérer les données (data.sql)
\i 'data.sql'

-- Créer les vues (view_etsoa.sql)
\i 'view_etsoa.sql'