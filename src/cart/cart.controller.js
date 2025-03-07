import Cart from "./cart.model.js";
import ProductosGestion from "../product/product.model.js";

export const agregarAlCarrito = async (req, res) => {
    try {
        const { usuarioId, productoId, cantidad } = req.body;

        const producto = await ProductosGestion.findById(productoId);
        if (!producto) {
            return res.status(404).json({ 
                success: false, 
                message: "Producto no encontrado" 
            });
        }

        if (producto.existencias < cantidad) {
            return res.status(400).json({ 
                success: false, 
                message: "Producto agotado hasta el moneto" 
            });
        }

        const carrito = await Cart.findOne({ usuarioId }) || new Cart({ usuarioId, productos: [] });

        carrito.productos.push({ productoId, cantidad });
        await carrito.save();

        return res.status(200).json({ 
            success: true, 
            message: "Producto agregado al carrito", 
            carrito 
        });

    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: "Error al agregar al carrito", 
            error: err.message 
        });
    }
};

export const eliminarProductoCarrito = async (req, res) => {
    try {
        const { usuarioId, productoId } = req.body;

        const carrito = await Cart.findOne({ usuarioId });

        if (!carrito) {
            return res.status(404).json({ 
                success: false, 
                message: "Carrito no encontrado" 
            });
        }

        const productosFiltrados = carrito.productos.filter(
            item => item.productoId.toString() !== productoId
        );

        if (productosFiltrados.length === carrito.productos.length) {
            return res.status(404).json({ 
                success: false, 
                message: "Producto no encontrado en el carrito" 
            });
        }

        carrito.productos = productosFiltrados;
        await carrito.save();

        return res.status(200).json({ 
            success: true, 
            message: "Producto eliminado del carrito", 
            carrito 
        });

    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: "Error al eliminar el producto del carrito", 
            error: err.message 
        });
    }
};


export const listarrCarritoUser = async (req, res) => {
    try {
        const { usuarioId } = req.params;

        const carrito = await Cart.findOne({ usuarioId }).populate("productos.productoId");

        if (!carrito) {
            return res.status(404).json({
                success: false,
                message: "Carrito no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Carrito obtenido correctamente",
            carrito
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el carrito",
            error: err.message
        });
    }
};