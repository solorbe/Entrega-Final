const socket = io();

const log = document.getElementById('log');

function agregarLog(mensaje) {
    const ahora = new Date();
    const hora = ahora.toLocaleTimeString();
    const elemento = document.createElement('p');
    elemento.textContent = `${hora} - ${mensaje}`;
    log.appendChild(elemento);
}

socket.on('systemLog', (data) => {

    agregarLog(data.message);

});
// socket.on('serviceCreated', (service) => {
//     console.log('Nuevo servicio recibido:', service);
//     agregarLog(
//         `Se creó un nuevo servicio: ${service.name}`
//     );
// });

// socket.on('bookingCreated', (booking) => {
//     console.log('Nueva reserva recibida:', booking);
//     agregarLog(
//         `Se creó una nueva reserva para: ${booking.clientName}`
//     );
// });