'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors')
var app = express();

// Archivos de ruta
var project_routes = require('./routes/project');

// Middlewares

// usar cors como middleware antes de configurarlo.
app.use(cors());
app.use(bodyParser.json({limit: '10mb'}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
app.use('/api', project_routes);


// CORS

// Configurar cabeceras y cors
 app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

// Rutas

app.get('/test', (req, res)=>(
    res.status(200).send({
        message: "Hola mundo desde mi API de NODEJS"
    })
));


// Exportar modulo

module.exports= app;