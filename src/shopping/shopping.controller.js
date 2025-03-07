import Shopping from "./shopping.model.js";
import Cart from "../cart/cart.model.js";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";


export const realizarCompra = async (req, res) => {
    try {
        const { usuarioId } = req.body;
        

        const carrito = await Cart.findOne({ usuarioId }).populate("productos.productoId");
        if (!carrito || carrito.productos.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "El carrito está vacío" 
            });
        }

        for (const item of carrito.productos) {
            const producto = item.productoId;
            if (producto.existencias < item.cantidad) {
                return res.status(400).json({ 
                    success: false, 
                    message: `Stock insuficiente para el producto: ${producto.nombre}` 
                });
            }
            producto.existencias -= item.cantidad;
            producto.ventas = (producto.ventas || 0) + item.cantidad;
            await producto.save();  
        }

        const totalCompra = carrito.productos.reduce((total, item) => 
            total + (item.productoId.precio * item.cantidad), 0
        );

        const nuevaCompra = new Shopping({
            usuarioId,
            productos: carrito.productos.map(item => ({
                productoId: item.productoId._id,
                nombre: item.productoId.nombre,  
                cantidad: item.cantidad,
                precio: item.productoId.precio
            })),
            total: totalCompra
        });

        await nuevaCompra.save();

        carrito.productos = [];
        await carrito.save();

        const { facturaPath, facturaBase64 } = await generarFacturaPDF(nuevaCompra);

        return res.status(200).json({ 
            success: true, 
            message: "Compra realizada con éxito",
            compra: nuevaCompra,
            facturaPDF: facturaBase64 
        });

    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: "Error al realizar la compra", 
            error: err.message 
        });
    }
};

const generarFacturaPDF = (compra) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const facturaNombre = `factura_${compra.usuarioId}_${Date.now()}.pdf`;
        const facturaPath = path.join("facturas", facturaNombre);

        if (!fs.existsSync("facturas")) {
            fs.mkdirSync("facturas");
        }

        const stream = fs.createWriteStream(facturaPath);
        doc.pipe(stream);

        doc.fontSize(20).text("Factura de Compra", { align: "center" });
        doc.moveDown();
        doc.fontSize(12).text(`ID de Compra: ${compra._id}`);
        doc.text(`Fecha: ${new Date().toLocaleString()}`);
        doc.text(`Usuario ID: ${compra.usuarioId}`);
        doc.moveDown();

        doc.fontSize(14).text("Productos Comprados:");
        compra.productos.forEach((item, index) => {
            doc.fontSize(12).text(`${index + 1}. Producto: ${item.nombre} - Cantidad: ${item.cantidad} - Precio: $${item.precio}`);
        });

        doc.moveDown();
        doc.fontSize(14).text(`Total: $${compra.total}`, { align: "right" });

        doc.end();

        stream.on("finish", () => {
            const facturaBase64 = fs.readFileSync(facturaPath, { encoding: "base64" });
            resolve({ facturaPath, facturaBase64 });
        });

        stream.on("error", (err) => reject(err));
    });
};


export const obtenerHistorialCompras = async (req, res) => {
    try {
        const { usuarioId } = req.params; 

        const compras = await Shopping.find({ usuarioId }).populate("productos.productoId");

        if (!compras.length) {
            return res.status(404).json({ 
                success: false, 
                message: "No se encontraron compras para este usuario" 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Historial de compras obtenido con éxito", 
            compras 
        });

    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: "Error al obtener el historial de compras", 
            error: err.message 
        });
    }
};
