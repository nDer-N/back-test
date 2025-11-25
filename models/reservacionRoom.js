import {Schema, model} from "mongoose";
const reservaRoomSchema = Schema({
    name: {
        type: String,
        trim: true
    },
    date: {
        type: String,
        trim: true
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
    roomId: {
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

const ReservaRoom = model("ReservaRoom", reservaRoomSchema);

export default ReservaRoom;