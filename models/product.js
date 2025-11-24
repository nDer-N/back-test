import {Schema, model} from "mongoose";
const productSchema = Schema({
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    quantity: {
        type: Number
    }


})

const Product = model("Product", productSchema);

export default Product;