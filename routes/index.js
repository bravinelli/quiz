var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//Definicio de rutas de quizes

//Esta ruta da acceso al listado completo de preguntas
router.get('/quizes', quizController.index);

// Esta rutas son las nuevas primitivas del interfaz rest
// la primera es equivalente a la question anterior pero más general
// para poder acceder una de 'n' preguntas diferentes
// la segunda es equivalente a la 'answer' anterior pero para consultar si la
// respuesta dada es correcta y corresponde a la pregunta 'n'

router.get('/quizes/:quizId(\\d+)',quizController.show);

router.get('/quizes/:quizId(\\d+)/answer',quizController.answer);

router.get('/author',function(req,res) {
  res.render('author');
});


module.exports = router;
