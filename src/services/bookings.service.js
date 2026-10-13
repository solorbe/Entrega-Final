import { BookingRepository } from '../repositories/bookings.repository.js';
import { ServiceRepository } from '../repositories/services.repository.js';
import { AppError } from '../utils/AppError.js';


class BookingsService {
  constructor(
    bookingRepository = new BookingRepository(),
    serviceRepository = new ServiceRepository()
  ) {
    this.bookingRepository = bookingRepository;
    this.serviceRepository = serviceRepository;
  }
  
  
  async getAll() {
    return await this.bookingRepository.getAll();
  }

  async getBookingById(id) {
    const booking = await this.bookingRepository.getById(id);
    if (!booking) {
      throw new AppError('Reserva no encontrada', 404);
    }
    return booking;
  }

  async createBooking(data) {
    const newBooking = {
      clientName: data.clientName ?? 'Anónimo',
      clientEmail: data.clientEmail,
      date: data.date,
      time: data.time,
      // La reserva arranca SIN servicios; se agregan después con // addServiceToBooking.
      services: [],
    };

    return this.bookingRepository.create(newBooking);
  }

  // Agrega el servicio :sid a la reserva :bid.
  async addServiceToBooking(bid, sid) {
    // 1) Regla de negocio: no se puede agregar un servicio que no existe. 
    const servicio = await this.serviceRepository.getById(sid);
    if (!servicio) {
      throw new AppError('Servicio no encontrado', 404);
    }
    // 2) La reserva tiene que existir.
    const booking = await this.bookingRepository.getById(bid);
    if (!booking) {
      throw new AppError('Reserva no encontrada', 404);
    }
    // 3) Regla de "quantity".
    //    En booking.services NO guardamos el objeto completo del servicio, solo su REFERENCIA (el ObjectId) + una cantidad.
    //    Si el servicio YA está en la reserva, incrementamos su quantity en vez de hacer un segundo push del mismo id: así la
    //    lista tiene una entrada por servicio + un contador, más fácil de leer y de mostrar que varias entradas repetidas.
    //    s.service ahora es un ObjectId de Mongo (no un number), así que comparamos convirtiendo ambos lados a string.

    const item = booking.services.find((s) => {
      return String(s.service._id) === String(sid);
    });
    if (item) {
      item.quantity += 1;
    } else {
      // Mongoose castea automáticamente el string sid a ObjectId al guardar, gracias al tipo declarado en el schema.
      booking.services.push({ service: sid, quantity: 1 });
    }
    // 4) Persistimos el cambio: le pedimos al repository que guarde la nueva lista de servicios de esta reserva. 
    return this.bookingRepository.update(bid, { services: booking.services });
  }
  async updateBooking(bid, data) {
    return this.bookingRepository.update(bid, data);
  }

  async getStatusReport() {
    return this.bookingRepository.countByStatus();
  }
}

// Instancia única compartida por todos los que importen este módulo.
export const bookingsService = new BookingsService()  // exportamos la instancia
