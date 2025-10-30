import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();

const DBMongo = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGO);
        console.log("Conexión Exitosa type shi")
    } catch (error) {
        console.log(`ERROR: ${error.message}`)
        process.exit(1);
    }

}




export default DBMongo




