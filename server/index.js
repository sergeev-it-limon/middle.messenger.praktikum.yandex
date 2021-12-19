const express = require("express");
const { IndexController } = require("./controllers/IndexController");
const {
	StaticFilesController,
} = require("./controllers/StaticFilesController");

const indexController = new IndexController();
const staticFilesController = new StaticFilesController();

const app = express();

app.get("*/dist/:fileName", staticFilesController.getFile);
app.get(/^((?<!\/dist\/).)*/, indexController.getPage);

app.listen(3000, function () {
	console.log("express server started on localhost:3000");
});
