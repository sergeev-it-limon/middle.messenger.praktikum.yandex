const path = require('path');

class HomeController {
    getPage(_req, res, _next) {
        console.log('requested home.html');
        res.sendFile(path.join(__dirname, '../../dist/home/home.html'));
    }
}

module.exports = {
    HomeController,
};
