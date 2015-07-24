var path= require ('path');

// Cargar Model ORM
var Sequelize = require ('sequelize');

//Usar la BBDD SQLite
var sequelize = new Sequelize (null,null,null,
                      {dialect : "sqlite", storage: "quiz.sqlite"}
                  );

// Importamos la definicio de la tabla Quiz en Quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; // exportamos la definicion de la tabla quiz

// sequelize.sync() crea e  inicializa la tabla de preguntas en DB
sequelize.sync().then(function(){
  //sucess(...) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function(count){
    if (count===0) {  // la tabla se inicializa si esta vacia
      Quiz.create({pregunta:'Capital de Italia',
                    respuesta: 'Roma'
                  }).then(function(){console.log('Base de datos inicializada')});
    };
  });
});
