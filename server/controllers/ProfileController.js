const path = require('path');

class ProfileController {
    getPage(_req, res, _next) {
        res.sendFile(path.join(__dirname, '../../dist/profile/profile.html'));
    }
}

module.exports = {
    ProfileController,
};
