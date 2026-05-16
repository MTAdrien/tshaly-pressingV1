# Tshaly Pressing — SaaS V1

Tshaly Pressing est une application SaaS de pressing connecté développée Full Stack dans une logique produit réelle.

Le projet permet à des clients de réserver des prestations de pressing en ligne, gérer leurs commandes, suivre leur traitement et interagir avec une plateforme administrateur.

Cette V1 a été conçue pour la société SAS TSHALY PRESSING et a été intégrée à mon portfolio.

Cela me permet de démontrer mes compétences en:

- Software Development,
- Full Stack Development,
- logique métier SaaS,
- architecture backend,

---

# Objectifs du projet

Le projet a été développé afin de :

- construire une vraie application SaaS cohérente,
- apprendre l’architecture Full Stack moderne,
- travailler une logique métier réaliste,
- comprendre la connexion Frontend - Backend,
- implémenter une API REST sécurisée,
- manipuler PostgreSQL,
- développer une architecture MVC maintenable.

---

# Fonctionnalités principales

## Côté Client

- Création de compte
- Connexion JWT
- Gestion session utilisateur
- Réservation de prestations
- Panier dynamique
- Checkout connecté backend
- Simulation paiement
- Suivi des commandes
- Statut des commandes
- Profil utilisateur modifiable
- Créneaux dynamiques
- Blocage des créneaux complets

---

## Côté Administrateur

- Dashboard administrateur sécurisé
- Liste des commandes
- Mise à jour des statuts
- Statistiques globales
- Revenus
- Nombre de clients
- Commandes du jour
- Suivi des paiements
- Vue CRM simplifiée

---

# Stack utilisées

## Frontend

- HTML5
- CSS3
- JavaScript Vanilla

## Backend

- Node.js
- Express.js
- PostgreSQL

## Authentification

- JWT
- bcrypt

---

# Architecture du projet

Frontend
│
├── Pages HTML
├── Modules JavaScript
├── UI / UX
└── API Client
        │
        ▼
Backend Express API
│
├── Routes
├── Controllers
├── Services
├── Middlewares
└── PostgreSQL

# Architecture Backend

backend/src
│
├── controllers/
├── routes/
├── services/
├── middlewares/
├── config/
├── utils/
├── app.js/
└── server.js

# Architecture Frontend

frontend
│
├── pages/
├── js/
│   ├── auth/
│   ├── modules/
│   ├── api/
│   ├── ui/
│   ├── data/
│   └── main.js/
│
├── styles/
│   ├── global/
│   ├── components/
│   └── pages/
│
└── assets/
    ├── global/
    ├── components/
    └── pages/

---


# Logique Métier Implémentée

## Réservation

Le client peut sélectionner des prestations, choisir une date de collecte, choisir une date de livraison, réserver un créneau.

## Gestion des créneaux

Les créneaux possèdent une capacité maximale.

Lorsque le nombre maximum de commandes est atteint le backend refuse la réservation, le frontend désactive automatiquement le créneau.

## Workflow Commande

Réservation
→ Panier
→ Checkout
→ Création commande
→ Paiement simulé
→ Traitement admin
→ Livraison

Statuts Commande
en_attente
collecte
en_traitement
pret
livre

Statuts Paiement
pending
paid
failed

## API REST Principale

Auth

POST /api/auth/register
POST /api/auth/login

Utilisateur
GET /api/users/profile
PUT /api/users/profile
Commandes
POST /api/orders
GET /api/orders/my-orders
PUT /api/orders/:id/payment
GET /api/orders/slots/unavailable
Admin
GET /api/orders
PUT /api/orders/:id/status
GET /api/admin/stats