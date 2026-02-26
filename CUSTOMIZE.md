# ⚙️ Guide de Personnalisation - JACKPOT

## 🎰 Modifier les Gains

Ouvre **`game.js`** et trouve la constante `PRIZES` (lignes 1-20).

### Exemple : Ajouter un nouveau gain

```javascript
{ type: 'prize', value: 30000, label: 'Apple Watch', icon: '⌚' },
```

### Types disponibles :

- **`cash`** : Gains en argent
- **`prize`** : Cadeaux physiques
- **`bonus`** : Parties offertes, jokers
- **`trap`** : Boîtes éliminatoires

### ⚠️ Important :
- Le nombre total doit correspondre à `TOTAL_BOXES` (par défaut 20)
- Plus de pièges = plus difficile
- Moins de pièges = plus facile

---

## 💰 Ajuster les Prix

Dans **`game.js`**, lignes 40-42 :

```javascript
const RESCUE_PRICE = 500;  // Prix pour sauver après piège
const REPLAY_PRICE = 300;  // Prix pour rejouer
```

Change les valeurs en XPF selon ton modèle économique.

---

## ⏰ Modifier le Timer Gratuit

Par défaut : **24 heures**

Pour changer (dans `game.js`, ligne ~60) :

```javascript
const twentyFourHours = 24 * 60 * 60 * 1000;
```

Exemples :
- **12 heures** : `12 * 60 * 60 * 1000`
- **1 heure** : `1 * 60 * 60 * 1000`
- **30 minutes** : `30 * 60 * 1000`

---

## 📞 Ajuster les Offres du Banquier

Dans **`game.js`**, ligne 44 :

```javascript
const BANKER_OFFERS = [3, 6, 9, 12, 15];
```

Ces chiffres = nombre de boîtes ouvertes avant l'offre.

**Exemples :**
- Plus d'offres : `[2, 4, 6, 8, 10, 12, 14, 16]`
- Moins d'offres : `[5, 10, 15]`

### Générosité du banquier

Dans la fonction `calculateBankerOffer()` (ligne ~200) :

```javascript
const percentage = 0.6 + (Math.random() * 0.2);
```

- `0.6` = minimum 60% de la valeur moyenne
- `0.2` = jusqu'à +20% (max 80%)

**Plus généreux :**
```javascript
const percentage = 0.7 + (Math.random() * 0.2); // 70-90%
```

**Moins généreux :**
```javascript
const percentage = 0.4 + (Math.random() * 0.2); // 40-60%
```

---

## 🎨 Changer les Couleurs

Ouvre **`style.css`** :

### Fond principal (ligne 8) :
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Boîtes (ligne 84) :
```css
background: linear-gradient(135deg, #ffd89b 0%, #19547b 100%);
```

### Offre du banquier (ligne 137) :
```css
background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
```

**Générateur de dégradés :** [cssgradient.io](https://cssgradient.io)

---

## 🔤 Changer les Textes

### Titre du jeu

Dans **`index.html`**, ligne 9 :
```html
<h1>🎰 JACKPOT</h1>
```

### Sous-titre

Ligne 10 :
```html
<p class="subtitle">Tente ta chance !</p>
```

---

## 🌍 Changer la Langue

Tous les textes sont en français. Pour traduire :

1. Chercher tous les textes dans `index.html`
2. Chercher les `alert()` et messages dans `game.js`
3. Remplacer par ta langue

---

## 📱 Ajuster la Grille de Boîtes

Dans **`style.css`**, ligne 80 :

```css
grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
```

**Plus de colonnes sur mobile :**
```css
grid-template-columns: repeat(5, 1fr);
```

**Moins de colonnes :**
```css
grid-template-columns: repeat(3, 1fr);
```

---

## 🎵 Ajouter des Sons (Futur)

Pour ajouter des effets sonores :

1. Ajoute des fichiers `.mp3` dans le dossier
2. Dans `game.js`, crée des objets Audio :

```javascript
const soundOpen = new Audio('sounds/open.mp3');
const soundWin = new Audio('sounds/win.mp3');
const soundTrap = new Audio('sounds/trap.mp3');
```

3. Joue-les aux moments clés :

```javascript
function openBox(index) {
    soundOpen.play();
    // ... reste du code
}
```

---

## 🎯 Modes de Difficulté

Crée des presets dans `game.js` :

```javascript
const DIFFICULTY = {
    easy: {
        traps: 1,
        rescuePrice: 200,
        replayPrice: 100
    },
    normal: {
        traps: 3,
        rescuePrice: 500,
        replayPrice: 300
    },
    hard: {
        traps: 5,
        rescuePrice: 1000,
        replayPrice: 500
    }
};
```

---

## 🔧 Conseils d'Équilibrage

### Pour un jeu généreux :
- Moins de pièges (1-2)
- Plus de gros gains
- Banquier généreux (70-90%)
- Prix de rejeu bas (100-200 XPF)

### Pour un jeu difficile :
- Plus de pièges (4-5)
- Moins de gros gains
- Banquier avare (40-60%)
- Prix de rejeu élevé (500-1000 XPF)

### Pour maximiser les revenus :
- Équilibre pièges (3)
- Prix de sauvetage attractif (pas trop cher)
- Timer court (6-12h) pour inciter au rejeu
- Offres du banquier moyennes (garder le suspense)

---

## 📊 Tester l'Équilibrage

1. Joue 20-30 parties en notant les résultats
2. Calcule la moyenne des gains
3. Ajuste les probabilités si nécessaire

**Formule de rentabilité :**
```
Revenu moyen = (Prix rejeu × Nb parties payées) + (Prix sauvetage × Nb sauvetages)
Coût moyen = Valeur moyenne des gains distribués
Marge = Revenu - Coût
```

---

## 🚀 Déployer les Changements

Après modification :

```bash
cd /root/clawd/jackpot-game
git add .
git commit -m "Personnalisation : [description]"
git push
```

Vercel redéploie automatiquement ! 🎉

---

**Des questions ? Demande-moi !** 🛠️
