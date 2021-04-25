const path = require('path');

class HomeController {
    getPage(_req, res, _next) {
        res.sendFile(path.join(__dirname, '../../dist/home/home.html'));
    }
}

module.exports = {
    HomeController,
};
