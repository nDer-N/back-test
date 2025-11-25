import express from "express";
import Room from "../models/room.js";

const routerRoom = express.Router();

////////////////////////////////////////////////////////////


routerRoom.post('/', async (req, res, next) =>{
  console.log(req.body);
  if(!req.body.name || !req.body.description){
    next(new Error("Incorrect room syntax"));
    return;
  }
  const {name, description, img}=req.body;

  try{
    const new_room = new Room({
      name,
      description,
      img
    });

    await new_room.save();

    res.status(201).json(new_room);
  }catch (err){
    console.error(err);
    next(err);
  }

});

routerRoom.get("/:id", async(req, res, next)=>{
  const {id} = req.params;

  try{
    const found = await Room.findById(id);
    res.status(200).json(found);

  } catch (err){
    console.error(err);
    next(err);
  }
  console.log(`id: ${id}`);
  next(new Error("Method not implemented"))
})

routerRoom.get("/", async(req, res, next)=>{
  
  try{
    const found = await Room.find();
    res.status(200).json(found);
  } catch (err){
    console.error(err);
    next(err);
  }
})


export default routerRoom;
