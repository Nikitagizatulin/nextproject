import express from 'express';

import todoController from './controllers/todoController';
import userController from './controllers/userController';
import homeController from './controllers/homeController';
import passwordConfirmation from './middleware/passwordConfirmation';
import userAuthenticated from './middleware/userAuthenticated';
import updateUserProfile from './middleware/updateUserProfile';

const router = express.Router();
router.get('/home', homeController.index);

router.post('/register', passwordConfirmation, userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.put('/user', userAuthenticated, updateUserProfile, userController.put);

router.post('/forgot', userController.forgot);

router.get('/todos', userAuthenticated, todoController.index);
router.post('/todo', userAuthenticated, todoController.store);
router.get('/todo/:id', userAuthenticated, todoController.show);
router.put('/todo', userAuthenticated, todoController.put);
router.put('/toggle-status', userAuthenticated, todoController.toggle_status);
router.delete('/todo', userAuthenticated, todoController.destroy);

export default router;
