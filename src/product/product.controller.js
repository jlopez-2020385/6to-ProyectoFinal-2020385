import { hash } from "argon2";
import ProductosGestion from "./product.model.js";
import Category from "../category/category.model.js";

export const addProduct = async (req, res) => { 
    try {
        const data = req.body;

        const categoryExists = await Category.findById(data.categoria);
        if (!categoryExists) {
            return res.status(400).json({
                success: false,
                message: "La categoría especificada no existe."
            });
        }

        const disponibilidad = data.existencias > 0 ? "Disponible" : "Agotado";

        const newProduct = new ProductosGestion({ 
            ...data, 
            disponibilidad 
        });

        await newProduct.save();

        return res.status(201).json({
            success: true,
            message: "Producto agregado correctamente.",
            product: newProduct
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al agregar el producto",
            error: err.message
        });
    }
};


export const ProductCategory = async (req, res) => {
    try {
        const { name } = req.params; 

        const query = { nombre: { $regex: name, $options: "i" }, status: true }; 

        const [total, products] = await Promise.all([
            ProductosGestion.countDocuments(query),
            ProductosGestion.find(query)
        ]);

        return res.status(200).json({
            success: true,
            total,
            products
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener productos por nombre",
            error: err.message
        });
    }
};

export const listProduct = async (req, res) => {
    try {
        const query = { status: true }; 

        const [total, products] = await Promise.all([
            ProductosGestion.countDocuments(query),
            ProductosGestion.find(query).populate("categoria", "name")
        ]);

        return res.status(200).json({
            success: true,
            total,
            products
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener todos los productos",
            error: err.message
        });
    }
};


export const updateProduct = async (req, res) => { 
    try {
        const { id } = req.params; 
        const data = req.body; 

        const product = await ProductosGestion.findByIdAndUpdate(id, data, { new: true });

        if (!product) {
            return res.status(404).json({
                success: false,
                msg: 'Producto no encontrado',
            });
        }

        res.status(200).json({
            success: true,
            msg: 'Producto actualizado correctamente',
            product,
        });
        
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar el producto',
            error: err.message
        });
    }
}



export const inventarioProduct = async (req, res) => {
    try {
        const { productId, cantidad } = req.body;

        const product = await ProductosGestion.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            });
        }

        if (product.existencias < cantidad) {
            return res.status(400).json({
                success: false,
                message: "No hay suficiente stock"
            });
        }

        product.existencias -= cantidad;
        product.ventas += cantidad;
        await product.save();

        return res.status(200).json({
            success: true,
            message: "Compra realizada con éxito",
            product
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al realizar la compra",
            error: err.message
        });
    }
};


export const listarProductosEstado = async (req, res) => {
    try {
        const productos = await ProductosGestion.find();

        const productosAgotados = productos.filter(producto => producto.existencias === 0 || producto.status === false);
        const productosDisponibles = productos.filter(producto => producto.existencias > 0 && producto.status === true);

        return res.status(200).json({
            success: true,
            message: "Listado de productos agotado o no disponible",
            productosAgotados,
            message2:"Lista de productos disponibles",
            productosDisponibles
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
            error: err.message
        });
    }
};

export const ventasProduct = async (req, res) => {
    try {
        const ventasProduct = await ProductosGestion.find().sort({ ventas: -1 }).limit(2);

        if (!ventasProduct.length) {
            return res.status(404).json({
                success: false,
                message: "No hay productos vendidos aún"
            });
        }

        return res.status(200).json({
            success: true,
            ventasProduct
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el producto más vendido",
            error: err.message
        });
    }
};



export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await ProductosGestion.findByIdAndUpdate(id, { status: false }, { new: true });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Producto eliminado correctamente",
            product
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el producto",
            error: err.message
        });
    }
};


export const updateByProduct = async (req, res) => { 
    try {
        const { id } = req.params; 
        const updatedProduct = await ProductosGestion.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (Object.keys(req.body).length !== 1) {
            return res.status(400).json({ 
                success: false, 
                message: "Solo puedes actualizar un campo a la vez" 
            });
        }

        if (!updatedProduct) {
            return res.status(404).json({
                success: false, 
                message: "Producto no encontrado" 
            });
        }

        return res.status(200).json({ 
            success: true, 
            message: "Producto actualizado", 
            product: updatedProduct 
        });

    } catch (err) {
        return res.status(500).json({ 
            success: false, 
            message: "Error al actualizar", 
            error: err.message 
        });
    }
};
