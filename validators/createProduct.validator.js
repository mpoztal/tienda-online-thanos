// 1º probaremos q el name venga definido con la herramienta  express-validator q hemos instalado
module.exports = {
    name: {
        exists: true,
        errorMessage: 'El campo nombre es requerido',
        isLength: {
            options: { min: 3 },
            errorMessage: 'El campo nombre debe tener tamaño mínimo de 3'
        }
    },
    available: {
        isBoolean: true,
        errorMessage: 'El campo disponibilidad debe ser true/false',
        custom: {
            options: (value) => value,
            errorMessage: 'Todas las inserciones deben estar disponibles'
        }
    }
}