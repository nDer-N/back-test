import {Schema, model} from "mongoose";
const reservaRoomSchema = Schema({
    dateStart: {
        type: Date,
       
    },
    dateEnd: {
        type: Date,
       
    },
    roomId: {
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

const ReservaRoom = model("ReservaRoom", reservaRoomSchema);

export default ReservaRoom;