const path = require('path');

class ChangePassword {
    getPage(_req, res, _next) {
        res.sendFile(path.join(__dirname, '../../dist/changePassword/changePassword.html'));
    }
}

module.exports = {
    ChangePassword,
};
