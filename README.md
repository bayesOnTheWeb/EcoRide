---

# 🚗 **EcoRide – Application de Covoiturage Durable**

### 🌱 *Numérisation des services d’EcoRide via une application web fullstack sécurisée.*

---

## 🧭 **Objectif**

EcoRide vise à faciliter le covoiturage durable en proposant une plateforme web moderne, accessible et sécurisée.

L’application permet aux utilisateurs de proposer, réserver et gérer des trajets, tout en garantissant une administration efficace des signalements.

---

## 👥 **Parties prenantes**

| Rôle | Objectif principal |
| --- | --- |
| **Utilisateur** | Accéder aux fonctionnalités de covoiturage (trajets, réservations, messagerie) |
| **Administrateur** | Gérer les utilisateurs, les signalements et les retours |

---

## 🚀 **Fonctionnalités principales**

### 👤 **Utilisateur**

- Inscription / connexion sécurisée (hashage + JWT)
- Consultation des trajets disponibles
- Proposition de trajets
- Réservation de places
- Contact des conducteurs (mail ou messagerie interne)

### 🛡️ **Administrateur**

- Gestion et modération des utilisateurs signalés
- Suppression ou suspension d’un compte
- Accès aux retours et signalements

---

## 🧩 **Architecture et technique**

### ⚙️ **Stack technique**

| Domaine | Technologie |
| --- | --- |
| **Frontend** | Next.js |
| **Backend** | NestJS |
| **Base de données** | PostgreSQL + TypeORM |
| **Auth** | JWT + bcrypt |
| **Validation** | Class Validator / Zod |
| **Déploiement** | Front → Vercel • Back → Render |

---

### 🏗️ **Architecture**

- API REST pour les échanges front ↔ back
- Organisation par modules (`User`, `Ride`, `Reservation`, `Report`)
- Relations :
    - `User` ↔ `Ride` : 1:N (un utilisateur peut proposer plusieurs trajets)
    - `Ride` ↔ `Reservation` : 1:N
    - `User` ↔ `Report` : N:M (un utilisateur peut signaler plusieurs personnes)

---

### 🔐 **Sécurité**

- Hashage des mots de passe (`bcrypt`)
- Authentification par **JWT**
- Validation stricte des données côté client et serveur
- Vérification des permissions sur les routes sensibles
- Protection contre :
    - Injections SQL
    - XSS
    - CSRF

---

### ⚡ **Performance & bonnes pratiques**

- Lazy loading des composants React
- Requêtes optimisées et pagination côté back
- Logging minimal et structuré
- Architecture modulaire et extensible
- Respect des normes **RGPD** et **RGAA**

---

## 🎨 **Design & UX**

- WebApp **responsive** (mobile ↔ desktop)
- Composants modulaires, cohérents et accessibles
- Palette **nature / boisée** reflétant la durabilité
- Respect des standards **RGAA** (accessibilité numérique)

---

## 🧱 **Objectifs techniques**

| Priorité | Objectif |
| --- | --- |
| 🥇 **Principal** | Authentification, CRUD complet des entités principales, API REST sécurisée |
| 🥈 **Secondaire** | Notifications, filtres de trajets, amélioration UX et performances |

---

## 🗂️ **Annexes**

- Charte graphique
- Schémas UML (diagrammes de classes, flux de données, ERD)
- Wireframes et maquettes
- Documentation API : routes, DTOs, validation

---

## 📆 **Contraintes**

| Élément | Détail |
| --- | --- |
| **Budget** | 0 € |
| **Durée de développement** | 4 → 17 novembre |
| **Équipe** | Développeur web fullstack (autonomie RNCP5) |

---

## 🔮 **Évolutions futures**

- Optimisation des performances et requêtes
- Système de notifications temps réel
- Gestion avancée des trajets (filtrage, favoris)
- Améliorations UI/UX continues

---

## 🧭 **Ressources**

- [📖 Documentation projet](https://www.notion.so/EcoRide-22d18d6e3c0180dda129c8e02db8a6e9?pvs=21)

---

## 🧑‍💻 **Installation locale**

### Backend :

```bash
git clone https://github.com/bayesOnTheWeb/EcoRideECF.git
cd backend
npm install
npm run start:dev

```

### Frontend :

```bash
cd frontend
npm install
npm run dev

```

L’application sera accessible sur :

- Frontend → `http://localhost:3000`
- Backend → `http://localhost:3001`

---

## 💬 **Contact**

Développement : **Steven – Développeur Web & Web Mobile (RNCP Niveau 5)**

📧 Contact : steevn.pyram@gmail.com

---