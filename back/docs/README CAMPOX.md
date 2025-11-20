### ![Logo Campox](https://i.postimg.cc/rwtB3Gvn/Whats-App-Image-2025-11-13-at-9-04-42-AM-1.png)

# 🌿 **CAMPOX**





## 🌱 Idea de negocio y actividades 

Campox es una plataforma digital que conecta directamente a productores rurales con consumidores urbanos, eliminando intermediarios para promover el comercio justo. El objetivo es ofrecer un espacio donde los campesinos puedan publicar sus productos agrícolas o procesados, y los compradores puedan adquirirlos de forma segura, transparente y eficiente, mientras impulsan el trabajo y esfuerzo de los productores.

Además de facilitar la comercialización, Campox reconoce que muchos productores rurales no cuentan con conocimientos digitales avanzados ni acceso constante a internet. Por eso, la plataforma aparte de estar diseñada para ser intuitiva, también busca brindar un acompañamiento presencial a través de aliados comunitarios y soporte técnico mediante canales accesibles como WhatsApp o llamadas dependiendo de la comodidad del usuario. Además, se contempla integrar una figura de gestores comunitarios que puedan ayudar a varios productores a operar dentro del sistema.

### 🗺️ Delimitación geográfica 

Campox se enfocará inicialmente en departamentos con alta actividad agrícola y dificultades de acceso al mercado digital, como:

• Cundinamarca y Boyacá: presenta gran número de pequeños productores de frutas, hortalizas y lácteos que venden a través de intermediarios.

• Huila, Tolima y Nariño: productores de café, cacao y frutas que dependen de cadenas largas de comercialización.

• Cauca y Putumayo: zonas con productos agrícolas de calidad pero con limitaciones de conectividad y acceso a plataformas digitales.

• Antioquia (subregiones rurales): productores de flores, café y banano con oportunidades de diversificación comercial

Estos departamentos pierden rentabilidad debido a la intermediación y la falta de canales de venta directa. CAMPOX busca aumentar sus márgenes de ganancia, mejorar la trazabilidad del comercio justo y fortalecer la inclusión digital rural.

### 💰 Delimitación económica 

CAMPOX se enmarca dentro del sector de la agroindustria digital, combinando elementos de agrotech y e-commerce rural para transformar la comercialización de productos agrícolas.

• Sector económico: agroindustria digital (agrotech y comercio electrónico rural).

• Población objetivo: pequeños y medianos productores rurales con baja inclusión digital y acceso limitado a canales de venta directa.

• Problema económico central: la intermediación excesiva en las cadenas de comercialización reduce entre un 30 % y 60 % del valor final que recibe el productor por sus productos.

• Oportunidad de impacto: CAMPOX busca aumentar el ingreso neto de los campesinos y reducir los precios para consumidores urbanos al eliminar intermediarios, mejorar la trazabilidad y facilitar el acceso a mercados justos.

### 🧑‍🤝‍🧑 Delimitación social 

CAMPOX se enfoca en comunidades rurales con baja inclusión digital, reconociendo tanto sus desafíos como su potencial productivo.

• Usuarios principales: productores rurales con acceso limitado a tecnologías digitales, y consumidores urbanos interesados en productos locales, frescos y de origen justo.

• Aliados clave: asociaciones campesinas, alcaldías locales, gestores comunitarios y organizaciones territoriales que faciliten el acompañamiento presencial y la adopción de la plataforma.

• Impacto esperado: empoderamiento económico rural, digitalización inclusiva, fortalecimiento del comercio justo y descentralización del acceso al mercado digital. A diferencia de iniciativas privadas que integran solo a ciertos productores, CAMPOX busca llegar a cada región y permitir que cualquier campesino, sin importar su ubicación o tamaño de producción, pueda participar activamente en el comercio electrónico rural.

## 2. Funcionalidades principales 

### 👩‍🌾 Productores

• Registro 

• Verificación

• Publicación de producto

• Gestión de inventarios 

• Recepción de pagos.

• Acceso a soporte técnico y acompañamiento comunitario. 

### 🛍️ Compradores 

• Navegación por el catálogo de productos

• Creación de pedidos 

• Pagos digitales

• Comentarios o reseñas de los productos.

### 🛠️ Administrador

• verificación de productores.

• supervisión de pedidos.

• control de pagos. 

• Gestión de contenidos educativos y soporte.






# Rutas principales


## 🧍‍♀️ Rutas perfil de usuario 

| Metodo |           Ruta          |             Descripción              |
|--------|-------------------------|--------------------------------------|
|  GET   |       /usuarios         | Listar todos los perfiles de usuario |
|  GET   |/users/getUserById/{uuid}|    Obtener el usuario por el Id      |
| POST   |   /users/createUser     |             Crear usuario            |
|  PUT   |      /usuarios/:id      |     Actualizar datos del perfil      |
| DELETE |      /usuarios/:id      |      Eliminar perfil de usuario      |

## 🔑 Rutas autenticación

| Metodo |     Ruta     |     Descripción   |
|--------|--------------|-------------------|
|  POST  | /auth/login  |  Iniciar sesión   |

## 🛡️ Rutas Credenciales
| Metodo| Ruta | Descripcion |
|-------|-----------------------------------|-------------------------------------|
|  GET  |   /credential/getAllCredentials   |   Obtener todas las credenciales    |
|  GET  |/credential/getCredentialByUsername|Obtener la credencial por el userName|
|  GET  |/credential/getCreentialById/{uuid}|   Obtener la credencial por el Id   |


## 🛍️ Rutas de productos 

| Metodo |      Ruta      |              Descripción             |
|--------|----------------|--------------------------------------|
|GET|/products/getAllProducts|Obtener todos los productos|
|POST|/products/createProduct|Crear un nuevo producto|
|PUT|/products/updateProduct/{uuid}|Actualizar un producto|
|DELETE|/products/delete/{uuid}|Eliminar un producto|

## 🗂️ Rutas de categorías 

| Metodo |      Ruta       |          Descripción        |
|--------|-----------------|-----------------------------|
|GET|/category/allCategories|Obtener todas las categorias|
|GET|/category/getCategory|Obtener una categoria por su id|
|POST|/category/createCategory|Crear una categoria|
|PUT|/category/updateCategory|Actualizar una categoria|

## 📦 Rutas de pedidos

| Metodo |     Ruta     |           Descripción          |
|--------|--------------|--------------------------------|
|GET|/orders/getOrderById/{uuid}|Obtener un pedido por su ID|
|POST|/orders/createOrder|Crear un pedido|
|PATCH|/orders/updateOrder/{uuid}|Actualizar un pedido|
|DELETE|/orders/deleteOrder/{uuid}|Eliminar un pedido|

## 📋 Rutas de detalle de pedido 

| Metodo |          Ruta        |                   Descripción                | 
|--------|----------------------|----------------------------------------------|
|   GET  | /pedidos/:id/detalle |       Visualizar productos de un pedido      |
|  POST  | /pedidos/:id/detalle |         Agregar un producto al pedido        | 
|  PUT   |     /detalle/:id     |        Actualizar un ítem de un pedido       |
| DELETE |     /detalle/:id     |         Eliminar un producto del pedido      |

## 💳 Rutas de pagos 

| Metodo |    Ruta    |           Descripción          |
|--------|------------|--------------------------------|
|GET|/payment/getAllPayment|Obtener todos los pagos
|GET|/payment/getPaymentById/{uuid}|Obtener un pago por ID|
|POST|/payment/createPayment|Crear un pago|
|PUT|/payment/updatePayment|Actualizar un pago|
|DELETE|/payment/deletePayment/{uuid}|Eliminar un pago|

## ⭐ Rutas de reseñas 

| Metodo |              Ruta              |              Descripción             |
|--------|--------------------------------|--------------------------------------|
|  POST  |            /reseñas            |   Crear una reseña para un producto  |
|  GET   |            /reseñas            |        Consultar todas las         reseñas      |
|  GET   | /reseñas/producto/:id_producto | Ver reseñas de un producto especifico|
| DELETE |         /reseñas/:id           |         Eliminar una reseña          |

## 📜 Rutas historial de pedidos 

| Metodo |              Ruta            |                Descripción             |
|--------|------------------------------|----------------------------------------|
|   GET  |     /historial/:id_usuario   | Ver historial de pedidos de un usuario |
|   GET  | /historial/pedido/:id_pedido | Ver historial de un pedido en especifico | 


## Tecnologías Utilizadas

 • 🚀 NestJS: Framework backend basado en Node.js 

 • 🗃️ TypeORM: ORM facilita la conexión con la base de datos

 • 🐘 PostgreSQL: Base de datos relacional que almacena la información

 • 🔐 JWT & Bcrypt : Tecnologias usadas para la autenticación y seguridad de la API.

 • 📚 Swagger: Herramienta para documentar una API de forma interactiva
 
 









## Instrucciones de ejecución

### Clona el repositorio e instala las dependencias 

```
 git clone https://github.com/Cek00/Campox.git

 npm install
``` 

### Ejecuta el servidor 

```
npm run start:dev

```

### Abre Swagger


```
http://localhost:3002/api

```

## Roles del equipo

• Angie Lorena Sierra Tauta -  	Leader

• Stefany Gongora Castillo - Backend Developer

• Angy Paola Ariza Anaya - Relation developer

• Carolina Reyes Balaguera - Backend Developer







