import {Schema, model} from "mongoose";
const userSchema = Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    img: {
        type: String,
        trim:true
    }, 
    warnings: [
  {
    message: { type: String, required: true },
    date: { type: Date, default: Date.now },
  }
]


})

const User = model("User", userSchema);

export default User;