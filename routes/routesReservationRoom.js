import express from "express";
import Reserva from "../models/reservacionRoom.js";

const routerReservaRooms = express.Router();

////////////////////////////////////////////////////////////



routerReservaRooms.post('/', async (req, res, next) => {
  console.log(req.body);

  if (!req.body.available || !req.body.description || !req.body.roomId || !req.body.dateStart || !req.body.dateEnd || !req.body.user) {
  return res.status(400).json("Datos incompletos para reservar el salón");
}
  const {description, roomId, dateStart, dateEnd, user, status, available } = req.body;

  try {
    if (available > 0) {
      const new_reserva = new Reserva({
        description, roomId, dateStart, dateEnd, user, status
      });

      await new_reserva.save();

      res.status(201).json(new_reserva);
    } else {
      res.status(400).json("Salón reservado en estas fechas");
    }

  } catch (err) {
    console.error(err);
    next(err);
  }

});

routerReservaRooms.get("/proc", async (req, res, next) => {

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const found = await Reserva.find({
      status:"proceso",
      dateEnd: { $gte: today }
    });

    res.status(200).json(found);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

routerReservaRooms.get("/active", async (req, res, next) => {

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const found = await Reserva.find({
      status:"accepted",
      dateEnd: { $gte: today },
      dateStart: { $lte: today }
    });

    res.status(200).json(found);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

routerReservaRooms.get("/:user", async (req, res, next) => {
  const { user } = req.params;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const found = await Reserva.find({
      status: { $ne: "rechazado" },
      dateEnd: { $gte: today },
      user: user
    });

    return res.status(200).json(found);

  } catch (err) {
    console.error(err);
    next(err);
  }
});

routerReservaRooms.get("/:roomID/:dateStart/:dateEnd", async (req, res, next) => {
  try {
    const { roomID, dateStart, dateEnd } = req.params;

    const start = new Date(dateStart);
    const end = new Date(dateEnd);

    const found = await Reserva.find({
      roomId: roomID,
      dateStart: { $lt: end },  // reserva empieza antes de que termine tu rango
      dateEnd: { $gt: start }   // reserva termina después de que empieza tu rango
    });

    res.status(200).json(found);

  } catch (err) {
    console.error(err);
    next(err);
  }
});

routerReservaRooms.get("/", async (req, res, next) => {

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const found = await Reserva.find({
      status: { $ne: "rechazado" },
      dateEnd: { $gte: today }
    });

    res.status(200).json(found);
  } catch (err) {
    console.error(err);
    next(err);
  }
});


routerReservaRooms.post('/:id/status', async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const reserva = await Reserva.findById(id);

    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    reserva.status = status; // actualizar status
    await reserva.save();

    res.status(200).json(reserva);
  } catch (err) {
    console.error(err);
    next(err);
  }
});


export default routerReservaRooms;
