const express = require('express');

const { HomeController } = require('./controllers/HomeController');
const { AuthController } = require('./controllers/AuthController');
const { SelectedChatController } = require('./controllers/SelectedChatController');
const { StaticFilesController } = require('./controllers/StaticFilesController');
const { RegisterController } = require('./controllers/RegisterController');
const { ProfileController } = require('./controllers/ProfileController');
const { ProfileEditController } = require('./controllers/ProfileEditController');
const { ChangePassword } = require('./controllers/ChangePassword');
const { Page500Controller } = require('./controllers/Page500Controller');
const { Page404Controller } = require('./controllers/Page404Controller');

const homeController = new HomeController();
const authController = new AuthController();
const selectedChatController = new SelectedChatController();
const staticFilesController = new StaticFilesController();
const registerController = new RegisterController();
const profileController = new ProfileController();
const profileEditController = new ProfileEditController();
const changePassword = new ChangePassword();
const page500Controller = new Page500Controller();
const page404Controller = new Page404Controller();

const app = express();

app.get('/', authController.getPage);
app.get('/home', homeController.getPage);
app.get('/selectedChat', selectedChatController.getPage);
app.get('/auth', authController.getPage);
app.get('/register', registerController.getPage);
app.get('/:fileName', staticFilesController.getFile);
app.get('/profile', profileController.getPage);
app.get('/profileEdit', profileEditController.getPage);
app.get('/changePassword', changePassword.getPage);
app.get('/500', page500Controller.getPage);
app.get('/404', page404Controller.getPage);

app.listen(3000, function () {
    console.log('express server started on localhost:3000');
});
