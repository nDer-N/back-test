import {Schema, model} from "mongoose";
const reservaRoomSchema = Schema({
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