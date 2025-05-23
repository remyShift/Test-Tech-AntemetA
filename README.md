# Test-Tech-AntemetA

## Description

Cette API REST permet de transcrire un fichier audio au format `.wav` en texte. L’API est développée avec Node.js (Express) pour la gestion des routes et du serveur, Multer pour la gestion des fichiers, Jest et Supertest pour les tests et TypeScript pour la sécurité de typage. Elle est conteneurisée avec Docker pour faciliter le déploiement.

## Fonctionnalités

- **POST /transcription** : Endpoint acceptant un fichier audio `.wav` via `multipart/form-data` et retournant le texte transcrit.

## Prérequis

- Docker (pour l’exécution conteneurisée)
- Node.js (pour un lancement local, optionnel)

## Installation & Lancement

### Avec Docker

1. Construire l’image Docker :
   ```sh
   docker build -t test-tech-antemeta .
   ```

2. Lancer le conteneur :
   ```sh
    docker run -e PORT=3000 -e OPENAI_API_KEY=YOURAPIKEY test-tech-antemeta
   ```

### En local (hors Docker)

1. Installer les dépendances :
   ```sh
   npm install
   ```

2. Lancer l’application :
   ```sh
   npm start
   ```

NB : Ne pas oublier de créer un fichier `.env` avec la variable d'environnement `OPENAI_API_KEY` pour la clé API d'OpenAI et `PORT` pour le port de l'application.

## Utilisation de l’API

### Endpoint de transcription

- **URL** : `POST /transcription`
- **Paramètre** : fichier audio `.wav` envoyé via `multipart/form-data` (clé : `file`)
- **Réponse** : texte transcrit en JSON

#### Exemple avec `curl` :

```sh
curl -X POST http://localhost:3000/transcription \
  -F "file=@/chemin/vers/votre_fichier.wav"
```

## Tests

Des tests unitaires sont présents dans le dossier `src/tests/`. Pour les exécuter :

```sh
npm test
```

## Choix technologiques

- **Node.js & Express** : Simplicité et rapidité de mise en place d’une API REST,
- **TypeScript** : Sécurité de typage et meilleure maintenabilité du code,
- **Multer** : Middleware pour Express pour gérer les fichiers uploadés via `multipart/form-data`,
- **Docker** : Portabilité et facilité de déploiement,
- **Jest** : Framework de tests moderne et efficace pour Node.js,
- **Supertest** : Framework de tests pour Express pour les tests d'API sans avoir à démarrer le serveur,
- **OpenAI** : Service de transcription vocale largement documenté et facile à utiliser.

## Structure du projet

```
src/
  routes/         # Définition des routes Express
  utils/          # Fonctions utilitaires (notamment l'appel à l'API OpenAI pour la transcription vocale)
  tests/          # Tests unitaires
  app.ts          # Configuration de l’application Express
  server.ts       # Point d’entrée du serveur
Dockerfile        # Configuration Docker
package.json      # Dépendances et scripts
```

## Remarques

- L’API attend des fichiers au format `.wav` pour garantir la compatibilité avec les services de transcription.
