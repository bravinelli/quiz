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
    res.render('quizes/index',{quizes : quizes, errors: []});
  }).catch(function(error){next(error);})
};

// GET /QUIZES/:id

exports.show = function(req,res) {
    res.render('quizes/show',{quiz : req.quiz, errors: []});
};

//GET /quizes/:id/answer
exports.answer = function(req,res){
  var resultado = 'Incorrecto';
      if (req.query.respuesta === req.quiz.respuesta){
        resultado='Correcto';
      }
      res.render('quizes/answer',{quiz: req.quiz, respuesta: resultado, errors: []});
};

// GET /quizes/new
exports.new=function(req,res){
    var quiz=models.Quiz.build(//crea objeto quiz
        {pregunta:"Pregunta",respuesta:"Respuesta",tema:"Tema"}
    );
    res.render('quizes/new', {quiz:quiz,errors:[]});

};
exports.create=function(req,res){
    var quiz=models.Quiz.build(req.body.quiz);
    //console.log (quiz);
    var errors = quiz.validate();//ya qe el objeto errors no tiene then(
    if (errors)
    {
    var i=0; var errores=new Array();//se convierte en [] con la propiedad message por compatibilida con layout
    for (var prop in errors) errores[i++]={message: errors[prop]};
    res.render('quizes/new', {quiz: quiz, errors: errores});
  } else {
quiz // save: guarda en DB campos pregunta y respuesta de quiz
.save({fields: ["pregunta", "respuesta"]})
.then( function(){ res.redirect('/quizes')}) ;
}
};
