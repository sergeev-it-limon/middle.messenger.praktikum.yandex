const path = require('path');

class AuthController {
    getPage(_req, res, _next) {
        res.sendFile(path.join(__dirname, '../../dist/auth/auth.html'));
    }
}

module.exports = {
    AuthController,
};
