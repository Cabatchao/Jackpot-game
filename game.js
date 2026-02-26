// Game Configuration
const PRIZES = [
    { type: 'cash', value: 119300, label: '119 300 XPF', icon: '💰' },
    { type: 'prize', value: 100000, label: 'PS5', icon: '🎮' },
    { type: 'cash', value: 23860, label: '23 860 XPF', icon: '💵' },
    { type: 'cash', value: 11930, label: '11 930 XPF', icon: '💵' },
    { type: 'cash', value: 5965, label: '5 965 XPF', icon: '💵' },
    { type: 'cash', value: 1193, label: '1 193 XPF', icon: '💵' },
    { type: 'prize', value: 20000, label: 'Carte 200€', icon: '🎁' },
    { type: 'prize', value: 10000, label: 'Carte 100€', icon: '🎁' },
    { type: 'prize', value: 5000, label: 'Carte 50€', icon: '🎁' },
    { type: 'bonus', value: 0, label: 'Partie offerte', icon: '🎟️' },
    { type: 'bonus', value: 0, label: 'Joker offert', icon: '🃏' },
    { type: 'cash', value: 596, label: '596 XPF', icon: '💰' },
    { type: 'cash', value: 2386, label: '2 386 XPF', icon: '💰' },
    { type: 'cash', value: 7158, label: '7 158 XPF', icon: '💰' },
    { type: 'cash', value: 3579, label: '3 579 XPF', icon: '💰' },
    { type: 'trap', value: -1, label: 'ÉLIMINÉ !', icon: '💣' },
    { type: 'trap', value: -1, label: 'BOOM !', icon: '💣' },
    { type: 'trap', value: -1, label: 'GAME OVER', icon: '💣' },
    { type: 'cash', value: 15000, label: '15 000 XPF', icon: '💵' },
    { type: 'cash', value: 50000, label: '50 000 XPF', icon: '💵' }
];

const TOTAL_BOXES = 20;
const BANKER_OFFERS = [3, 6, 9, 12, 15]; // After opening these many boxes
const RESCUE_PRICE = 500; // XPF
const REPLAY_PRICE = 300; // XPF

// Game State
let gameState = {
    boxes: [],
    playerBoxIndex: null,
    openedBoxes: [],
    currentOffer: 0,
    gameEnded: false,
    lastFreePlay: null
};

// Initialize game
function initGame() {
    checkFreePlayTimer();
    createBoxes();
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Check if player can play for free
function checkFreePlayTimer() {
    const lastPlay = localStorage.getItem('lastFreePlay');
    if (!lastPlay) return true;
    
    const now = Date.now();
    const timePassed = now - parseInt(lastPlay);
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    return timePassed >= twentyFourHours;
}

// Update countdown timer
function updateTimer() {
    const lastPlay = localStorage.getItem('lastFreePlay');
    const timerEl = document.getElementById('timer');
    
    if (!lastPlay) {
        timerEl.textContent = '✅ Partie gratuite disponible !';
        timerEl.style.background = 'rgba(76, 175, 80, 0.3)';
        return;
    }
    
    const now = Date.now();
    const timePassed = now - parseInt(lastPlay);
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const timeLeft = twentyFourHours - timePassed;
    
    if (timeLeft <= 0) {
        timerEl.textContent = '✅ Partie gratuite disponible !';
        timerEl.style.background = 'rgba(76, 175, 80, 0.3)';
        return;
    }
    
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    timerEl.textContent = `⏰ Prochaine partie gratuite dans : ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    timerEl.style.background = 'rgba(255,255,255,0.2)';
}

// Create boxes
function createBoxes() {
    const grid = document.getElementById('boxesGrid');
    grid.innerHTML = '';
    
    // Shuffle prizes
    gameState.boxes = shuffleArray([...PRIZES]);
    
    for (let i = 0; i < TOTAL_BOXES; i++) {
        const box = document.createElement('div');
        box.className = 'box';
        box.innerHTML = `<span class="box-number">${i + 1}</span>`;
        box.onclick = () => selectBox(i);
        grid.appendChild(box);
    }
}

// Shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Start game
function startGame() {
    if (!checkFreePlayTimer()) {
        showPaymentModal(REPLAY_PRICE, 'replay');
        return;
    }
    
    // Mark free play used
    localStorage.setItem('lastFreePlay', Date.now().toString());
    updateTimer();
    
    document.getElementById('actionButtons').innerHTML = '<p style="font-size: 1.2em; color: #667eea;">👉 Choisis ta boîte !</p>';
}

// Select player's box
function selectBox(index) {
    if (gameState.playerBoxIndex !== null) {
        openBox(index);
        return;
    }
    
    gameState.playerBoxIndex = index;
    document.getElementById('playerBox').textContent = `#${index + 1}`;
    
    const boxes = document.querySelectorAll('.box');
    boxes[index].classList.add('selected');
    
    document.getElementById('actionButtons').innerHTML = '<p style="font-size: 1.2em; color: #667eea;">👉 Ouvre les autres boîtes une par une !</p>';
}

// Open a box
function openBox(index) {
    if (gameState.gameEnded) return;
    if (index === gameState.playerBoxIndex) {
        alert('❌ C\'est ta boîte ! Choisis-en une autre.');
        return;
    }
    
    const boxes = document.querySelectorAll('.box');
    if (boxes[index].classList.contains('opened')) {
        return;
    }
    
    const prize = gameState.boxes[index];
    boxes[index].classList.add('opened');
    boxes[index].innerHTML = `<div class="box-content"><span>${prize.icon}</span><span style="font-size: 0.6em; margin-top: 5px;">${prize.label}</span></div>`;
    
    gameState.openedBoxes.push(index);
    document.getElementById('openedCount').textContent = `${gameState.openedBoxes.length}/${TOTAL_BOXES - 1}`;
    
    // Check if trap
    if (prize.type === 'trap') {
        showTrapScreen();
        return;
    }
    
    // Check for banker offer
    if (BANKER_OFFERS.includes(gameState.openedBoxes.length)) {
        showBankerOffer();
        return;
    }
    
    // Check if all boxes opened
    if (gameState.openedBoxes.length === TOTAL_BOXES - 1) {
        endGameWithPlayerBox();
    }
}

// Calculate banker offer based on remaining boxes
function calculateBankerOffer() {
    const remaining = [];
    for (let i = 0; i < TOTAL_BOXES; i++) {
        if (i !== gameState.playerBoxIndex && !gameState.openedBoxes.includes(i)) {
            remaining.push(gameState.boxes[i]);
        }
    }
    
    // Calculate average of remaining cash prizes
    const cashPrizes = remaining.filter(p => p.type === 'cash' && p.value > 0);
    if (cashPrizes.length === 0) return 1000;
    
    const avg = cashPrizes.reduce((sum, p) => sum + p.value, 0) / cashPrizes.length;
    
    // Banker offers 60-80% of average
    const percentage = 0.6 + (Math.random() * 0.2);
    return Math.round(avg * percentage);
}

// Show banker offer
function showBankerOffer() {
    const offer = calculateBankerOffer();
    gameState.currentOffer = offer;
    
    document.getElementById('offerAmount').textContent = `${offer.toLocaleString()} XPF`;
    document.getElementById('bankerOffer').classList.remove('hidden');
}

// Accept offer
function acceptOffer() {
    gameState.gameEnded = true;
    document.getElementById('bankerOffer').classList.add('hidden');
    
    showResult('🎉 Bravo !', `${gameState.currentOffer.toLocaleString()} XPF`, 'Tu as accepté l\'offre du banquier !');
}

// Refuse offer
function refuseOffer() {
    document.getElementById('bankerOffer').classList.add('hidden');
    
    // Continue game
    if (gameState.openedBoxes.length === TOTAL_BOXES - 1) {
        endGameWithPlayerBox();
    }
}

// End game with player's box
function endGameWithPlayerBox() {
    gameState.gameEnded = true;
    const prize = gameState.boxes[gameState.playerBoxIndex];
    
    // Reveal player's box
    const boxes = document.querySelectorAll('.box');
    boxes[gameState.playerBoxIndex].classList.add('opened');
    boxes[gameState.playerBoxIndex].innerHTML = `<div class="box-content"><span>${prize.icon}</span><span style="font-size: 0.6em; margin-top: 5px;">${prize.label}</span></div>`;
    
    setTimeout(() => {
        if (prize.type === 'trap') {
            showResult('💣 Dommage !', prize.label, 'Ta boîte contenait un piège !');
        } else {
            showResult('🎉 Félicitations !', `${prize.icon} ${prize.label}`, 'Tu as remporté le contenu de ta boîte !');
        }
    }, 1500);
}

// Show trap screen
function showTrapScreen() {
    document.getElementById('gameScreen').classList.remove('active');
    document.getElementById('trapScreen').classList.add('active');
}

// Buy rescue
function buyRescue() {
    showPaymentModal(RESCUE_PRICE, 'rescue');
}

// End game (abandon)
function endGame() {
    showResult('😢 Partie terminée', '0 XPF', 'Tu as abandonné la partie.');
}

// Show result screen
function showResult(title, prize, message) {
    document.getElementById('resultTitle').textContent = title;
    document.getElementById('resultPrize').textContent = prize;
    document.getElementById('resultMessage').textContent = message;
    
    document.getElementById('gameScreen').classList.remove('active');
    document.getElementById('trapScreen').classList.remove('active');
    document.getElementById('resultScreen').classList.add('active');
}

// Play again
function playAgain() {
    if (checkFreePlayTimer()) {
        resetGame();
    } else {
        showPaymentModal(REPLAY_PRICE, 'replay');
    }
}

// Wait for free play
function waitForFree() {
    alert('⏰ Reviens dans 24h pour ta partie gratuite !');
}

// Show payment modal
function showPaymentModal(amount, type) {
    document.getElementById('paymentAmount').textContent = `${amount} XPF`;
    document.getElementById('paymentModal').classList.add('active');
    document.getElementById('paymentModal').dataset.type = type;
}

// Close payment modal
function closePayment() {
    document.getElementById('paymentModal').classList.remove('active');
}

// Simulate payment
function simulatePayment() {
    const type = document.getElementById('paymentModal').dataset.type;
    
    // Simulate payment success
    setTimeout(() => {
        closePayment();
        alert('✅ Paiement simulé avec succès ! (MODE TEST)');
        
        if (type === 'rescue') {
            // Continue game after rescue
            document.getElementById('trapScreen').classList.remove('active');
            document.getElementById('gameScreen').classList.add('active');
        } else if (type === 'replay') {
            resetGame();
        }
    }, 1000);
}

// Reset game
function resetGame() {
    gameState = {
        boxes: [],
        playerBoxIndex: null,
        openedBoxes: [],
        currentOffer: 0,
        gameEnded: false
    };
    
    document.getElementById('gameScreen').classList.add('active');
    document.getElementById('resultScreen').classList.remove('active');
    document.getElementById('trapScreen').classList.remove('active');
    document.getElementById('bankerOffer').classList.add('hidden');
    
    document.getElementById('playerBox').textContent = '-';
    document.getElementById('openedCount').textContent = '0/19';
    document.getElementById('actionButtons').innerHTML = '<button class="btn btn-primary" onclick="startGame()">🎮 Commencer</button>';
    
    createBoxes();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initGame);
