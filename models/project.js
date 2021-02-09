// Creación del modelo Project.js que estará relacionada con las colecciones projects de mongodb

// Importar mongoose para usarlo
var mongoose = require ('mongoose');
// Cargar el modelo Schema con mongoose
var Schema = mongoose.Schema;
// Crear el modelo de Project
var ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String, 
    image: String
});

// Exportar el modelo

module.exports = mongoose.model('Project', ProjectSchema);
// projects --> Guarda los documentos en la coleccion