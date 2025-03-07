import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Gestion de Empresas API",
            version: "1.0.0",
            description: "API para gestiona empresas y sus productos",
            contact:{
                name: "José López",
                email: "jlopez-2020385@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/empresaBimestral/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/cart/cart.routes.js",
        "./src/category/category.routes.js",
        "./src/product/product.routes.js",
        "./src/shopping/shopping.routes.js"
    ]
};

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}