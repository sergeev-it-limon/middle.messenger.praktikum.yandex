const path = require('path');

class Page404Controller {
    getPage(_req, res, _next) {
        console.log('requested 404.html');
        res.sendFile(path.join(__dirname, '../../dist/404/404.html'));
    }
}

module.exports = {
    Page404Controller,
};
