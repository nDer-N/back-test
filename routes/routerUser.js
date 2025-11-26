import express from "express";
import User from "../models/user.js";

const routerUser = express.Router();

////////////////////////////////////////////////////////////

//ESTE POST ES PARA CREAR EL USUARIO SI ES LA PRIMERA VEZ QUE INICIA SESIÓN
    routerUser.post('/', async (req, res, next) =>{
        if(!req.body.name || !req.body.email || !req.body.warnings || !req.body.img){
        next(new Error("Invalid user"));
        return;
    }
    console.log(req.body);
    

    try{
        const { name, email, warnings, img } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
        return res.status(200).json(existingUser);
        }
        const new_user = new User({
        name,
        email,
        warnings,
        img
        });

        await new_user.save();

        res.status(201).json(new_user);
    }catch (err){
        console.error(err);
        next(err);
    }

    });

//ESTE POST ES PARA AÑADIR UNA WARNING A UN USUARIO

routerUser.post('/:id/warnings', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Debes enviar un mensaje de advertencia." });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const fechaActual = new Date();

    user.warnings.push({
      message,
      date: fechaActual
    });

    await user.save();

    res.status(200).json({
      message: "Advertencia agregada correctamente",
      user
    });

  } catch (err) {
    console.error(err);
    next(err);
  }
});

//GET PARA REGRESAR EL USUARIO COMPLETO

routerUser.get("/:id", async(req, res, next)=>{
  const {id} = req.params;

  try{
    const found = await User.findById(id);
    

    res.status(200).json(found);

  } catch (err){
    console.error(err);
    next(err);
  }
  console.log(`id: ${id}`);
  next(new Error("Method not implemented"))
})

//GET PARA REGRESAR LISTA DE USUARIOS (VER PERFILES)

routerUser.get("/", async(req, res, next)=>{
  const {id} = req.params;
  try{
    const found = await User.find();
    res.status(200).json(found);
  } catch (err){
    console.error(err);
    next(err);
  }
})

routerUser.delete('/:userId/warnings/:warningId', async (req, res, next) => {
  try {
    const { userId, warningId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const warningIndex = user.warnings.findIndex(
      w => w._id.toString() === warningId
    );

    if (warningIndex === -1) {
      return res.status(404).json({ error: "Warning no encontrada." });
    }

    user.warnings.splice(warningIndex, 1);

    await user.save();

    res.status(200).json({
      message: "Warning eliminada correctamente",
      warnings: user.warnings
    });

  } catch (err) {
    console.error(err);
    next(err);
  }
});



export default routerUser;
