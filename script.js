// Application state
let participants = [];
let currentWinner = null;

// DOM elements
const emailForm = document.getElementById('emailForm');
const emailInput = document.getElementById('emailInput');
const message = document.getElementById('message');
const participantsList = document.getElementById('participantsList');
const participantCount = document.getElementById('participantCount');
const emptyState = document.getElementById('emptyState');
const raffleButton = document.getElementById('raffleButton');
const winnerSection = document.getElementById('winnerSection');
const winnerEmail = document.getElementById('winnerEmail');
const newRaffleButton = document.getElementById('newRaffleButton');

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    updateUI();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    emailForm.addEventListener('submit', handleEmailSubmit);
    raffleButton.addEventListener('click', performRaffle);
    newRaffleButton.addEventListener('click', resetRaffle);
    emailInput.addEventListener('input', clearMessage);
}

// Handle email form submission
function handleEmailSubmit(e) {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    if (!validateEmail(email)) {
        showMessage('Por favor, ingresa un correo electrónico válido.', 'error');
        return;
    }
    
    if (isDuplicate(email)) {
        showMessage('Este correo electrónico ya está en la lista.', 'error');
        return;
    }
    
    addParticipant(email);
    emailInput.value = '';
    emailInput.focus();
    showMessage('Correo agregado exitosamente.', 'success');
}

// Validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Check if email is duplicate
function isDuplicate(email) {
    return participants.some(p => p.email.toLowerCase() === email.toLowerCase());
}

// Add participant to list
function addParticipant(email) {
    const participant = {
        id: Date.now().toString(),
        email: email,
        addedAt: new Date().toISOString()
    };
    
    participants.push(participant);
    saveToLocalStorage();
    updateUI();
}

// Remove participant from list
function removeParticipant(id) {
    participants = participants.filter(p => p.id !== id);
    
    // If the removed participant was the winner, reset the raffle
    if (currentWinner && currentWinner.id === id) {
        resetRaffle();
    }
    
    saveToLocalStorage();
    updateUI();
    showMessage('Participante eliminado.', 'success');
}

// Perform raffle
function performRaffle() {
    if (participants.length < 2) {
        showMessage('Se necesitan al menos 2 participantes para el sorteo.', 'error');
        return;
    }
    
    // Clear previous winner
    document.querySelectorAll('.participant-item').forEach(item => {
        item.classList.remove('winner');
    });
    
    // Animate button during selection
    raffleButton.disabled = true;
    raffleButton.textContent = '🎲 Sorteando...';
    
    // Simulate selection animation
    let iterations = 0;
    const maxIterations = 20;
    const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * participants.length);
        highlightParticipant(participants[randomIndex].id);
        
        iterations++;
        if (iterations >= maxIterations) {
            clearInterval(interval);
            
            // Select final winner
            const winnerIndex = Math.floor(Math.random() * participants.length);
            const winner = participants[winnerIndex];
            currentWinner = winner;
            
            // Show winner
            highlightWinner(winner.id);
            showWinner(winner.email);
            
            raffleButton.textContent = '🎲 Elegir ganador';
            raffleButton.disabled = false;
        }
    }, 100);
}

// Highlight participant during animation
function highlightParticipant(id) {
    document.querySelectorAll('.participant-item').forEach(item => {
        item.classList.remove('winner');
    });
    
    const element = document.querySelector(`[data-participant-id="${id}"]`);
    if (element) {
        element.classList.add('winner');
    }
}

// Highlight final winner
function highlightWinner(id) {
    document.querySelectorAll('.participant-item').forEach(item => {
        item.classList.remove('winner');
    });
    
    const element = document.querySelector(`[data-participant-id="${id}"]`);
    if (element) {
        element.classList.add('winner');
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Show winner section
function showWinner(email) {
    winnerEmail.textContent = email;
    winnerSection.classList.remove('hidden');
    winnerSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Reset raffle
function resetRaffle() {
    currentWinner = null;
    winnerSection.classList.add('hidden');
    
    document.querySelectorAll('.participant-item').forEach(item => {
        item.classList.remove('winner');
    });
    
    updateRaffleButton();
}

// Update UI
function updateUI() {
    updateParticipantsList();
    updateParticipantCount();
    updateRaffleButton();
    updateEmptyState();
}

// Update participants list
function updateParticipantsList() {
    participantsList.innerHTML = '';
    
    participants.forEach(participant => {
        const li = document.createElement('li');
        li.className = 'participant-item';
        li.setAttribute('data-participant-id', participant.id);
        
        li.innerHTML = `
            <span class="participant-email">${escapeHtml(participant.email)}</span>
            <button class="btn-delete" onclick="removeParticipant('${participant.id}')">
                Eliminar
            </button>
        `;
        
        participantsList.appendChild(li);
    });
}

// Update participant count
function updateParticipantCount() {
    participantCount.textContent = participants.length;
}

// Update raffle button state
function updateRaffleButton() {
    raffleButton.disabled = participants.length < 2;
}

// Update empty state
function updateEmptyState() {
    emptyState.style.display = participants.length === 0 ? 'block' : 'none';
    participantsList.style.display = participants.length === 0 ? 'none' : 'grid';
}

// Show message
function showMessage(text, type) {
    message.textContent = text;
    message.className = `message ${type}`;
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        clearMessage();
    }, 3000);
}

// Clear message
function clearMessage() {
    message.textContent = '';
    message.className = 'message';
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Local storage functions
function saveToLocalStorage() {
    try {
        localStorage.setItem('raffleParticipants', JSON.stringify(participants));
    } catch (error) {
        console.warn('No se pudo guardar en el almacenamiento local:', error);
    }
}

function loadFromLocalStorage() {
    try {
        const stored = localStorage.getItem('raffleParticipants');
        if (stored) {
            participants = JSON.parse(stored);
        }
    } catch (error) {
        console.warn('No se pudo cargar desde el almacenamiento local:', error);
        participants = [];
    }
}

// Make removeParticipant globally accessible
window.removeParticipant = removeParticipant;
