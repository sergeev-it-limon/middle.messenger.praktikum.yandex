const path = require('path');

class ProfileEditController {
    getPage(_req, res, _next) {
        res.sendFile(path.join(__dirname, '../../dist/profileEdit/profileEdit.html'));
    }
}

module.exports = {
    ProfileEditController,
};
