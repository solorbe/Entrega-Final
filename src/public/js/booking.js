const socket = io();
const bookingsContainer = document.getElementById('bookings-container');

// Escuchar nueva reserva creada y agregarla al DOM
// socket.on('bookingCreated', (booking) => {
//   //console.log('Objeto booking recibido:', booking);
//   if (!bookingsContainer) return;
//   const servicesListHtml = (booking.services || [])
//     .map(s => `<p>Servicio: ${s.service}</p><p>Cantidad: ${s.quantity}</p>`)
//     .join('');
//   const article = document.createElement('article');
//   article.id = `booking-${booking._id}`;
//   article.innerHTML = `
//     <h2>Reserva: ${booking.clientName}</h2>
//     <p>Email: ${booking.clientEmail}</p>
//     <p>Fecha: ${booking.date}</p>
//     <p>Hora: ${booking.time}</p>
//     <p class="booking-status">Estado: ${booking.status}</p>
//     ${servicesListHtml}
//   `;
//   bookingsContainer.appendChild(article);
// });

function formatDate(date) {
  if (!date) return '';

  return new Date(date).toLocaleDateString('es-AR');
}
socket.on('bookingCreated', (booking) => {
  if (!bookingsContainer) return;
  // Generamos los servicios
  const servicesListHtml = (booking.services || [])
    .map(
      s => `
      <li class="list-group-item">${s.service} - Cantidad: ${s.quantity}
      </li>
    `)
    .join('');

  // Creamos el article
  const article = document.createElement('article');

  article.id = `booking-${booking._id}`;

  // Misma estructura que Handlebars
  article.innerHTML = `
    <div class="card" style="width: 18rem;">

      <div class="card-header">
        Reserva: ${booking.clientName}
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          Email: ${booking.clientEmail}
        </li>
        <li class="list-group-item">
          Fecha: ${formatDate(booking.date)}
        </li>
        <li class="list-group-item">
          Hora: ${booking.time}
        </li>
        <li class="list-group-item">
          Estado: ${booking.status}
        </li>
        <li class="list-group-item">
          Servicios:
          <ul>
            ${servicesListHtml}
          </ul>
        </li>
      </ul>
    </div>
  `;

  bookingsContainer.appendChild(article);
});