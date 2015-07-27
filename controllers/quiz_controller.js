var models = require('../models/models.js');

//Autoload - factoriza el codigo si ruta inclye : quizId
exports.load = function (req,res,next,quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz){
      req.quiz = quiz;
      next();
    } else {next(new Error ('No existe quizId='+quizId));}
  }
).catch(function(error){next(error);});
};

// GET /QUIZES

exports.index = function(req,res){

// Adapto la cadena de busqueda generando una variable con el patron a buscar
  var patron = "%"+(req.query.search || "")+"%";
  patron= patron.replace(/\s+/g,"%");
// Esto fue preciso para la depuracion correcta de la app
  console.log ("valor de patron: "+patron);
  console.log ("valor de query.search: "+req.query.search);

  models.Quiz.findAll({where: ["pregunta like ?", patron], order:"pregunta"}).then(function(quizes){
    res.render('quizes/index',{quizes : quizes});
  }).catch(function(error){next(error);})
};

// GET /QUIZES/:id

exports.show = function(req,res) {
    res.render('quizes/show',{quiz : req.quiz});
};

//GET /quizes/:id/answer
exports.answer = function(req,res){
  var resultado = 'Incorrecto';
      if (req.query.respuesta === req.quiz.respuesta){
        resultado='Correcto';
      }
      res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado});
};
