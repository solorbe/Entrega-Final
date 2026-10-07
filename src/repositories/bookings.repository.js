
import { BookingMongoDao } from '../dao/mongo/bookings.mongo.dao.js';


export class BookingRepository {
  constructor(dao = new BookingMongoDao()) {
    this.dao = dao;
  }

  async getAll() {
    return this.dao.getAll();
  }

  async getById(id) {
    return this.dao.getById(id);
  }

  async create(data) {
    return this.dao.create(data);
  }

  async update(id, data) {
    return this.dao.update(id, data);
  }

  async countByStatus() {
    return this.dao.countByStatus();
  }
}
