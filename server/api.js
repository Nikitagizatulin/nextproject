const express = require('express');

// import TodoController from './controllers/TodoController';
const UserController = require('./controllers/UserController');
// import passwordConfirmation from './middlewares/passwordConfirmation';

const router = express.Router();

router.get('/', UserController.index);
// router.post('/register', passwordConfirmation, UserController.register);
// router.post('/login', UserController.login);

// router.post('/forgot', UserController.forgot);

// router.get('/todos', TodoController.index);
// router.post('/todo', TodoController.store);
// router.get('/todo/:id', TodoController.show);
// router.put('/todo/:id', TodoController.put);
// router.delete('/todo/:id', TodoController.destroy);

module.exports = router;
