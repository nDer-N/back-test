import {Schema, model} from "mongoose";
const reservaSchema = Schema({
    name: {
        type: String,
        trim: true
    },
    date: {
        type: String,
        trim: true
    },
    quantity: {
        type: Number
    },
    day: {
        type: Number
    },
    month: {
        type: Number
    },
    year: {
        type: Number
    },
    productId: {
        type: Number
    },
    description: {
        type: String
    }

})

const Reserva = model("Reserva", reservaSchema);

export default Reserva;