'use strict'

// Usar express y una variable que llama al fichero de controladores
var express = require('express');
// Importar el controlador
const { saveProject } = require('../controllers/project');
var ProjectController = require('../controllers/project');

// Crear la variable router
var router = express.Router();

// variable crypto y multer para usar multer, subir imagenes a /uploads
var crypto = require('crypto')
var multer = require('multer');
const storage = multer.diskStorage({

  destination(req, file, cb) {
    cb(null, './uploads');
  },

  filename(req, file = {}, cb) {
    const { originalname } = file;
    const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
    // cb(null, `${file.fieldname}__${Date.now()}${fileExtension}`);
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + fileExtension);
    });
  },

});

var mul_upload = multer({dest: './uploads',storage});

// variable middleware para multer

var mul_upload = multer( { dest: './uploads', storage});

// Conectar la ruta con el controllador
router.get('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
// project/:id? si queremos que id sea opcional y en ese caso ir al controlador*
router.get('/projects', ProjectController.getProjects);
router.put('/update-project/:id', ProjectController.updateProject);
router.delete('/delete-project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', [mul_upload.single('image')], ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);

// exportar las rutas
module.exports = router;