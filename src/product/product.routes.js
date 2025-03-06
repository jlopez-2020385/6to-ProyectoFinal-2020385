import { Router } from "express";
import {addProduct,ProductCategory,listProduct,updateProduct,inventarioProduct,ventasProduct,deleteProduct,updateByProduct,listarProductosEstado} from "./product.controller.js";
import { addProductValidator, productCategoryValidator , listProductValidator ,updateProductValidator,inventoryProductValidator,ventasProductValidator,deleteProductValidator,updateByProductValidator} from "../middlewares/validate-product.js"

const router = Router();

router.post("/",addProductValidator, addProduct);

router.get("/productproducto/:name",productCategoryValidator, ProductCategory);

router.get("/listProduct",listProductValidator, listProduct);

router.put("/updateProduct/:id", updateProductValidator,updateProduct);

router.post("/inventarioProduct", inventoryProductValidator,inventarioProduct);

router.get("/listarPorExistencias",listarProductosEstado)

router.get("/ventasProduct",ventasProductValidator, ventasProduct);

router.delete("/deleteProduct/:id",deleteProductValidator, deleteProduct);

router.patch("/updateByProduct/:id",updateByProductValidator, updateByProduct);

export default router;
