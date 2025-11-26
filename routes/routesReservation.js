import express from "express";
import Reserva from "../models/reservacion.js";

const routerReserva = express.Router();

////////////////////////////////////////////////////////////



routerReserva.post('/', async (req, res, next) =>{
  console.log(req.body);
  if(!req.body.available || !req.body.name || !req.body.description || !req.body.quantity || !req.body.productId || !req.body.day || !req.body.month || !req.body.year || !req.body.date || !req.body.user){
    next(new Error("Invalid reservation"));
    return;
  }
  const {name, description, quantity, productId, user, dateStart, dateEnd, status, available}=req.body;

  try{
    if(available>=quantity){
        const new_reserva = new Reserva({
        name, description, quantity, status
    });

     await new_reserva.save();

    res.status(201).json(new_reserva);
    } else {
       res.status(400).json("Cantidad no disponible para esta fecha");
    }
    
  }catch (err){
    console.error(err);
    next(err);
  }

});

routerReserva.get("/:user", async(req, res, next)=>{
  const {user} = req.params;

  try{
    const found = await Reserva.find(user);
    

    res.status(200).json(found);

  } catch (err){
    console.error(err);
    next(err);
  }
  console.log(`id: ${id}`);
  next(new Error("Method not implemented"))
})

routerReserva.get("/:productID/:date", async (req, res, next) => {
  const { date, productID } = req.params;
  const targetDate = new Date(date);

  try {
    const targetDate = new Date(date);

    const found = await Reserva.find({
      dateStart: { $lte: targetDate },
      dateEnd: { $gte: targetDate },
      productId: productID
    });

    res.status(200).json(found);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

routerReserva.get("/", async(req, res, next)=>{
 
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

routerReserva.post('/:id/status', async (req, res, next) =>{
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
