'use strict'

const { Error } = require('mongoose');
// Importar el modelo de projects
var Project = require('../models/project');
var fs = require('fs');
var path = require ('path');


//Variable controlador
var controller = {

    // controlador de métodos de la ruta test
    test: function(req, res){

            return res.status(200).send({
                message: "Página de prueba",
            });
    },
        // crear un método para guardar un proyecto
        saveProject: function(req,res){
        // Crear un objeto de proyecto
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

       
        project.save((err, projectStored) => {
            if (err) return res.status(500).send({message: 'Error al guardar el documento.'});
     
            if (!projectStored) return res.status(404).send({message: ' No se ha podido guardar'});
     
            return res.status(200).send({project: projectStored});
     
          });
        
        },

    getProject: function(req,res){
        var projectId = req.params.id;

        // En el caso de que id sea un parametro opcional (routes)
        if (projectId == null) return res.status(404).send({message: "El proyecto no está definido o no existe"})

        Project.findById(projectId, (err, project)=>{
            if(err) return res.status(500).send({message: "Error al devolver los datos"});
            if(!project) return res.status(404).send({message: "El proyecto no existe"});

            return res.status(200).send({
                project
            });

        });
    },

    getProjects : function(req,res){
        Project.find(/*{year:2020}*/)/*.sort('-year')*/.exec((err, projects)=>{
                if(err) return res.status(500).send({message: "Error al devolver los datos"});
                if(!projects) return res.status(404).send({ message: "No se encuentra proyecto"});

                return res.status(200).send({
                    projects
                });
                
            });
    },

    updateProject: function(req, res){
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update,{new:true},(err, projectUpdated)=>{
            if(err) return res.status(500).send({message: "No se han encontrado datos"});
            if(!projectUpdated) return res.status(404).send({message: "Error al actualizar"});

            return res.status(200).send({
                project: projectUpdated
            });
        });
    },

    deleteProject: function(req,res){
        var projectId = req.params.id;
        
        Project.findByIdAndRemove(projectId, (err, projectRemoved)=>{
        if(err) return res.status(500).send({message: "No se han encontrado datos que borrar"});
        if(!projectRemoved) return res.status(404).send({message: "Error al eliminar"});

        return res.status(200).send({
            project: projectRemoved
        });

    });
    },


    uploadImage: function(req,res){
        var projectId = req.params.id;
        var filename = "imagen no subida";

        if(req.file){
            var filePath = req.file.path;
            var fileSplit = filePath.split('\\');
            var filename = fileSplit[1];
            var extSplit = req.file.originalname.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'PNG' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                Project.findByIdAndUpdate(projectId, {image: filename}, {new:true}, (err, projectUpdated)=>{

                    if(err) return res.status(500).send({message: "El archivo no se ha subido"});
                    if(!projectUpdated) return res.status(404).send({message: "El proyecto no existe"});

                    return res.status(200).send({project: projectUpdated});
                });
            }else{
                // Si la extensión del archivo no es válida se borrará el archivo

                    fs.unlink(filePath, (err)=>{
                    return res.status(200).send({message: "La extensión no es válida"});
                });
                               
            }
        }else{
            // Si se ha subido que muestre la imagen
                return res.status(200).send({
                    message: filename
                });
        }
    },

    getImageFile: function(req, res){
		var image_file = req.params.image;
		var path_file = './uploads/'+image_file;

		fs.access(path_file, fs.constants.F_OK, (err) => {
			if(!err){
				return res.sendFile(path.resolve(path_file));
			}else{
				return res.status(200).send({
					message: "No existe la imagen..."
				});
			}
		});
	}

};

// Exportar controlador
module.exports = controller; 