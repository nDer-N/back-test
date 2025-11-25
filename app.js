import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routerProd from './routes/routesProducts.js'
import routerReservas from './routes/routesReservation.js'
import routerReservasRooms from './routes/routesReservationRoom.js'
import routerUser from './routes/routerUser.js'
import { errorHandler } from './middleware/error.js'
import DBMongo from './config/db.js'

dotenv.config()


const app = express();
const PORT = process.env.PORT || 5000

DBMongo();
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: true}))

app.use('/api/products', routerProd);
app.use('/api/reservas', routerReservas);
app.use('/api/reservas/salones', routerReservasRooms);
app.use('/api/users', routerUser);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
