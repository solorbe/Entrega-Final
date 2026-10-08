
const socket = io();

socket.on('serviceCreated', (service) => {
    console.log('Nuevo servicio recibido:', service);

    const mensaje = document.getElementById('mensaje');

    mensaje.textContent = `¡Se creó un nuevo servicio: ${service.name}!`;
});

// Escucho los logs del servidor y los muestro en el div log
socket.on('log', data => {
    let logs = '';
    data.logs.forEach(log => {
        logs += `${log.socketid} dice: ${log.message}<br/>`
    })
    log.innerHTML = logs;
});
