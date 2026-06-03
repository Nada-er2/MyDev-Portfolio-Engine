# MyDev Portfolio Engine

## Présentation du projet

MyDev Portfolio Engine est une application Full Stack permettant de gérer un portfolio de projets de développement web.

Le visiteur peut :

- Consulter les projets
- Rechercher des projets
- Filtrer les projets par technologie
- Utiliser le mode Dark / Light

L’administrateur peut :

- Se connecter de manière sécurisée
- Ajouter des projets
- Modifier des projets
- Supprimer des projets
- Ajouter des images aux projets

Le projet a été développé avec React, Node.js, Express, Prisma et PostgreSQL.

---

## Prérequis

Avant de lancer le projet, installer :

- Node.js
- PostgreSQL
- Git

---

## Installation du projet

### 1. Cloner le repository

```bash
git clone https://github.com/Nada-er2/MyDev-Portfolio-Engine.git
```

### 2. Installer les dépendances Frontend

```bash
cd client
npm install
```

### 3. Installer les dépendances Backend

```bash
cd ../server
npm install
```

---

## Configuration du fichier .env

Créer un fichier `.env` dans le dossier `server`.

Exemple :

```env
DATABASE_URL="postgresql://postgres:12345@localhost:5433/Portfolio"
JWT_SECRET="mysecretkey"
PORT=5000
```

---

## Configuration Prisma

Dans le dossier `server`, exécuter :

```bash
npx prisma generate
npx prisma db push
```

Créer l'administrateur :

```bash
node seed.js
```

---

## Lancer le Backend

Dans le dossier `server` :

```bash
node index.js 
```

Le serveur démarre sur :

```text
http://localhost:5000
```

---

## Lancer le Frontend

Dans le dossier `client` :

```bash
npm start
```

L’application démarre sur :

```text
http://localhost:3000
```

---

## Identifiants Admin de test

Email :

```text
admin@test.com
```

Mot de passe :

```text
123456
```

---

## Fonctionnalités

### Authentification

- Authentification sécurisée avec JWT
- Protection des routes administrateur
- Gestion de session via token

### Gestion des projets

- Ajout de projets
- Modification de projets
- Suppression de projets
- Consultation de la liste des projets

### Gestion des images

- Upload d’images avec Multer
- Prévisualisation avant upload
- Validation des formats (JPG, JPEG, PNG, WEBP)
- Limitation de la taille des fichiers
- Suppression automatique des images lors de la suppression d’un projet

### Recherche et Pagination

- Recherche dynamique par titre ou description
- Debounce pour optimiser les requêtes API
- Pagination côté serveur
- Navigation entre les pages

### Interface Utilisateur

- Responsive Design
- Mode Dark / Light
- Loader de chargement
- Toast Notifications

### Tests

- Tests automatisés avec Jest
- Tests API avec Supertest
- Vérification des endpoints principaux
- Vérification de l’authentification

---

## Technologies utilisées

### Frontend

- React.js
- React Router DOM
- Axios
- React Context API
- React Toastify
- CSS3

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt
- Multer

### Tests

- Jest
- Supertest

---

## Tests

Dans le dossier `server` :

```bash
npm test
```

Résultat attendu :

```text
PASS tests/project.test.js
PASS tests/auth.test.js
PASS tests/createProject.test.js

Test Suites: 3 passed
Tests: 3 passed
```

---

## Améliorations Techniques Réalisées

- Architecture Frontend / Backend séparée
- Authentification JWT sécurisée
- Upload d’images avec Multer
- Validation des fichiers uploadés
- Suppression automatique des images inutilisées
- Recherche optimisée avec Debounce
- Pagination serveur avec Prisma
- Gestion globale du thème avec Context API
- Responsive Design sur mobile, tablette et desktop
- Tests automatisés de l’API avec Jest et Supertest

---

## Structure du projet

```text
project/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── App.js
│   │   └── index.css
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── config/
│   ├── tests/
│   ├── uploads/
│   ├── app.js
│   ├── index.js
│   └── seed.js
│
└── README.md
```

---

## Auteur

**Nada Errissouni**

Développement Digital – Option Full Stack

Projet réalisé dans le cadre d’un stage et de la création d’un portfolio professionnel Full Stack.