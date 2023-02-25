const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);// url de config. de mi base datos, en mi fichero de entorno
