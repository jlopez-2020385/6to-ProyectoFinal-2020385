import User from "../user/user.model.js"
import ProductosGestion from "../product/product.model.js";
import Category from "../category/category.model.js";

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    console.log(existe)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}

export const categoryExists = async (id) => {
    const categoria = await Category.findById(id);
    if (!categoria) {
        throw new Error("No existe la categoría con el ID proporcionado");
    }
    return categoria; 
};

export const productExists = async (productName = "") => {
    const existe = await ProductosGestion.findOne({ nombre: productName });
    if (existe) {
        throw new Error(`El producto con el nombre ${productName} ya existe.`);
    }
};

export const categoryProduct = async (categoryId) => {
    const producto = await ProductosGestion.findOne({ categoria: categoryId });
    if (producto) {
        throw new Error(`La categoría ya está asignada a un producto. No puedes asignarla a otro producto.`);
    }
};