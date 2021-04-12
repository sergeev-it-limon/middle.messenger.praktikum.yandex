const path = require('path');

class Page500Controller {
    getPage(_req, res, _next) {
        console.log('requested 500.html');
        res.sendFile(path.join(__dirname, '../../dist/500/500.html'));
    }
}

module.exports = {
    Page500Controller,
};
