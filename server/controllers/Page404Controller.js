const path = require('path');

class Page404Controller {
    getPage(_req, res, _next) {
        res.sendFile(path.join(__dirname, '../../dist/404/404.html'));
    }
}

module.exports = {
    Page404Controller,
};
