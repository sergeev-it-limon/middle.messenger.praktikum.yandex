const path = require('path');

class ChangePassword {
    getPage(_req, res, _next) {
        console.log('requested changePassword.html');
        res.sendFile(path.join(__dirname, '../../dist/changePassword/changePassword.html'));
    }
}

module.exports = {
    ChangePassword,
};
