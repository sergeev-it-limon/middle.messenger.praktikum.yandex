const path = require("path");

class StaticFilesController {
	getFile(req, res, _next) {
		res.sendFile(path.join(__dirname, `../../dist/${req.params.fileName}`));
	}
}

module.exports = {
	StaticFilesController,
};
