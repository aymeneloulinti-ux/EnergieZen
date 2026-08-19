# EnergieZen Backend

API REST du projet **EnergieZen**, une plateforme de réservation de soins énergétiques. Le backend permet de gérer les utilisateurs, les praticiens, les services proposés, les disponibilités et le cycle de vie des rendez-vous.

## Fonctionnalités

- Inscription et connexion avec authentification JWT
- Gestion des profils utilisateurs et des mots de passe
- Gestion des rôles `CLIENT`, `PRACTITIONER` et `ADMIN`
- Consultation des praticiens et des services actifs
- Création et administration des services
- Configuration des horaires hebdomadaires des praticiens
- Gestion des fermetures exceptionnelles et des horaires personnalisés
- Calcul des créneaux disponibles dans le fuseau `Europe/Brussels`
- Réservation, confirmation, annulation et suivi des rendez-vous
- Statistiques globales pour le dashboard administrateur
- Endpoint de santé avec vérification de la connexion à la base de données

## Stack technique

- **Node.js** avec modules ES (`type: module`)
- **Express 5** pour l’API HTTP
- **PostgreSQL** pour la persistance des données
- **Prisma 7** avec l’adaptateur `@prisma/adapter-pg`
- **JWT** pour les sessions API
- **bcryptjs** pour le hachage des mots de passe
- **date-fns-tz** pour la gestion des horaires en heure de Bruxelles
- **Helmet** et **CORS** pour les middlewares HTTP
- **Nodemon** pour le développement
- **Node.js Test Runner** (`node:test`) pour les tests d’intégration HTTP

## Architecture

```text
src/
├── app.js                 # Configuration Express et montage des routes
├── server.js              # Point de démarrage du serveur
├── config/                # Client Prisma
├── controllers/           # Traduction requêtes HTTP -> réponses HTTP
├── middlewares/           # Authentification JWT et contrôle des rôles
├── routes/                # Définition des endpoints REST
├── services/              # Logique métier et accès aux données
├── utils/                 # JWT et gestion des dates
└── generated/prisma/      # Client Prisma généré

prisma/
├── schema.prisma          # Modèles, relations et enums
├── seed.js                # Données de démonstration
└── migrations/            # Historique des migrations PostgreSQL

tests/
└── api.test.js             # Tests d’intégration de l’API REST
```

Le code suit une séparation simple entre les routes, les controllers et les services. Les controllers gèrent les statuts HTTP et les messages d’erreur, tandis que les services portent les règles métier et les requêtes Prisma.

## Prérequis

- Node.js 20 ou supérieur recommandé
- PostgreSQL accessible depuis l’environnement local
- npm

## Installation

```bash
git clone <url-du-depot>
cd energiezen-backend
npm install
```

Créer un fichier `.env` à la racine :

```env
PORT=3000
DATABASE_URL="postgresql://postgres:password@localhost:5432/energiezen?schema=public"
JWT_SECRET="change-this-secret"
JWT_EXPIRES_IN="7d"
```

Initialiser la base et générer le client Prisma :

```bash
npx prisma migrate dev
npx prisma generate
node prisma/seed.js
```

Le seed crée des comptes de démonstration, un praticien, ses horaires et trois services. Les identifiants présents dans `prisma/seed.js` sont réservés au développement local et doivent être remplacés dans tout environnement partagé.

## Démarrage

Développement avec rechargement automatique :

```bash
npm run dev
```

Démarrage standard :

```bash
npm start
```

L’API est disponible par défaut sur `http://localhost:3000` si `PORT=3000` est configuré.

## Authentification

Les endpoints protégés attendent un token JWT dans l’en-tête HTTP :

```http
Authorization: Bearer <token>
```

Les tokens sont délivrés par `POST /api/auth/register` et `POST /api/auth/login`. Le middleware vérifie le token, l’existence du compte et son statut actif avant d’ajouter l’utilisateur à la requête.

## Rôles

| Rôle | Responsabilités principales |
| --- | --- |
| `CLIENT` | Consulter les services et praticiens, voir les créneaux, réserver et gérer ses rendez-vous |
| `PRACTITIONER` | Gérer ses horaires, ses exceptions et le statut de ses rendez-vous |
| `ADMIN` | Administrer les utilisateurs, services et associations praticiens/services, consulter les statistiques |

## API principale

Toutes les routes sont préfixées par `/api`.

### Santé et authentification

| Méthode | Endpoint | Accès | Description |
| --- | --- | --- | --- |
| `GET` | `/health` | Public | Vérifie l’état de l’API et de la base de données |
| `POST` | `/auth/register` | Public | Crée un compte client et renvoie un token |
| `POST` | `/auth/login` | Public | Authentifie un utilisateur et renvoie un token |

### Services et praticiens

| Méthode | Endpoint | Accès | Description |
| --- | --- | --- | --- |
| `GET` | `/services` | Public | Liste les services actifs |
| `GET` | `/services/:id` | Public | Récupère un service par identifiant |
| `GET` | `/services/slug/:slug` | Public | Récupère un service par slug |
| `POST` | `/services` | Admin | Crée un service |
| `PATCH` | `/services/:id` | Admin | Modifie un service |
| `PATCH` | `/services/:id/status` | Admin | Active ou désactive un service |
| `GET` | `/practitioners` | Public | Liste les praticiens actifs et leurs services |
| `GET` | `/practitioners/:id` | Public | Récupère un praticien |
| `POST` | `/practitioners/:practitionerId/services/:serviceId` | Admin | Associe un service à un praticien |
| `DELETE` | `/practitioners/:practitionerId/services/:serviceId` | Admin | Retire une association |

### Rendez-vous et disponibilités

| Méthode | Endpoint | Accès | Description |
| --- | --- | --- | --- |
| `GET` | `/availability/slots` | Public | Retourne les créneaux disponibles avec `practitionerId`, `serviceId` et `date` |
| `GET` | `/availability/weekly` | Praticien/Admin | Consulte les horaires hebdomadaires |
| `PUT` | `/availability/weekly` | Praticien/Admin | Remplace les horaires hebdomadaires |
| `GET` | `/availability/exceptions` | Praticien/Admin | Liste les exceptions de disponibilité |
| `POST` | `/availability/exceptions` | Praticien/Admin | Crée une fermeture ou un horaire personnalisé |
| `PUT` | `/availability/exceptions/:id` | Praticien/Admin | Modifie une exception |
| `DELETE` | `/availability/exceptions/:id` | Praticien/Admin | Supprime une exception |
| `POST` | `/appointments` | Client | Réserve un créneau |
| `GET` | `/appointments/my` | Client | Liste ses rendez-vous |
| `GET` | `/appointments/:id` | Client | Consulte un rendez-vous |
| `PATCH` | `/appointments/:id/cancel` | Client | Annule son rendez-vous |
| `GET` | `/appointments/practitioner` | Praticien/Admin | Liste les rendez-vous du praticien connecté |
| `PATCH` | `/appointments/:id/confirm` | Praticien/Admin | Confirme un rendez-vous en attente |
| `PATCH` | `/appointments/:id/cancel-by-practitioner` | Praticien/Admin | Annule un rendez-vous avec motif |
| `PATCH` | `/appointments/:id/complete` | Praticien/Admin | Marque un rendez-vous comme terminé |
| `PATCH` | `/appointments/:id/no-show` | Praticien/Admin | Marque un client absent |

Les créneaux sont générés par intervalles de 30 minutes. Une réservation est refusée si elle ne correspond pas à un créneau calculé ou si elle chevauche un rendez-vous existant.

### Utilisateurs et administration

| Méthode | Endpoint | Accès | Description |
| --- | --- | --- | --- |
| `GET` | `/users/me` | Authentifié | Consulte son profil |
| `PATCH` | `/users/me` | Authentifié | Modifie son profil |
| `PATCH` | `/users/me/password` | Authentifié | Modifie son mot de passe |
| `GET` | `/users` | Admin | Liste les utilisateurs |
| `GET` | `/users/:id` | Admin | Consulte un utilisateur |
| `PATCH` | `/users/:id` | Admin | Modifie un utilisateur |
| `PATCH` | `/users/:id/role` | Admin | Modifie son rôle |
| `PATCH` | `/users/:id/status` | Admin | Active ou désactive un compte |
| `GET` | `/admin/dashboard` | Admin | Retourne les statistiques utilisateurs, services et rendez-vous |

## Modèle de données

Le schéma Prisma contient les entités principales suivantes :

- `User` : identité, compte, rôle et statut actif
- `Practitioner` : profil métier lié à un utilisateur
- `Service` : prestation, durée, prix, slug et statut actif
- `WeeklyAvailability` : horaires récurrents d’un praticien
- `AvailabilityException` : fermeture ou horaires spécifiques à une date
- `Appointment` : réservation reliant un client, un praticien et un service

Les rendez-vous suivent les statuts `PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED` et `NO_SHOW`. Les dates sont stockées en base et les horaires métier sont interprétés dans le fuseau `Europe/Brussels`.

## Commandes Prisma utiles

```bash
npx prisma validate
npx prisma format
npx prisma migrate dev
npx prisma generate
npx prisma studio
```

## Tests

Les tests utilisent le runner natif de Node.js (`node:test`) et appellent l’API via `fetch`. Il s’agit de tests d’intégration qui nécessitent une instance du serveur en cours d’exécution.

Dans un premier terminal, préparer la base de données puis démarrer l’API sur le port attendu par les tests :

```bash
node prisma/seed.js
PORT=8080 npm start
```

Dans un second terminal, lancer la suite :

```bash
npm test
```

La suite couvre notamment :

- la connexion des comptes client, praticien et administrateur ;
- la consultation et la protection des profils utilisateurs ;
- l’accès public aux services et aux praticiens ;
- la recherche d’un service par slug ;
- le healthcheck et la connexion à la base de données ;
- la récupération des créneaux, horaires hebdomadaires et exceptions de disponibilité ;
- la consultation des rendez-vous client et praticien ;
- la validation d’une création de rendez-vous incomplète ;
- l’accès administrateur au dashboard ;
- les refus d’accès liés aux rôles ;
- les routes protégées sans token ou avec un token invalide ;
- la vérification qu’aucun mot de passe n’est exposé dans les réponses API.

Les tests s’appuient sur les comptes de démonstration présents dans `prisma/seed.js`. Ils doivent donc être exécutés sur une base locale dédiée et réinitialisée si nécessaire avant une nouvelle exécution.

## Licence

Le projet est actuellement déclaré sous licence `ISC` dans `package.json`.