import express from 'express';

import TodoController from './controllers/TodoController';
import UserController from './controllers/UserController';
import passwordConfirmation from './middlewares/passwordConfirmation';
import userAthenticated from './middlewares/userAthenticated';
import updateUserProfile from './middlewares/updateUserProfile';

const router = express.Router();

router.post('/register', passwordConfirmation, UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.put('/user', userAthenticated, updateUserProfile, UserController.put);

router.post('/forgot', UserController.forgot);

router.get('/todos', userAthenticated, TodoController.index);
router.post('/todo', userAthenticated, TodoController.store);
router.get('/todo/:id', userAthenticated, TodoController.show);
router.put('/todo', userAthenticated, TodoController.put);
router.put('/toggle-status', userAthenticated, TodoController.toggle_status);
router.delete('/todo', userAthenticated, TodoController.destroy);

export default router;
