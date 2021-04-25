const path = require('path');

class RegisterController {
    getPage(_req, res, _next) {
        res.sendFile(path.join(__dirname, '../../dist/register/register.html'));
    }
}

module.exports = {
    RegisterController,
};
