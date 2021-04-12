const path = require('path');

class ProfileController {
    getPage(_req, res, _next) {
        console.log('requested profile.html');
        res.sendFile(path.join(__dirname, '../../dist/profile/profile.html'));
    }
}

module.exports = {
    ProfileController,
};
