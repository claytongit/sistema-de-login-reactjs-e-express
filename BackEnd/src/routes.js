const express = require('express');

const routes = express.Router();

const UserController = require('./controllers/userController');
const AuthController = require('./controllers/authController');

const ProjectController = require('./controllers/projectController');
const AuthMiddleware = require('./middlewares/auth');

routes.post('/register', UserController.store);
routes.post('/auth', AuthController.store);

routes.get('/users', AuthMiddleware, ProjectController.index);

module.exports = routes;