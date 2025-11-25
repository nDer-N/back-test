import express from "express";
import Reserva from "../models/reservacionRoom.js";

const routerReservaRooms = express.Router();

////////////////////////////////////////////////////////////



routerReservaRooms.post('/', async (req, res, next) =>{
  console.log(req.body);
  if(!req.body.name || !req.body.description || !req.body.roomId || !req.body.day || !req.body.month || !req.body.year || !req.body.date || !req.body.user){
    next(new Error("Invalid reservation"));
    return;
  }
  const {name, description, roomId, day, month, year, date, user, status}=req.body;

  try{
    const new_reserva = new Reserva({
      name, description, roomId, day, month, year, date, user, status
    });

    await new_reserva.save();

    res.status(201).json(new_reserva);
  }catch (err){
    console.error(err);
    next(err);
  }

});

routerReservaRooms.get("/:user", async(req, res, next)=>{
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

routerReservaRooms.get("/:day/:month/:year", async(req, res, next)=>{
  const {day, month, year} = req.params;
  try{
    const found = await Reserva.find({year, month, day});
    res.status(200).json(found);
  } catch (err){
    console.eSrror(err);
    next(err);
  }
})

routerReservaRooms.get("/", async(req, res, next)=>{
  const {id} = req.params;
  try{
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; //Por alguna razon los meses va de 0 a 11 :skull:
    const day = now.getDate();

    const found = await Reserva.find({
      $or: [
        { year: { $gt: year } },
        { year, month: { $gt: month } },
        { year, month, day: { $gte: day } },
      ]
    });
    res.status(200).json(found);
  } catch (err){
    console.eSrror(err);
    next(err);
  }
})


export default routerReservaRooms;
