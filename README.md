# MyDev Portfolio Engine

## Présentation du projet

MyDev Portfolio Engine est une application Full Stack permettant de gérer un portfolio de projets de développement web.

Le visiteur peut :
- consulter les projets,
- filtrer les projets par technologie,
- utiliser le mode Dark / Light.

L’administrateur peut :
- se connecter de manière sécurisée,
- ajouter des projets,
- modifier des projets,
- supprimer des projets.

Le projet a été développé avec React, Node.js, Express, Prisma et PostgreSQL.

---

# Prérequis

Avant de lancer le projet, installer :

- Node.js
- PostgreSQL
- Git

---

# Installation du projet

## 1. Cloner le repository

```bash
git clone https://github.com/VOTRE-USERNAME/MyDev-Portfolio-Engine.git
```

---

## 2. Installer les dépendances Frontend

```bash
cd client
npm install
```

---

## 3. Installer les dépendances Backend

```bash
cd ../server
npm install
```

---

# Configuration du fichier .env

Créer un fichier `.env` dans le dossier `server`.

Exemple :

```env
DATABASE_URL="postgresql://postgres:12345@localhost:5433/Portfolio"
JWT_SECRET="mysecretkey"
PORT=5000
```

---

# Configuration Prisma

Dans le dossier `server`, exécuter :

```bash
npx prisma generate
npx prisma db push
```

---

# Lancer le Backend

Dans le dossier `server` :

```bash
npm start
```

Le serveur démarre sur :

```bash
http://localhost:5000
```

---

# Lancer le Frontend

Dans le dossier `client` :

```bash
npm start
```

L’application démarre sur :

```bash
http://localhost:3000
```

---

# Identifiants Admin de test

Email :

```bash
admin@test.com
```

Mot de passe :

```bash
123456
```

---

# Fonctionnalités

- Authentification JWT
- CRUD complet des projets
- Filtre dynamique par technologie
- Dashboard Admin
- Responsive Design
- Dark / Light Mode
- Loader
- Toast Notifications

---

# Technologies utilisées

## Frontend
- React.js
- React Router DOM
- Axios
- CSS3

## Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT
- bcryptjs

---

# Structure du projet

```bash
project/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── App.js
│   │   └── index.css
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── prisma/
│   ├── routes/
│   ├── config/
│   └── index.js
```

---

# Auteur

Projet réalisé par Nada Errissouni.
