import express from 'express';

import TodoController from './controllers/TodoController';
import UserController from './controllers/UserController';
import HomeController from './controllers/HomeController';
import passwordConfirmation from './middleware/passwordConfirmation';
import userAuthenticated from './middleware/userAuthenticated';
import updateUserProfile from './middleware/updateUserProfile';

const router = express.Router();
router.get('/home', HomeController.index);

router.post('/register', passwordConfirmation, UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.put('/user', userAuthenticated, updateUserProfile, UserController.put);

router.post('/forgot', UserController.forgot);

router.get('/todos', userAuthenticated, TodoController.index);
router.post('/todo', userAuthenticated, TodoController.store);
router.get('/todo/:id', userAuthenticated, TodoController.show);
router.put('/todo', userAuthenticated, TodoController.put);
router.put('/toggle-status', userAuthenticated, TodoController.toggle_status);
router.delete('/todo', userAuthenticated, TodoController.destroy);

export default router;
