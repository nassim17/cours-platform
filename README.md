# Cours Platform (Front-only v1)

Front Angular (multi-locale FR + EN) pour publier des cours en Markdown.

## Prérequis
- Node.js **20.19+** (ou 22.12+ / 24+) et npm. Voir compatibilité Angular v21.  
- Git

## Installation
```bash
npm i
npm run start
```

## Build multi-locale (FR à la racine + EN sous /en)
```bash
npm run build
# sortie: dist/cloudflare/
```

## Déploiement Cloudflare Pages
Voir la section "Déploiement" dans la réponse ChatGPT (ou adapte la sortie dist/cloudflare comme Build directory).
