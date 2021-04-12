const path = require('path');

class RegisterController {
    getPage(_req, res, _next) {
        console.log('requested register.html');
        res.sendFile(path.join(__dirname, '../../dist/register/register.html'));
    }
}

module.exports = {
    RegisterController,
};
