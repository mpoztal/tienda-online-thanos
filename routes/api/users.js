const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { checkToken } = require('../../helpers/middlewares');
const { createToken } = require('../../helpers/utils');

const User = require('../../models/user.model');

router.get('/profile', checkToken, async (req, res) => {// Hemos sacado el usuario logado con sus productos
    const user = await User
        .findById(req.user._id)
        .populate('products');
    res.json(user);    
});


router.post('/register', async (req, res) => {
    
    try { 
        
        req.body.password = bcrypt.hashSync(req.body.password); //para encriptar
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        console.log(err.errors);
        res.json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    // comprobar si, exixte email en DB
    const { email, password } = req.body;
    try {
         const user = await User.findOne({ email: email });// Busco el usuario x email,
         if (!user) {
             return res.status(401).json({error: 'Error en email y/o contraseña'});
         }

         // Si ya tengo el usuario, comprobaremos si ¿coinciden las password?
         const iguales = bcrypt.compareSync(password, user.password);
         if (!iguales) {
             return res.status(401).json({error: 'Error en email y/o contraseña'});       
         }
         res.json({ 
            success: 'Login correcto',
            token: createToken(user)
         });
    
    } catch (err) {
        res.json({ error: err.message });
    }

});



module.exports = router;