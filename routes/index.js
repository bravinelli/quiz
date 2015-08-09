var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);

//Definicion de rutas de sesion

router.get('/login', sessionController.new); //Formulario de login
router.post('/login', sessionController.create); //crear session
router.get('/logout', sessionController.destroy); //destruir sesion

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

router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',sessionController.loginRequired, quizController.destroy);

router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

router.get('/author',function(req,res) {
  res.render('author',  {  errors: [] });
});


module.exports = router;
