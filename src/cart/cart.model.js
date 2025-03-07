import { Schema, model } from "mongoose";

const cartSchema = Schema({
    usuarioId: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    productos: [
        {
            productoId: { 
                type: Schema.Types.ObjectId, 
                ref: "ProductosGestion", 
                required: true 
            },
            cantidad: { 
                type: Number, 
                required: true 
            }
        }
    ]

}, {
    timestamps: true,
    versionKey: false
});

export default model("Cart",cartSchema) 