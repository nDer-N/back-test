import express from "express";
import Reserva from "../models/reservacion.js";

const routerReserva = express.Router();

////////////////////////////////////////////////////////////



routerReserva.post('/', async (req, res, next) => {
  console.log(req.body);
  if (!req.body.available || !req.body.description || !req.body.quantity || !req.body.productId || !req.body.dateStart || !req.body.dateEnd || !req.body.user) {
    res.status(400);
    next(new Error("Invalid reservation"));
    return;
  }
  const {description, quantity, productId, user, dateStart, dateEnd, status, available } = req.body;

  try {
    if (available >= quantity) {
      const new_reserva = new Reserva({
        description, quantity, status, dateStart, dateEnd, productId, user
      });

      await new_reserva.save();

      res.status(201).json(new_reserva);
    } else {
      res.status(400).json("Cantidad no disponible para esta fecha");
    }

  } catch (err) {
    console.error(err);
    next(err);
  }

});

routerReserva.get("/proc", async (req, res, next) => {

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

routerReserva.get("/active", async (req, res, next) => {

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


routerReserva.get("/:user", async (req, res, next) => {
  const { user } = req.params;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const found = await Reserva.find({
      dateEnd: { $gte: today },
      user: user
    });

    return res.status(200).json(found);

  } catch (err) {
    console.error(err);
    next(err);
  }
})

routerReserva.get("/:productID/:dateStart/:dateEnd", async (req, res, next) => {
  try {
    const { productID, dateStart, dateEnd } = req.params;

    const start = new Date(dateStart);
    const end = new Date(dateEnd);

    const found = await Reserva.find({
      productId: productID,
      dateStart: { $lt: end },  // reserva empieza antes de que termine tu rango
      dateEnd: { $gt: start } , // reserva termina después de que empieza tu rango
      status: {$ne: "rechazado"}
    });

    res.status(200).json(found);

  } catch (err) {
    console.error(err);
    next(err);
  }
});


routerReserva.get("/", async (req, res, next) => {

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


routerReserva.post('/:id/status', async (req, res, next) => {
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


export default routerReserva;
