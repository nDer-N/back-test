import express from "express";
import Product from "../models/product.js";

const routerProd = express.Router();

////////////////////////////////////////////////////////////


/*routerProd.post('/', (req, res) => {
    const productos = [

        {name: "camara", id:"1"},
        {name: "microfono", id:"2"}

    ]
  console.log('፨v')
  res.json({"productos":productos})
})
  */

routerProd.post('/', async (req, res, next) =>{
  console.log(req.body);
  if(!req.body.name || !req.body.description || !req.body.price){
    next(new Error("Name, price or description missing"));
    return;
  }
  const {name, description, price}=req.body;

  try{
    const new_product = new Product({
      name,
      description,
      price
    });

    await new_product.save();

    res.status(201).json(new_product);
  }catch (err){
    console.error(err);
    next(err);
  }

});

routerProd.get("/:id", async(req, res, next)=>{
  const {id} = req.params;

  try{
    const found = await Product.findById(id);
    

    res.status(200).json(found);

  } catch (err){
    console.error(err);
    next(err);
  }
  console.log(`id: ${id}`);
  next(new Error("Method not implemented"))
})

routerProd.get("/", async(req, res, next)=>{
  const {id} = req.params;
  try{
    const found = await Product.find();
    res.status(200).json(found);
  } catch (err){
    console.error(err);
    next(err);
  }
})


export default routerProd;
