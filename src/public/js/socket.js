
// const socket = io();

// socket.on('serviceCreated', (service) => {
//     console.log('Nuevo servicio recibido:', service);

//     const mensaje = document.getElementById('mensaje');

//     mensaje.textContent = `¡Se creó un nuevo servicio: ${service.name}!`;
// });

// socket.on('bookingCreated', (booking) => {
//     console.log('Nueva reserva recibida:', booking);

//     const mensaje = document.getElementById('mensaje');

//     mensaje.textContent = `¡Se creó una nueva reserva: ${booking.clientName}!`;
// });

const socket = io();

const log = document.getElementById('log');

function agregarLog(mensaje) {
    const ahora = new Date();
    const hora = ahora.toLocaleTimeString();
    const elemento = document.createElement('p');
    elemento.textContent = `${hora} - ${mensaje}`;
    log.appendChild(elemento);
}

socket.on('serviceCreated', (service) => {

    console.log('Nuevo servicio recibido:', service);

    agregarLog(
        `Se creó un nuevo servicio: ${service.name}`
    );
});

socket.on('bookingCreated', (booking) => {

    console.log('Nueva reserva recibida:', booking);

    agregarLog(
        `Se creó una nueva reserva para: ${booking.clientName}`
    );
});