# 💡 Exemples de Code - Extensions Futures

## 🎵 Ajouter des Sons

### 1. Télécharge des sons gratuits
- [Freesound.org](https://freesound.org)
- [Mixkit.co](https://mixkit.co/free-sound-effects/)
- [Zapsplat.com](https://www.zapsplat.com)

### 2. Crée un dossier `sounds/`
```bash
mkdir sounds
# Ajoute tes fichiers : open.mp3, win.mp3, lose.mp3, banker.mp3
```

### 3. Ajoute dans `game.js` (début du fichier)
```javascript
// Sons
const sounds = {
    open: new Audio('sounds/open.mp3'),
    win: new Audio('sounds/win.mp3'),
    lose: new Audio('sounds/lose.mp3'),
    banker: new Audio('sounds/banker.mp3'),
    click: new Audio('sounds/click.mp3')
};

// Volume par défaut
Object.values(sounds).forEach(sound => sound.volume = 0.5);

// Fonction helper
function playSound(soundName) {
    if (sounds[soundName]) {
        sounds[soundName].currentTime = 0; // Reset pour rejouer rapidement
        sounds[soundName].play().catch(e => console.log('Audio blocked'));
    }
}
```

### 4. Utilise dans les fonctions
```javascript
function openBox(index) {
    playSound('open');
    // ... reste du code
}

function showBankerOffer() {
    playSound('banker');
    // ... reste du code
}

function showResult(title, prize, message) {
    if (title.includes('Félicitations')) {
        playSound('win');
    } else {
        playSound('lose');
    }
    // ... reste du code
}
```

---

## 🎊 Ajouter des Confetti

### 1. Installe canvas-confetti (via CDN)

Dans `index.html`, avant `</body>` :
```html
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>
```

### 2. Utilise dans `game.js`

```javascript
function showConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Lors d'un gros gain
function showResult(title, prize, message) {
    const prizeValue = gameState.boxes[gameState.playerBoxIndex].value;
    
    // Confetti pour gains > 10 000 XPF
    if (prizeValue > 10000) {
        setTimeout(() => showConfetti(), 500);
    }
    
    // ... reste du code
}
```

---

## 📳 Ajouter des Vibrations (Mobile)

### Dans `game.js`

```javascript
function vibrate(duration = 50) {
    if (navigator.vibrate) {
        navigator.vibrate(duration);
    }
}

// Utilisation
function openBox(index) {
    vibrate(30); // Petite vibration
    // ... reste du code
}

function showTrapScreen() {
    vibrate([100, 50, 100, 50, 100]); // Pattern
    // ... reste du code
}
```

---

## 🎨 Ajouter des Thèmes

### 1. Dans `style.css`, ajoute à la fin :

```css
/* Thème Nuit */
body.theme-night {
    background: linear-gradient(135deg, #141e30 0%, #243b55 100%);
}

body.theme-night .box {
    background: linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%);
}

/* Thème Océan */
body.theme-ocean {
    background: linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%);
}

body.theme-ocean .box {
    background: linear-gradient(135deg, #00c6ff 0%, #0072ff 100%);
}

/* Thème Sunset */
body.theme-sunset {
    background: linear-gradient(135deg, #ff0844 0%, #ffb199 100%);
}

body.theme-sunset .box {
    background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
}
```

### 2. Dans `index.html`, ajoute après le header :

```html
<div class="theme-selector">
    <button onclick="setTheme('default')">🌈 Classique</button>
    <button onclick="setTheme('night')">🌙 Nuit</button>
    <button onclick="setTheme('ocean')">🌊 Océan</button>
    <button onclick="setTheme('sunset')">🌅 Sunset</button>
</div>
```

### 3. Dans `game.js`, ajoute :

```javascript
function setTheme(theme) {
    // Retire tous les thèmes
    document.body.className = '';
    
    // Applique le nouveau thème
    if (theme !== 'default') {
        document.body.classList.add(`theme-${theme}`);
    }
    
    // Sauvegarde la préférence
    localStorage.setItem('theme', theme);
}

// Charge le thème au démarrage
function loadTheme() {
    const theme = localStorage.getItem('theme') || 'default';
    setTheme(theme);
}

// Appelle dans initGame()
function initGame() {
    loadTheme(); // Ajoute cette ligne
    checkFreePlayTimer();
    // ... reste du code
}
```

---

## 📊 Ajouter Google Analytics

### 1. Crée un compte Google Analytics

1. Va sur [analytics.google.com](https://analytics.google.com)
2. Crée une propriété
3. Récupère ton ID (ex: `G-XXXXXXXXXX`)

### 2. Dans `index.html`, ajoute dans `<head>` :

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 3. Track des événements dans `game.js` :

```javascript
function trackEvent(category, action, label = '') {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Exemples d'utilisation
function startGame() {
    trackEvent('Game', 'Start', 'Free Play');
    // ... reste du code
}

function acceptOffer() {
    trackEvent('Game', 'Accept Offer', gameState.currentOffer.toString());
    // ... reste du code
}

function buyRescue() {
    trackEvent('Payment', 'Rescue', RESCUE_PRICE.toString());
    // ... reste du code
}
```

---

## 💳 Intégrer Stripe (Paiements Réels)

### 1. Crée un compte Stripe

1. Va sur [stripe.com](https://stripe.com)
2. Crée un compte
3. Récupère ta clé publique (pk_test_xxx en test)

### 2. Dans `index.html`, ajoute avant `</body>` :

```html
<script src="https://js.stripe.com/v3/"></script>
```

### 3. Crée un backend simple (Node.js/Express)

**backend/server.js**
```javascript
const express = require('express');
const stripe = require('stripe')('sk_test_VOTRE_CLE_SECRETE');
const app = express();

app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // en centimes
        currency: 'xpf',
    });
    
    res.json({ clientSecret: paymentIntent.client_secret });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### 4. Modifie `simulatePayment()` dans `game.js` :

```javascript
async function simulatePayment() {
    const amount = parseInt(document.getElementById('paymentAmount').textContent);
    
    // Appel au backend
    const response = await fetch('https://ton-backend.com/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amount })
    });
    
    const { clientSecret } = await response.json();
    
    // Initialise Stripe
    const stripe = Stripe('pk_test_VOTRE_CLE_PUBLIQUE');
    
    // Affiche le formulaire de paiement
    const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: cardElement, // À créer avec Stripe Elements
        }
    });
    
    if (error) {
        alert('Paiement échoué : ' + error.message);
    } else {
        alert('✅ Paiement réussi !');
        closePayment();
        // ... reste du code
    }
}
```

---

## 📱 Transformer en PWA (App Installable)

### 1. Crée `manifest.json` :

```json
{
  "name": "Jackpot - Jeu Polynésien",
  "short_name": "Jackpot",
  "description": "Tentez votre chance et gagnez des prix !",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#667eea",
  "theme_color": "#667eea",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 2. Dans `index.html`, ajoute dans `<head>` :

```html
<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#667eea">
<link rel="apple-touch-icon" href="icon-192.png">
```

### 3. Crée `service-worker.js` :

```javascript
const CACHE_NAME = 'jackpot-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/game.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

### 4. Dans `game.js`, enregistre le service worker :

```javascript
// À la fin du fichier
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('Service Worker enregistré'))
        .catch(err => console.log('Erreur SW:', err));
}
```

---

## 🗄️ Ajouter un Classement (Backend nécessaire)

### Frontend - Dans `game.js` :

```javascript
async function saveScore(name, prize) {
    await fetch('https://ton-backend.com/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, prize, timestamp: Date.now() })
    });
}

async function loadLeaderboard() {
    const response = await fetch('https://ton-backend.com/scores/top10');
    const scores = await response.json();
    
    // Afficher dans l'UI
    const leaderboardHTML = scores.map((s, i) => 
        `<div>${i + 1}. ${s.name} - ${s.prize} XPF</div>`
    ).join('');
    
    document.getElementById('leaderboard').innerHTML = leaderboardHTML;
}
```

---

**Ces exemples sont des points de départ. Adapte-les à tes besoins ! 🚀**
