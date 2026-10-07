import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {BookingMongoDao} from "../src/dao/mongo/bookings.mongo.dao.js";
// Importamos el modelo Service para que Mongoose lo registre antes de hacer populate:
import "../src/dao/models/service.model.js"; 

dotenv.config();

describe("Pruebas de BookingMongoDao", () => {
  const bookingDao = new BookingMongoDao();
  let bookingId = null;

  before(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  after(async () => {
    if (bookingId && typeof bookingDao.delete === "function") {
      await bookingDao.delete(bookingId);
    }
    await mongoose.disconnect();
  });

  it("create: debe guardar una nueva reserva y devolver su _id", async () => {
    const payload = {
      clientName: "Sol Tester",
      clientEmail: "sol@example.com",
      date: new Date(),
      time: "14:30",
      status: "pending"
    };

    const resultado = await bookingDao.create(payload);

    assert.ok(resultado._id, "Debe tener un _id asignado por Mongo");
    assert.equal(resultado.clientName, "Sol Tester");
    assert.equal(resultado.clientEmail, "sol@example.com");
    assert.equal(resultado.status, "pending");
    assert.ok(Array.isArray(resultado.services));

    bookingId = resultado._id;
  });

  it("getById: debe retornar la reserva correspondiente al ID", async () => {
    const reserva = await bookingDao.getById(bookingId);

    assert.ok(reserva, "La reserva debe existir");
    assert.equal(String(reserva._id), String(bookingId));
    assert.equal(reserva.clientName, "Sol Tester");
  });

  it("getAll: debe devolver una lista con las reservas", async () => {
    const reservas = await bookingDao.getAll();

    assert.ok(Array.isArray(reservas));
    assert.ok(reservas.length > 0);
  });

  it("update: debe modificar una propiedad de la reserva", async () => {
    await bookingDao.update(bookingId, { status: "confirmed" });

    const reservaEnDb = await bookingDao.getById(bookingId);
    assert.ok(reservaEnDb, "La reserva actualizada debe existir");
    assert.equal(reservaEnDb.status, "confirmed");
  });

  it("countByStatus: debe ejecutar la consulta de conteo por estado", async () => {
    const resultado = await bookingDao.countByStatus("confirmed");
    assert.ok(resultado !== null && resultado !== undefined);
  });
});
