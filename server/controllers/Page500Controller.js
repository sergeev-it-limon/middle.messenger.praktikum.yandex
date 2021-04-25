const path = require('path');

class Page500Controller {
    getPage(_req, res, _next) {
        res.sendFile(path.join(__dirname, '../../dist/500/500.html'));
    }
}

module.exports = {
    Page500Controller,
};
