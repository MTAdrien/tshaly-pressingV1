Tshaly Pressing — SaaS V1

Tshaly Pressing est un projet Full Stack développé autour d’un besoin métier concret :
Permettre à un pressing de gérer ses commandes en ligne avec une logique proche d’un vrai fonctionnement terrain.

L’idée de départ était de comprendre comment construire une application SaaS complète côté frontend et backend, tout en travaillant sur un projet crédible pour mon portfolio développeur junior.

Ce projet a également été pour moi une manière d’apprendre à développer dans un environnement moderne où les outils d’IA prennent une place importante. Certaines parties du code ont été générées ou accélérées avec l’aide de l’IA, mais l’objectif principal reste la compréhension de la logique métier, de l’architecture et du fonctionnement global de l’application.

Le fonctionnement général est le suivant :

Un utilisateur peut créer un compte, se connecter, réserver une collecte, ajouter des prestations à son panier puis suivre l’état de sa commande.
Côté administrateur, un dashboard permet de suivre les commandes, les revenus, les clients et l’évolution des statuts.

Le projet a surtout été construit pour apprendre à structurer une vraie application web moderne :

- séparation frontend/backend,
- architecture MVC,
- gestion d’API REST,
- PostgreSQL,
- authentification JWT,
- logique métier,
- déploiement cloud.

Le backend est construit avec Node.js, Express et PostgreSQL.

L’API expose plusieurs routes sécurisées pour gérer les utilisateurs, les commandes et les fonctionnalités administrateur.

L’application utilise notamment :

- un système d’authentification avec JWT,
- des middlewares de protection de routes,
- des rôles admin/client,
- des calculs automatiques de commandes,
- une logique de limitation de créneaux,
- un dashboard métier avec statistiques.

L’objectif n’était pas de créer une application parfaite, mais surtout de comprendre comment une vraie application Full Stack fonctionne dans son ensemble.

## Démo ##

Frontend : https://tshaly-pressing-v1.vercel.app

Backend API : https://tshaly-pressingv1.onrender.com

Exemple d’endpoint de test API:

GET /api/test

Retour :

{
  "message": "API Tshaly Pressing opérationnelle"
}


## Screenshots ##

Les captures sont accèssibles dans "README/assets/screenshots/":

![Accueil](README/assets/screenshots/home.png) et ![Accueil mobile](README/assets/screenshots/home-mobile.png)

![Dashboard](README/assets/screenshots/dashboard.png) et ![Dashboard mobile](README/assets/screenshots/dashboard-mobile.png)

![Mon Compte](README/assets/screenshots/mon-compte.png) et ![Mon compte mobile](README/assets/screenshots/mon-compte.png)

![Réservation](README/assets/screenshots/reservation.png) et ![Réservation mobile](README/assets/screenshots/reservation-mobile.png)

![Tarifs](README/assets/screenshots/tarifs.png) et ![Tarifs mobile](README/assets/screenshots/tarifs-mobile.png)

![Inscription](README/assets/screenshots/inscription.png) et ![Inscription mobile](README/assets/screenshots/inscription-mobile.png)

![Connexion](README/assets/screenshots/connexion.png) et ![connexion mobile](README/assets/screenshots/connexion-mobile.png)

## Fonctionnalités ##

L’application permet aujourd’hui :

- l’inscription et la connexion utilisateur avec JWT,
- la protection des routes privées,
- la gestion des rôles admin/client,
- la création de commandes,
- l’ajout d’articles dans une commande,
- le calcul automatique du montant total,
- le suivi des statuts de traitement,
- la simulation de paiement,
- la récupération des commandes utilisateur,
- la limitation du nombre de commandes par créneau,
- l’affichage des créneaux complets,
- un dashboard administrateur avec statistiques métier.

Le backend repose sur plusieurs routes organisées par domaine :

/api/auth
/api/users
/api/orders
/api/admin

L’authentification fonctionne avec JWT et middleware de protection.
Les routes administrateur utilisent également un contrôle de rôle afin de limiter l’accès aux fonctionnalités sensibles.

La logique métier des commandes a été l’une des parties les plus intéressantes à construire.
Le backend vérifie par exemple :

- que le panier n’est pas vide
- que les quantités sont valides
- que les prix sont cohérents
- que les créneaux ne dépassent pas une capacité maximale
- puis calcule automatiquement le total de la commande côté serveur.

## Stack technique ##

Frontend
HTML
CSS
JavaScript

J’ai volontairement utilisé JavaScript pour mieux comprendre les bases du développement frontend et m'exercer avant de passer à des frameworks plus avancés.

Backend
Node.js
Express.js

Express a été choisi pour apprendre la création d’API REST de manière assez simple et lisible.
Cela m’a permis de mieux comprendre les routes, les middlewares, les contrôleurs et la séparation des responsabilités.

Le backend utilise une structure MVC afin d’éviter d’avoir toute la logique dans un seul fichier.

Base de données
PostgreSQL

PostgreSQL a été utilisé pour travailler une vraie base relationnelle avec :

- relations utilisateurs/commandes,
- requêtes SQL,
- agrégations,
- logique métier côté backend.

Le projet utilise le package pg pour la connexion à la base.

Authentification
JWT
bcrypt

Les mots de passe sont hashés avec bcrypt avant stockage.

Les tokens JWT permettent de sécuriser les routes privées et de gérer les rôles utilisateur/admin.

## Déploiement ##

Le projet a été pensé pour être déployé progressivement sur des solutions cloud accessibles pour un projet junior :

Vercel (frontend),
Render (backend),
Neon PostgreSQL.

L’objectif était aussi de comprendre les problématiques réelles de déploiement et de configuration d’environnement.

## Architecture du projet ##

Le projet est séparé en deux parties :

frontend/
backend/

Le backend suit une organisation MVC relativement simple :

src/
├── controllers/
├── services/
├── routes/
├── middlewares/
├── config/
├── utils/
├── app.js
└── server.js

Les routes gèrent les endpoints API.

Les controllers reçoivent les requêtes HTTP et gèrent les réponses.

Les services centralisent la logique métier et les requêtes PostgreSQL.

Par exemple :

auth.controller.js gère login/register,
order.service.js gère les opérations liées aux commandes et aux créneaux,
admin.service.js centralise les statistiques dashboard.

Cette structure m’a permis de mieux comprendre comment organiser une application backend de manière plus propre et évolutive.

## Installation ##

Cloner le projet
git clone https://github.com/MTAdrien/tshaly-pressing.git

Installer les dépendances
npm install

Lancer le serveur
npm run dev

Exemple de fichier .env

PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=tshaly_pressing
DB_USER=mon_user
DB_PASSWORD=mon_password

JWT_SECRET=cle_de_securite_secrete

Pour des raisons de sécurité les vraies variables d’environnement ne sont pas présentes dans le repository.

## Ce que j'ai appris ##

Ce projet m’a surtout permis de mieux comprendre le fonctionnement d’une application Full Stack complète.

Avant ce projet, je connaissais surtout les bases frontend (Html, Css et JavaScript).

Le backend m’a obligé à réfléchir différemment sur:
- la structuration du code,
- la logique métier,
- la sécurisation,
- la validation des données,
- la communication frontend/backend,
- la gestion des erreurs,
- l'organisation des routes.

J’ai également beaucoup appris sur :

- PostgreSQL,
- les relations entre tables,
- les middlewares Express,
- l’authentification JWT,
- le hashing de mots de passe,
- le debugging,
- le déploiement cloud.

La partie API REST a été particulièrement formatrice parce qu’elle m’a obligé à comprendre comment les données circulent réellement entre le frontend, le backend et la base de données.

Le fait de construire un vrai workflow utilisateur m’a aussi permis de mieux comprendre la logique produit derrière une application SaaS.

## Difficultés rencontrées ##

Le projet m’a confronté à plusieurs problèmes assez concrets.

Une des principales difficultés a été la logique de calcul des commandes.
J’ai rencontré plusieurs bugs liés :

aux quantités,
au calcul du montant total,
aux types de données,
à la synchronisation frontend/backend.

La gestion des créneaux a également demandé plusieurs corrections pour éviter les réservations dépassant la capacité maximale autorisée.

L’authentification JWT a aussi été une étape importante parce qu’elle m’a obligé à comprendre :

- les tokens,
- les middlewares,
- les headers,
- la protection des routes,
- les rôles utilisateurs/admin.

J’ai aussi rencontré plusieurs erreurs liées :

- à PostgreSQL,
- à la configuration serveur,
- aux variables d’environnement,
- au déploiement,
- aux appels API côté frontend.

Même si certaines erreurs étaient parfois frustrantes, elles m’ont surtout aidé à progresser en debugging et en compréhension globale du développement backend.

## Améliorations futures ##

Le projet reste une V1 et plusieurs améliorations sont prévues progressivement :

- amélioration de l’interface utilisateur,
- historique plus détaillé des commandes,
- notifications utilisateur,
- gestion plus avancée des paiements,
- optimisation mobile,
- validation frontend plus complète,
- amélioration de la gestion des créneaux,
- nettoyage et refactorisation progressive du code,
- ajout de tests backend simples.

Je préfère faire évoluer le projet étape par étape, tout en me formant, plutôt que d’ajouter trop de complexité trop tôt.

## Auteur ##

Développé par un développeur Full Stack en formation, dans une logique d’apprentissage professionnalisante autour du Software Development, des SaaS et des solutions métiers.

Je construis progressivement des projets orientés :

- applications web,
- automatisation,
- IA appliquée,
- outils SaaS,
- digitalisation métier.

Ce projet fait partie de mon parcours pour évoluer vers un profil Full Stack puis AI Software Developer.

GitHub : https://github.com/MTAdrien
LinkedIn : https://www.linkedin.com/in/muyard-ta

