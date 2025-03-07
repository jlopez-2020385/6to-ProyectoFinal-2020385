import { Schema, model } from "mongoose";

const compraSchema = Schema({
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
            nombre: { 
                type: String,
                required: true 
            },
            cantidad: { 
                type: Number, 
                required: true 
            },
            precio: { 
                type: Number, 
                required: true 
            }
        }
    ],
    total: { 
        type: Number, 
        required: true 
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model("Shopping", compraSchema);