const socket = io();
const bookingsContainer = document.getElementById('bookings-container');

// Escuchar nueva reserva creada y agregarla al DOM
socket.on('BookingCreated', (booking) => {
  console.log('Objeto booking recibido:', booking);
  if (!bookingsContainer) return;

  const servicesListHtml = (booking.services || [])
    .map(s => `<p>Servicio: ${s.service}</p><p>Cantidad: ${s.quantity}</p>`)
    .join('');

  const article = document.createElement('article');
  article.id = `booking-${booking._id}`;
  article.innerHTML = `
    <h2>Reserva de ${booking.clientName}</h2>
    <p>Email: ${booking.clientEmail}</p>
    <p>Fecha: ${booking.date}</p>
    <p>Hora: ${booking.time}</p>
    <p class="booking-status">Estado: ${booking.status}</p>
    ${servicesListHtml}
  `;
  bookingsContainer.appendChild(article);
});

