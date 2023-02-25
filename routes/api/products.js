const router = require('express').Router();
const { checkSchema, validationResult } = require('express-validator');

const Product = require('../../models/product.model');
const User =require('../../models/user.model');


const { checkValidationErrors } = require('../../helpers/middlewares');
const createProductValidator = require('../../validators/createProduct.validator');



router.get('/', async (req, res) => {

    const products = await Product.find();
    //res.json('Fin de la petición');// Si cambiamos por  res.json([]) por un array....pasará la prueba 3

    res.json(products);
});

router.get('/add/:productId', async (req, res) => {
   const { productId } = req.params;
   req.user.products.push(productId);
   await req.user.save();

   res.json({ sucess: 'producto agregado'});
});

router.get('/cart', async (req, res) => { //Aq recuperamos los usuarios por su ID y además en su propiedad products quiero q me despliegues todas las propied. de los productos
    const user = await User
        .findById(req.user._id)
        .populate('products');
    res.json(user.products);// Si lo q quiero es recupe. los productos del usuario logado pondriamos (. products) y si deseo usuarios con su relación de productos sería (user)
});


// Tener en cuenta para el proyecto el:      checkSchema(createProductValidator) y  checkValidationErrors
router.post('/',
    checkSchema(createProductValidator),
    checkValidationErrors,
    async (req, res) => {
        try {
            console.log('post',req.body);
            const product = await Product.create(req.body);
            res.status(201).json(product);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });


router.put('/:productId', async (req, res) => {
    try {
    const { productId } = req.params;
// Aq abajo nos devuelve el producto antiguo así q para ello se jaquea mediante ésto  { new: true }
    const producto = await Product.findByIdAndUpdate(productId, req.body, { new: true });
    res.json(producto);
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:productId', async (req, res) => {
    const { productId } = req.params;
    try {
       const productDel = await Product.findByIdAndDelete(productId);
       res.json(productDel);
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router; 