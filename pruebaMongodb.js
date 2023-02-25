const mongoose = require('mongoose');

const Product = require('./models/product.model');

(async () => {
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://localhost/tienda-online');

    // await Product.deleteMany({});

     //Crear un producto
    // await Product.create({
    //      name: 'Lapiz ojos',
    //      description: 'Larga duración',
    //      price: 35,
    //      department: 'cosmética',
    //      available: false,
    //      created_at: new Date()
    // });


    //  Recuperar documentos
     const products = await Product.find();  // 3 Que la respuesta sea un array
     //console.log(products.map(p => p.name));

    const productsModa = await Product.find({ 
        department: 'moda',// Aquí funciona find como filtro encuentra los departamentos moda y además q estén activos
        available: true
    }).select({ name: 1, _id: 0 }); // Para sacar sólo el nombre del producto producto sin id 
    //console.log(productsModa);

    const productsPrecio =await Product.find({
        price: { $gt: 50 }  // sacar precio preducto mayor que 50 (comparadores)
    });
    //console.log(productsPrecio);
    const options = {
        $or: [
            {available: true},
            {price: { $lt: 20}}
        ]
    }

    const productOr = await Product.find(options)
    console.log(productOr);

    await mongoose.disconnect();

})();



    // const productsModa = await Product.find({
    //     department: 'moda',
    //     available: true
    // }).select({ name: 1, _id: 0 });

    // // console.log(productsModa);

    // const productsPrecio = await Product.find({
    //     price: { $gt: 50 } // $gte, $lt, $lte
    // });
    // // console.log(productsPrecio);

    // const options = {
    //     $and: [
    //         { available: true },
    //         { price: { $lt: 30 } }
    //     ]
    // }
    // options.$and.push({ name: 'Lápiz rojo' });
    // const productsOr = await Product.find(options)
    // console.log(productsOr);

   

