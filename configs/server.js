"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import authRoutes from "../src/auth/auth.routes.js";
import userRoutes from "../src/user/user.routes.js";
import categoryRoutes from "../src/category/category.routes.js";
import productRoutes from "../src/product/product.routes.js";
import cartRoutes from "../src/cart/cart.routes.js";
import shoppingRoutes from "../src/shopping/shopping.routes.js";
import apiLimiter from "../src/middlewares/rate-limit-validator.js";
import { crearAdministrador } from "../src/user/user.controller.js";
import {crearCategoriaPorDefecto} from "../src/category/category.controller.js"
import { swaggerDocs, swaggerUi } from "./swagger.js";


const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(apiLimiter);
};

const routes = (app) => {
    app.use("/empresaBimestral/v1/auth", authRoutes);
    app.use("/empresaBimestral/v1/user", userRoutes);
    app.use("/empresaBimestral/v1/category", categoryRoutes);
    app.use("/empresaBimestral/v1/product",productRoutes);
    app.use("/empresaBimestral/v1/cart", cartRoutes);
    app.use("/empresaBimestral/v1/shopping",shoppingRoutes);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
};

const conectarDB = async () => {
    try {
        await dbConnection();
        await crearAdministrador();
        await crearCategoriaPorDefecto();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

export const initServer = () => {
    const app = express();
    try {
        middlewares(app);
        conectarDB();
        routes(app);
        const port = process.env.PORT || 3001; // Asegúrate de que el puerto sea 3001
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};