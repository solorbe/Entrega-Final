
// const socket = io();

// socket.on('serviceCreated', (service) => {
//   console.log('✅ serviceCreated recibido:', service);
//   alert('✅ Servicio recibido: ' + service.name);
// });

// socket.on('connect_error', (err) => {
//   console.error('❌ Error de conexión socket:', err);
// });


const socket = io();
const servicesContainer = document.getElementById('services-container');
const mensaje = document.getElementById('mensaje');
socket.on('serviceCreated', (service) => {
  console.log('Nuevo servicio recibido:', service);
  // 1. Mostrar mensaje de notificación
  if (mensaje) {
    mensaje.textContent = `¡Se creó un nuevo servicio: ${service.name}!`;
  }
  // 2. Insertar la nueva tarjeta en el DOM sin recargar
  if (servicesContainer) {
    const article = document.createElement('article');
    article.id = `service-${service._id}`;
    article.innerHTML = `
      <h2>Servicio: ${service.name}</h2>
      <p>Descripción: ${service.description || ''}</p>
      <p>Duración: ${service.duration} minutos</p>
      <p>Precio: $${service.price}</p>
      <p>Categoría: ${service.category || ''}</p>
    `;
    servicesContainer.appendChild(article);
  }
});
// Escuchar servicio eliminado y quitarlo del DOM
// socket.on('serviceDeleted', (serviceId) => {
//   const item = document.getElementById(`service-${serviceId}`);
//   if (item) item.remove();
// });
