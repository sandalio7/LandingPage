// Función para manejar el formulario de compra con Google Apps Script
document.addEventListener('DOMContentLoaded', function() {
    const comprarBtn = document.getElementById('comprar-btn');
    
    if (comprarBtn) {
        comprarBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir el comportamiento predeterminado del botón
            
            // Reemplaza esta URL con la URL de tu Web App de Google Apps Script después de publicarla
            const googleAppScriptUrl = 'https://script.google.com/macros/s/AKfycbxrEBPKjmA8o8XMRAObSlITU5MJIzpfDnkpPlGBng50naJnvRMEher-cgKmA-lJo4y93A/exec';
            
            // URL de checkout a la que redirigir después
            const checkoutURL = 'checkout.html';
            
            // Recopilar datos para enviar
            const datos = {
                curso: 'Tech Career Blueprint',
                fecha: new Date().toLocaleString(),
                url_origen: window.location.href,
                navegador: navigator.userAgent,
            };
            
            // Mostrar un indicador de carga
            comprarBtn.disabled = true;
            comprarBtn.textContent = 'Procesando...';
            
            // Enviar los datos a Google Apps Script
            fetch(googleAppScriptUrl, {
                method: 'POST',
                body: JSON.stringify(datos),
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                mode: 'no-cors' // Importante para evitar problemas CORS
            })
            .then(function() {
                console.log('Datos enviados correctamente');
                // Redirigir a la página de checkout
                window.location.href = checkoutURL;
            })
            .catch(function(error) {
                console.error('Error al enviar los datos:', error);
                // Aún así, redirigir a la página de checkout
                window.location.href = checkoutURL;
            });
        });
    }
});

// Script para el contador regresivo (si lo necesitas)
function updateCountdown() {
    const countdownEl = document.querySelector('.countdown');
    
    // Si no hay elemento countdown en la página, salir de la función
    if (!countdownEl) return;
    
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

// Iniciar el contador si existe en la página
document.addEventListener('DOMContentLoaded', function() {
    const countdownEl = document.querySelector('.countdown');
    if (countdownEl) {
        updateCountdown();
    }
});     