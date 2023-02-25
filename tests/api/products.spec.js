//importaremos supertest y lo guardaremos en ésta variable const request
const request = require('supertest');
const mongoose = require('mongoose');

const Product = require('../../models/product.model');
const app = require('../../app');

// function sumar(a, b) {
//     if (a === 0 && b === 0) {
//         return undefined;
//     }
//     return a+b;    
// }

// describe('Puebas sobre la api de productos', () => {
//     describe('GET /api/products', () => {
//         it('debería devolver la suma de dos números', () => {
//             expect(sumar(3,4)).toBe(7);
//             expect(sumar(2,3)).toBe(5);
//         });
//         it ('Debería devolver undefined si los dos parámetros son cero', () => {
//             expect(sumar(0, 0)).toBeUndefined();
//         });
//     });

// });

describe('Pruebas sobre la api de productos', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1/tienda-online'); // Conexion a DB antes de hacer mis pruebas (los describe)
    });

    afterAll(async () => {
        await mongoose.disconnect();  // Me desconecto de la DB cuando terminen todas mis pruebas
    });


    describe('GET /api/products', () => {  //Hay que crear ésta ruta (GET /api/products)  para q funcione
    // Metodos:
    // beforeAll
    // beforeEach
    // afterAll
    // afterEach


    let response;

    beforeAll(async () => {
        response = await request(app).get('/api/products').send();

    });

        it('Debería devolver status 200', async () => {

            expect(response.statusCode).toBe(200); // 1 que el status d la respuesta sea 200
        });

        it('Debería devolverme la respuesta en formato JSON', async () => {
            
            expect(response.headers['content-type']).toContain('application/json');// 2 Que el contenido de la respuesta es en formato JSON
        });


        it('Debería devolver un array', () => {
            expect(response.body).toBeInstanceOf(Array); // 3 Que la respuesta sea un array (previo cambio como muestro en products.js)
        });
    });


    describe('POST/api/products', () => {

        let response;
      // sacamos éste objeto para luego hacer pruebas, sacar datos...etc  
        const newProduct = {name: 'Picadora Moulinex', description: 'Para picar alimentos', price: 25, department: 'test', available: true, created_at: new Date() };


        beforeEach(async() => {
            response  = await request(app).post('/api/products').send(newProduct);

        });

        afterAll(async () => {
            await Product.deleteMany({ department: 'test' });
        });

        it('Debería devolver status 201', async () => {
            expect(response.statusCode).toBe(201);

        }); 
        
        it('Debería devolver la respuesta en formato JSON', async () => {
            expect(response.headers['content-type']).toContain('application/json');

        });

        // Comprobar si el id viene definido
        //    "       si alguno d los datos q estamos insert. nos es devuelto en la respuesta
        it('Debería insertar el producto en la DB', () => {
            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe(newProduct.name);
        });
    });

    describe('POST con validaciones/api/products', () => {
        // Si paso un objeto sin name, me devuelve error
        it('debería devolver error si no recibe el name', async () => {
            const response = await request(app).post('/api/products').send({
                description: 'lo que sea', price: 123, department: 'test', available: true, created_at: '2022-09-10'
            });

            expect(response.body.name).toBeDefined();
            expect(response.body.name.msg).toBe('El campo nombre es requerido');

        }); 

        it('debería devolver error si el name es menor de 3 caracteres', async () => {
            const response = await request(app).post('/api/products').send({
                name: 'as', description: 'lo que sea', price: 123, department: 'test', available: true, created_at: '2022-09-10'
            });

            expect(response.body.name).toBeDefined();
            expect(response.body.name.msg).toBe('El campo nombre debe tener tamaño mínimo de 3');

        }); 

        it('debería devolver error si no está disponible el producto',async () => {
            const response = await request(app).post('/api/products').send({
                name: 'Prueba', description: 'lo que sea', price: 123, department: 'test', available: false, created_at: '2022-09-10'
            });
            
            expect(response.body.available).toBeDefined();
            expect(response.body.available.msg).toBe('Todas las inserciones deben estar disponibles');
        });

    });

    
    describe('PUT/api/products/IDPRODUCT', () => {

        const newProduct = {name: 'Picadora Moulinex', description: 'Para picar alimentos', price: 25, department: 'test', available: true, created_at: new Date() };
        let product;

        let response;
        beforeEach(async () => {
            product = await Product.create(newProduct);// Aquí se crea el nuevo producto
            response = await request(app).put(`/api/products/${product._id}`).send({ price: 13, department: 'Sin clasificar'});
        });
        afterEach(async() => {
            await Product.findByIdAndDelete(product._id);// Borro el producto después de cada prueba
        });


        //Éstas son laas pruebas (los it)
        it('Debería devolver status 200', async () => {
            expect(response.statusCode).toBe(200);  
        });

        it('Debería devolver una respuesta en formato JSON', () => {
            expect(response.headers['content-type']).toContain('application/json');   
        });
        it('Debería devolver los datos actualizados', () => {
            expect(response.body.price).toBe(13);
            expect(response.body.department).toBe('Sin clasificar');
        }); 

    });

    describe('DELETE/api/products/IDPRODUCT', () => {
        let response;
        let product;
        const newProduct = {name: 'Picadora Moulinex', description: 'Para picar alimentos', price: 25, department: 'test', available: true, created_at: new Date() };

        beforeEach(async () => {
            product = await Product.create(newProduct);
            response = await request(app).delete(`/api/products/${product._id}`).send();
        });

        afterAll(async () => {
            await Product.deleteMany({ department: 'test'});
         });
           
        it('Debería devolver status 200', () => {
            expect(response.statusCode).toBe(200);
        });

        it('Debería devolver un objeto JSON', () => {
            expect(response.headers['content-type']).toContain('json');
        });

        it('Debería borrarse de la baase de datos',async () => {
            const productDel = await Product.findById(product._id);
            expect(productDel).toBeNull();
            
        }); 

    });
});
