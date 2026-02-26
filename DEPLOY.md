# 🚀 Guide de Déploiement - JACKPOT

## Prérequis

- Compte GitHub (que tu as déjà ✅)
- Compte Vercel (que tu as déjà ✅)

## Option 1 : Déploiement sur Vercel (Recommandé)

### Étape 1 : Push sur GitHub

1. Va sur GitHub.com et crée un nouveau repo :
   - Nom : `jackpot-game` (ou autre)
   - Type : Public ou Private
   - Ne pas initialiser avec README (on a déjà les fichiers)

2. Dans ton terminal local, connecte le repo :
```bash
cd /root/clawd/jackpot-game
git remote add origin https://github.com/[TON-USERNAME]/jackpot-game.git
git branch -M main
git push -u origin main
```

### Étape 2 : Déployer sur Vercel

1. Va sur [vercel.com](https://vercel.com)
2. Clique "Import Project"
3. Sélectionne ton repo `jackpot-game` depuis GitHub
4. Vercel détecte automatiquement que c'est un site statique
5. Clique "Deploy"

**C'est tout !** Ton jeu sera en ligne en 30 secondes avec une URL type :
`https://jackpot-game-xxxx.vercel.app`

### Étape 3 : Domaine personnalisé (optionnel)

Dans Vercel → Settings → Domains :
- Ajoute ton propre domaine (ex: `jackpot.pf`)
- Suis les instructions DNS

---

## Option 2 : GitHub Pages

### Configuration

1. Push ton code sur GitHub (voir étape 1 ci-dessus)

2. Sur GitHub, va dans :
   - Settings → Pages
   - Source : `main` branch
   - Folder : `/ (root)`
   - Save

3. Attends 1-2 minutes, ton jeu sera disponible sur :
   `https://[ton-username].github.io/jackpot-game/`

---

## 📱 Test sur Mobile

Une fois déployé :

1. Ouvre l'URL sur ton smartphone
2. Le design s'adapte automatiquement
3. Tu peux "Ajouter à l'écran d'accueil" pour une expérience app-like

---

## 🔄 Mises à jour

Pour déployer des modifications :

```bash
cd /root/clawd/jackpot-game
git add .
git commit -m "Description de tes changements"
git push
```

- **Vercel** redéploie automatiquement à chaque push
- **GitHub Pages** redéploie en 1-2 minutes

---

## ⚙️ Configuration Future

### Activer les vrais paiements

Quand tu seras prêt à passer en prod :

1. **Intégrer Stripe :**
   - Créer un compte sur [stripe.com](https://stripe.com)
   - Ajouter les clés API dans le code
   - Remplacer `simulatePayment()` par appel API Stripe

2. **Backend (optionnel) :**
   - Créer un serveur Node.js/Express
   - Gérer la base de données des gains
   - API pour valider les paiements

3. **Mentions légales :**
   - Conditions d'utilisation
   - Politique de confidentialité (RGPD)
   - Règlement du jeu (légal Polynésie française)

---

## 📊 Analytics (optionnel)

Ajouter Google Analytics pour suivre :
- Nombre de joueurs
- Parties jouées
- Taux de conversion paiements

---

## 🛡️ Sécurité

En mode production :
- Ajouter HTTPS (automatique avec Vercel)
- Valider les paiements côté serveur
- Rate limiting sur les parties gratuites (empêcher la triche)

---

**Besoin d'aide ? Demande-moi !** 🚀
