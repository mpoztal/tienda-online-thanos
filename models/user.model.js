const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {        //Si quiero controlar la logitud del username x ejm. ver ésto tamb controlar los mensajes..
        type: String,
        required: [true, 'El campo es requerido'],
        minLength: [3, 'El campo username debe tener como mínimo 3 caracteres'],
        maxLength: [10, 'El campo username debe tener como máximo 10 caracteres'],
    },       
    email: {
        type: String,
        match: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: String,
    active: Boolean,
    role: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'product' }]
});




module.exports = mongoose.model('user', userSchema); 

