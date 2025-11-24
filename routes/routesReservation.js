import express from "express";
import Reserva from "../models/reservacion.js";

const routerReserva = express.Router();

////////////////////////////////////////////////////////////



routerReserva.post('/', async (req, res, next) =>{
  console.log(req.body);
  if(!req.body.name || !req.body.description || !req.body.quantity || !req.body.productId || !req.body.day || !req.body.month || !req.body.year || !req.body.date){
    next(new Error("Invalid reservation"));
    return;
  }
  const {name, description, quantity, productId, day, month, year, date}=req.body;

  try{
    const new_reserva = new Reserva({
      name, description, quantity, productId, day, month, year, date
    });

    await new_reserva.save();

    res.status(201).json(new_reserva);
  }catch (err){
    console.error(err);
    next(err);
  }

});

routerReserva.get("/:id", async(req, res, next)=>{
  const {id} = req.params;

  try{
    const found = await Reserva.findById(id);
    

    res.status(200).json(found);

  } catch (err){
    console.error(err);
    next(err);
  }
  console.log(`id: ${id}`);
  next(new Error("Method not implemented"))
})

routerReserva.get("/:day/:month/:year", async(req, res, next)=>{
  const {day, month, year} = req.params;
  try{
    const found = await Reserva.find({year, month, day});
    res.status(200).json(found);
  } catch (err){
    console.error(err);
    next(err);
  }
})


export default routerReserva;
