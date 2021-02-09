'use strict'


// Crear variable mongoose para conectar con la base de datos creada desde Robo3T
var mongoose = require('mongoose');
// Variable del puerto y variable app para usar en la creación del servidor.
var app = require('./app');
var port=3700;


// Usar mongoose para conectarse a la BD
mongoose.set('useFindAndModify', false);
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/portfolio',
                    {useNewUrlParser:true, useUnifiedTopology:true})
        .then(()=>{
                console.log("Conexión a la BD establecida");
// Creación del servidor
        app.listen(port, ()=>{
                console.log("Servidor corriendo en localhost:3700");
        });
        })
        .catch(err=> console.log(err));


