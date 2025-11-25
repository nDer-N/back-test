import {Schema, model} from "mongoose";
const reservaSchema = Schema({
    name: {
        type: String,
        trim: true
    },
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
        type: Number
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