import express from "express";
import Reserva from "../models/reservacionRoom.js";

const routerReservaRooms = express.Router();

////////////////////////////////////////////////////////////



routerReservaRooms.post('/', async (req, res, next) => {
  console.log(req.body);

  if (!req.body.availability || !req.body.name || !req.body.description || !req.body.roomId || !req.body.day || !req.body.month || !req.body.year || !req.body.date || !req.body.user) {
    next(new Error("Invalid reservation"));
    return;
  }
  const { name, description, roomId, dateStart, dateEnd, user, status, availability } = req.body;

  try {
    if (availability > 0) {
      const new_reserva = new Reserva({
        name, description, roomId, dateStart, dateEnd, user, status
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

routerReservaRooms.get("/:user", async (req, res, next) => {
  const { user } = req.params;

  try {
    const found = await Reserva.find(user);


    res.status(200).json(found);

  } catch (err) {
    console.error(err);
    next(err);
  }
  console.log(`id: ${id}`);
  next(new Error("Method not implemented"))
})

routerReservaRooms.get("/:roomID/:date", async (req, res, next) => {
  const { date, roomID } = req.params;

  try {
    const targetDate = new Date(date);

    const found = await Reserva.find({
      dateStart: { $lte: targetDate },
      dateEnd: { $gte: targetDate },
      roomId: roomID
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
      endDate: { $gte: today }
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
