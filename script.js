// Script para el contador regresivo
function updateCountdown() {
    const countdownEl = document.querySelector('.countdown');
    let parts = countdownEl.textContent.split(':');
    let hours = parseInt(parts[0].split(' ')[3]);
    let minutes = parseInt(parts[1]);
    let seconds = parseInt(parts[2]);
    
    seconds--;
    
    if (seconds < 0) {
        seconds = 59;
        minutes--;
    }
    
    if (minutes < 0) {
        minutes = 59;
        hours--;
    }
    
    if (hours < 0) {
        hours = 0;
        minutes = 0;
        seconds = 0;
    }
    
    countdownEl.textContent = `Oferta válida por: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    setTimeout(updateCountdown, 1000);
}

// Iniciar el contador cuando cargue la página
window.addEventListener('load', updateCountdown);