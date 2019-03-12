var mongoose = require('mongoose');
var csv = require('csvtojson');
var schema = require('./schema');

mongoose.connect('mongodb://localhost:27017/Alumnos');
var Alumno = mongoose.model('Alumnos', schema, 'alumnos');

    csv().fromFile('./alumnos.csv').then((datos)=>{ 
        datos.forEach(i=>{
        	if(i.grade>2){
        		var alumno = new Alumno(i);
        		alumno.save(error=>{
    				if(error){
    					console.log(error);
                        process.exit(1);
    				}
    				console.log("---------Alumno "+i.name+" guardado---------");
    			});
        	}
        })
    });
