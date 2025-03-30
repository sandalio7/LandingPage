// Función para manejar el formulario de compra con Google Apps Script
document.addEventListener('DOMContentLoaded', function() {
    const comprarBtn = document.getElementById('comprar-btn');
    
    if (comprarBtn) {
        comprarBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevenir el comportamiento predeterminado del botón
            
            // Reemplaza esta URL con la URL de tu Web App de Google Apps Script después de publicarla
            const googleAppScriptUrl = 'https://script.google.com/macros/s/AKfycbxrEBPKjmA8o8XMRAObSlITU5MJIzpfDnkpPlGBng50naJnvRMEher-cgKmA-lJo4y93A/exec';
            
            // URL de checkout actualizada con la URL completa
            const checkoutURL = 'https://digitalcareer.netlify.app/checkout.html';
            
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
                
                // Registrar el evento de clic en el botón para Google Ads (añadido)
                if (typeof dataLayer !== 'undefined') {
                    dataLayer.push({
                        'event': 'purchase_button_click',
                        'eventCategory': 'Conversion',
                        'eventAction': 'Click',
                        'eventLabel': 'Comprar Ahora'
                    });
                    console.log('Evento de clic registrado en dataLayer');
                }
                
                // Redirigir a la página de checkout después de un breve retraso
                setTimeout(function() {
                    window.location.href = checkoutURL;
                }, 300); // 300ms de retraso para asegurar que GTM registre el evento
            })
            .catch(function(error) {
                console.error('Error al enviar los datos:', error);
                // Aún así, registrar el evento y redirigir a la página de checkout
                if (typeof dataLayer !== 'undefined') {
                    dataLayer.push({
                        'event': 'purchase_button_click',
                        'eventCategory': 'Conversion',
                        'eventAction': 'Click',
                        'eventLabel': 'Comprar Ahora'
                    });
                }
                setTimeout(function() {
                    window.location.href = checkoutURL;
                }, 300);
            });
        });
    }
});

// Función para el temporizador
function startCountdown() {
    const countdownElement = document.getElementById('countdown-timer');
    
    if (!countdownElement) return;
    
    // Comprobar si hay una fecha guardada en localStorage
    let endTime = localStorage.getItem('countdownEndTime');
    let now = new Date().getTime();
    
    // Si no hay fecha guardada o ya ha pasado, creamos una nueva (24 horas desde ahora)
    if (!endTime || now > parseInt(endTime)) {
        endTime = now + (3 * 60 * 60 * 1000); // 24 horas en milisegundos
        localStorage.setItem('countdownEndTime', endTime);
    }
    
    // Actualizar el contador cada segundo
    const countdownInterval = setInterval(function() {
        // Obtener la hora actual
        now = new Date().getTime();
        
        // Calcular la diferencia entre la hora actual y la hora final
        const distance = parseInt(endTime) - now;
        
        // Si el tiempo ha terminado
        if (distance < 0) {
            clearInterval(countdownInterval);
            // Reiniciar el contador por 24 horas más
            endTime = now + (3 * 60 * 60 * 1000);
            localStorage.setItem('countdownEndTime', endTime);
            startCountdown(); // Reiniciar la función
            return;
        }
        
        // Calcular horas, minutos y segundos
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Actualizar el texto del contador
        countdownElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Iniciar el contador cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Llamar a la función del contador
    startCountdown();
    
    // El resto de tu código existente para DOMContentLoaded...
});

