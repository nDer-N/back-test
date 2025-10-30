import express from "express";

const routerProd = express.Router();

////////////////////////////////////////////////////////////

routerProd.get('/', (req, res) => {
  console.log('፨v')
    ////error simulado////////
    res.status(400)
    throw new Error("Error simulado");
    //////////////////////////
    

  res.send('Hello World!')
})

routerProd.post('/', (req, res) => {
    const productos = [

        {name: "camara", id:"1"},
        {name: "microfono", id:"2"}

    ]
  console.log('፨v')
  res.json({"productos":productos})
})



export default routerProd;
