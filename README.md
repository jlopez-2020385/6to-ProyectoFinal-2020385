# 6to-ProyectoFinal-2020385  API Gestion de Empresa


Esta API esta diseñada para poder gestionar Productos Usuarios Ventas y Compras.

## Iniciar el Proyecto 

Para iniciar el proyecto de Gestion de Empresa en el repositorio de GitHub de 6to-ProyectoFinal-2020385 hay un link que tienes que copiar 

```
https://github.com/jlopez-2020385/6to-ProyectoFinal-2020385.git

```

Despues de copiar el link crea una carpeta 📂 Puedes ponerle cualquier nombre al ya crear la carpeta entra y pon cmd 

1 proceso
--------------------------------------------------------------------------------------------------------------------

![image](https://github.com/user-attachments/assets/38e5d0f5-ba7b-47f6-bc91-611ddb602c25) 

 2 paso
--------------------------------------------------------------------------------------------------------------------

![image](https://github.com/user-attachments/assets/ada3cb24-744f-476f-947a-cdc480f8cce5)


Esto nos dirigira al Terminal o como otros le llaman CMD  
--------------------------------------------------------------------------------------------------------------------

![image](https://github.com/user-attachments/assets/7fa7193d-6dae-4bc9-90bd-3c258782090a)

Despues tendremos clonar el proyecto para que se descargue en nuestra carpeta para eso sirve el link hay que poner el
git clone y despues el link

```
C:\Users\ema22\OneDrive\Escritorio\Proyecto>git clone https://github.com/jlopez-2020385/6to-ProyectoFinal-2020385.git

```
Aqui una demostracion 
--------------------------------------------------------------------------------------------------------------------
![image](https://github.com/user-attachments/assets/47007418-9cb1-4c04-8212-e4a3a2ed68d9)

Esto significa que nuetro proyecto fue descargado exitosamente cerramos el cmd y vemos que la carpeta 📂 6to-ProyectoFinal-2020385


![image](https://github.com/user-attachments/assets/ad74dc5c-8b5a-439a-8343-669faeb8b32b)


Despues entramos en la carpeta 📂 6to-ProyectoFinal-2020385 y hacemos el mismo paso de la carpeta arriva escribimos cmd y nos envia al 
Terminal y seguimos estos pasos para poder ejecutar el proyecto el proyecto necesita instalar independencias para poder ejecutar las 
funcionalidades 

instalacion de independencias
```
 > npm install
```
Como tiene que ir
```
C:\Users\ema22\OneDrive\Escritorio\Proyecto\6to-ProyectoFinal-2020385>npm install
```
Depues tiene que tener este resultado 
![image](https://github.com/user-attachments/assets/08de6972-9772-45d6-9867-c94acfa0cccb)

Al ya las dependencias descargadas ponemos 

```
>npm run dev
```

```
C:\Users\ema22\OneDrive\Escritorio\Proyecto\6to-ProyectoFinal-2020385>npm run dev
```

Esto iniciara el proyecto consiente que tiene que tener la base de datos MongoDB conectada Presiona Connect 
--------------------------------------------------------------------------------------------------------------------
![image](https://github.com/user-attachments/assets/a07069f6-1920-47cf-80c7-8e6e5ead2771)
--------------------------------------------------------------------------------------------------------------------
![image](https://github.com/user-attachments/assets/2c58711f-33b3-4ef3-ba99-ab3f494e4b7b)


Este es el resultado 
--------------------------------------------------------------------------------------------------------------------

![image](https://github.com/user-attachments/assets/7ea45e49-67f8-4162-a748-f3d77dca795d)

 De hay ya puedes solicitar tus peticiones para el manejo de tu empresa
 --------------------------------------------------------------------------------------------------------------------



## Endpoints de la API

Tendra Gestiones de productos que podra agregar nuevos productos a la base de datos,
visualizar tanto productos individuales como el catálogo completo, editar detalles específicos de un producto,
llevar un control exhaustivo del inventario, identificar productos agotados, obtener información sobre los
productos más vendidos, realizar modificaciones en la información del producto, y, finalmente, eliminar un
producto.

Gestión de categorías que podra agregar nuevas categorías a la base de datos, visualizar
todas las categorías existentes, realizar ediciones en la información de una categoría y eliminarla en caso de
que un producto esté asociado a una categoría que se requiere eliminar, el sistema asegura que el producto
se transfiera automáticamente a una categoría predeterminada.

Gestión de usuarios esta función permite agregar nuevos usuarios, modificar el rol al que pertenecen
(Administrador [ADMIN] o Cliente [CLIENT]), editar la información de un usuario (sujeto a restricciones
específicas para usuarios con rol cliente), así como eliminar usuarios (también sujeto a las restricciones
mencionadas).

Autenticación de Usuario incluye la capacidad de iniciar sesión y/o registrarse, donde el registro automático
asigna al usuario el rol de cliente. El acceso a todas las funciones descritas está condicionado a la autenticación
exitosa mediante usuario y contraseña.

Exploración de Productos permite a los usuarios visualizar el catálogo de productos más vendidos, buscar
productos por nombre, explorar las categorías existentes y acceder al catálogo de productos filtrado por
categoría.

Gestión de Carrito de Compras: Habilita la opción de agregar productos al carrito de compras para su posterior
adquisición.

Proceso de Compra: Permite a los usuarios completar el proceso de compra, presentando una factura
detallada como resultado de la transacción.

Historial de Compra: Al iniciar sesión, los usuarios pueden acceder a un historial completo de sus compras
anteriores.

Gestión de perfil: Ofrece la posibilidad de editar detalles del perfil del usuario, como información personal y
preferencias.

Eliminación de Cuenta: Permite a los usuarios eliminar su cuenta, sujeto a confirmación y medidas de
seguridad adicionales.
