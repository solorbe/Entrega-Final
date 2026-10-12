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
  // if (servicesContainer) {
  //   const article = document.createElement('article');
  //   article.id = `service-${service._id}`;
  //   article.innerHTML = `
  //     <h2>Servicio: ${service.name}</h2>
  //     <p>Descripción: ${service.description || ''}</p>
  //     <p>Duración: ${service.duration} minutos</p>
  //     <p>Precio: $${service.price}</p>
  //     <p>Categoría: ${service.category || ''}</p>
  //   `;
  //   servicesContainer.appendChild(article);
  // }

  if (servicesContainer) {
    // Creamos la columna de Bootstrap
    const col = document.createElement('div');
    col.className = 'col';

    // Creamos el article
    const article = document.createElement('article');
    article.id = `service-${service._id}`;
    article.className = 'h-100';

    // Generamos la misma card que en Handlebars
    article.innerHTML = `
      <div class="card h-100">

        <div class="card-header">
          Servicio: ${service.name}
        </div>

        <ul class="list-group list-group-flush">

          <li class="list-group-item">
            Descripción: ${service.description || ''}
          </li>

          <li class="list-group-item">
            Duración: ${service.duration} minutos
          </li>

          <li class="list-group-item">
            Precio: $${service.price}
          </li>

          <li class="list-group-item">
            Categoría: ${service.category || ''}
          </li>

        </ul>

      </div>
    `;

    // Insertamos el article dentro de la columna
    col.appendChild(article);

    // Agregamos la columna al contenedor
    servicesContainer.appendChild(col);
  }
});

