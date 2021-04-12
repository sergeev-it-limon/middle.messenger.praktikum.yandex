const path = require('path');

class AuthController {
    getPage(_req, res, _next) {
        console.log('requested auth.html');
        res.sendFile(path.join(__dirname, '../../dist/auth/auth.html'));
    }
}

module.exports = {
    AuthController,
};
