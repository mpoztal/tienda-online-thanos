# Creación del CRUD de Productos

- GET /api/products
  - Recuperar todos los productos
  - PRUEBAS:
    - 1 Que el status de la respuesta sea 200 [X]
    - 2 Que el contenido de la respuesta es en formato JSON
    - 3 Que la respuesta sea un array
    - 4 Que los productos devueltos son un número concreto

- POST /api/products
  - Crear un único producto

- PUT /api/products/IDPRODUCT
  - Actualiza un producto a partir de su ID

- DELETE /api/products/IDPRODUCT
  - Borra un producto a partir de su ID

## PRUEBA PUT /api/products/IDPRODUCT

- Probamos el status (200) y el content-type -> Crear la petición en la app
- Antes de cada prueba generamos un objeto en la BD (¿Cómo generamos el
  producto?)
- Después de cada prueba borramos dicho objeto (findByIdAndDelete)
- Antes de cada prueba lanzamos la petición de actualización (PUT
  /api/products/IDPRODUCT) -> supertest
- En la actualización modificamos price y department -> BODY
- En la última prueba confirmamos si el valor del price y del department que
  estamos pasando son los que nos devuelve la ejecución

## PRUEBA DELETE /api/products/IDPRODUCT

- Antes de cada prueba crear un nuevo producto
- Antes de cada prueba lanzamos la petición

- Probamos:
  - Status y content-type
  - Comprobar en la base de datos si el producto que he creado está o no.
    (findById)

  const product = await Product.findById(sdfsafdsf); expect(product).toBeNull():

- Si paso un objeto sin name, me devuelve error
- Si paso un objeto con name menos de 3 caracteres, error
- Si paso available a false, error



# USUARIOS

- Modelo: User -> username, email, password, active (Boolean), role

- RUTA:

  - /api/users/register--->(ver en fich. users.js)una vez credo lo engancho en api.js así---> router.use('users', require('./api/users'));

  - Recibe a través del body los datos de un user ---> try {

        const user = await User.create(req.body);
        res.json(user);

    } catch (err) {
        res.json({ error: err.message });
    }

  y lo inserta en la BD----> (ver en MongoDB) que el user está insertado además con password encriptada (ver user.js)

  

GET /products/add/IDPRODUCT

- Agrega al usuario que ha hecho login ese producto en concreto

GET /products/cart

- Recupera los productos del usuario logado

GET /users/profile  (ver en users.js en get('/profile')

- Recupera el perfil completo del usuario logado. Productos incluidos
