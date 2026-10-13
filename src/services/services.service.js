
import { ServiceRepository } from "../repositories/services.repository.js";

class ServicesService {
  // El service recibe el repository por constructor (con un valor por defecto). 
  constructor(repository = new ServiceRepository()) {
    this.repository = repository;
  }

  async getAll() {
    return await this.repository.getAll();
  }

  // Devuelve la lista de servicios. 
  // Regla de negocio: si llega un filtro por categoría, se aplica el controller solo pasa lo que vino en la query string, no filtra nada).
  async getServices(filtro = {}) {
    const { category, available } = filtro;
    const servicios = await this.repository.getAll();
    if (category) {
      return servicios.filter((servicio) => servicio.category === category);
    }
    if (available === true || available === false) {
      return servicios.filter((servicio) => servicio.available === available);
    }
    return servicios;
  }
  
  // Versión paginada, usada por GET /api/services.
  // Recibe la query string tal cual (req.query) y la traduce a un  FILTRO y OPCIONES de Mongo. Todo lo que llega en req.query es string, por eso convertimos: page/limit a Number y available a boolean (el string 'false' es "truthy" en JS, así que no alcanza con un Boolean(available)).
  // getServices() queda intacto: lo usan las vistas y los sockets, que muestran la lista completa.
  async getServicesPaginated(query = {}) {
    const { category, available, page = 1, limit = 10, sort } = query;

    // Filtro DINÁMICO: solo agregamos una condición si el parámetro vino en la URL. Si no vino ninguno, el filtro queda {} y trae todo.
    const filter = {};
    if (category) {
      filter.category = category;
    }
    if (available !== undefined) {
      filter.available = available === 'true';
    }

    const options = { page: Number(page), limit: Number(limit) };

    // Ordenamiento por precio: 1 = ascendente, -1 = descendente. Si sort
    // no vino (o vino con otro valor), no ordenamos y Mongo devuelve en
    // su orden natural.
    if (sort === 'asc') {
      options.sort = { price: 1 };
    } else if (sort === 'desc') {
      options.sort = { price: -1 };
    }
    return this.repository.getPaginated(filter, options);
  }
  
  
  // Devuelve el servicio con ese id, o null si no existe. 
  async getServiceById(id) {
    return this.repository.getById(id);
  }

  // Crea un servicio. 
  // La validación de FORMATO del request (campos obligatorios) se queda en el controller porque es una regla del protocolo HTTP; acá asumimos que los datos ya vienen completos y solo orquestamos la persistencia.
  async createService(data) {
    return this.repository.create(data);
  }

  // Actualiza un servicio existente. 
  // Devuelve el servicio ya actualizado, o null si no existía.
  async updateService(id, data) {
    return this.repository.update(id, data);
  }

  // Elimina un servicio. 
  // Devuelve el servicio eliminado, o null si no existía.
  async deleteService(id) {
    return this.repository.delete(id);
  }
}

// Exportamos una única instancia de ServicesService, para que todos los controllers que lo importen compartan la misma instancia y el mismo repository.
export const servicesService = new ServicesService();