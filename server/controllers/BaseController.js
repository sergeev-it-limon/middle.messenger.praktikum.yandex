const path = require("path");

class BaseController {
  getPage = (_req, res, _next) => {
    const pagePath = `../../dist/${this.name}.html`;
    res.sendFile(path.join(__dirname, pagePath));
  };
}

module.exports = BaseController;
