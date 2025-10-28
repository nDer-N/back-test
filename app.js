import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()






















const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  console.log('፨v')
  res.send('Hello World!')
})

app.post('/api/products', (req, res) => {
    const productos = [

        {name: "camara", id:"1"},
        {name: "microfono", id:"2"}

    ]
  console.log('፨v')
  res.json({"productos":productos})
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
