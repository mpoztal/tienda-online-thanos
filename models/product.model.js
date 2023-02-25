// Aquí vamos a definir nuestro esquema, qué campos tiene...etc
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    department: String,
    available: Boolean,
    created_at: Date
});

module.exports = mongoose.model('product', productSchema);    //1º parametro('product') Todo lo q hay dentro 
//de esta colección en DB va a tener ésta estructura (productSchema)