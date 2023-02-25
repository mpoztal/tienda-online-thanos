const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


const User = require('../models/user.model');

const checkValidationErrors = (req, res, next) => {
    // Comprobar los errores de la validación
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.mapped());
    }
    next();

};

const checkToken = async (req, res, next) => {
    // COMPROBACIONES  
    //Está el token en la cabecera d autorización??
    if(!req.headers['authorization']){
        return res.status(401).json({ error: 'Debes incluir el Token de autenticación'});
    }

    const token = req.headers['authorization'];

    // Es correcto el token??
    let payload;
    try {
        payload = jwt.verify(token, process.env.SECRET_KEY);

    } catch (err) {
        return res.status(401).json({ error: 'El Token es incorrecto' });
    }

    //Recupero el usuario a partir del token
    //Si pasamos a través del checkToken, tenemos disponible en req.user los datos del usuario logado.

    const user = await User.findById(payload.user_id);
    req.user = user;

    next();
}

module.exports = { checkValidationErrors, checkToken };
















