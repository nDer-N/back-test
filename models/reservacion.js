import {Schema, model} from "mongoose";
const reservaSchema = Schema({
    dateStart: {
        type: Date,
       
    },
    dateEnd: {
        type: Date,
       
    },
    quantity: {
        type: Number
    },
    productId: {
        type: String
    },
    description: {
        type: String
    },
    user: {
        type:String
    },
    status: {
        type: String
    }

})

const Reserva = model("Reserva", reservaSchema);

export default Reserva;