document.addEventListener('DOMContentLoaded', function() {
    const notifyForm = document.getElementById('notify-form');
    const confirmationMessage = document.getElementById('confirmation-message');
    
    if (notifyForm) {
        notifyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('email');
            const email = emailInput.value.trim();
            
            if (email) {
                // Aquí puedes agregar código para enviar el email a tu base de datos o sistema
                // Por ejemplo, usando Google Apps Script como en la página principal
                
                // URL de tu script de Google Apps Script (ajusta según sea necesario)
                const googleAppScriptUrl = 'https://script.google.com/macros/s/AKfycbxrEBPKjmA8o8XMRAObSlITU5MJIzpfDnkpPlGBng50naJnvRMEher-cgKmA-lJo4y93A/exec';
                
                // Datos a enviar
                const datos = {
                    tipo: 'notificacion_interes',
                    email: email,
                    fecha: new Date().toLocaleString(),
                    url_origen: window.location.href,
                    navegador: navigator.userAgent,
                };
                
                // Mostrar inmediatamente el mensaje de confirmación para mejor experiencia de usuario
                notifyForm.style.display = 'none';
                confirmationMessage.classList.remove('hidden');
                
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
                    console.log('Datos de email enviados correctamente');
                })
                .catch(function(error) {
                    console.error('Error al enviar los datos:', error);
                });
            }
        });
    }
});