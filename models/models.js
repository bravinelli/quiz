var path= require ('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar Model ORM
var Sequelize = require ('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }
);



// Importamos la definicio de la tabla Quiz en Quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; // exportamos la definicion de la tabla quiz

// sequelize.sync() crea e  inicializa la tabla de preguntas en DB
sequelize.sync().then(function(){
  //then(...) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function(count){
    if (count===0) {  // la tabla se inicializa si esta vacia
      Quiz.create({pregunta:'Capital de Italia',
                    respuesta: 'Roma'
                  });
      Quiz.create({pregunta:'Capital de Portugal',
                    respuesta: 'Lisboa'
                    })
      .then(function(){console.log('Base de datos inicializada')});
    };
  });
});
