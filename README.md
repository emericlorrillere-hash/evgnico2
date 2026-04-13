# Double EVG 2027 — Site web

Site d'information pour le double EVG Amsterdam + Lanzarote.

## Déployer sur Vercel

1. Pousse ce dossier complet sur un repo GitHub
2. Va sur [vercel.com](https://vercel.com) et connecte-toi avec GitHub
3. Clique "Add New Project" → sélectionne ton repo
4. Vercel détecte automatiquement Vite — clique "Deploy"
5. C'est en ligne en ~1 minute !

## Développement local

```bash
npm install
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

## Structure

```
├── index.html          # Point d'entrée HTML
├── package.json        # Dépendances
├── vite.config.js      # Config Vite
└── src/
    ├── main.jsx        # Point d'entrée React
    ├── App.jsx         # Composant principal (le site EVG)
    └── index.css       # Reset CSS
```
