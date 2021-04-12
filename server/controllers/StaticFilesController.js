const path = require('path');

class StaticFilesController {
    getFile(req, res, _next) {
        console.log(`requested ${req.params.fileName}`);
        res.sendFile(path.join(__dirname, `../../dist/${req.params.fileName}`));
    }
}

module.exports = {
    StaticFilesController,
};
