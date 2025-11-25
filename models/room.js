import {Schema, model} from "mongoose";
const roomSchema = Schema({
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    img: {
        type: String
    }

})

const Room = model("Room", roomSchema);

export default Room;