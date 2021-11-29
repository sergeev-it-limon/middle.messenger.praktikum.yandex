const glob = require("glob");
const fs = require("fs");
const { buildTemplate } = require("./buildTemplate");

const MAIN_PATH = process.argv[2];

const buildAll = (mainPath) => {
  const files = glob.sync(mainPath + "/**/*.pug");

  for (file of files) {
    buildTemplate(file);
  }
};

buildAll(MAIN_PATH);

fs.watch(MAIN_PATH, { recursive: true }, (eventType, fileName) => {
  if (eventType !== "change") return;

  if (fileName == null) {
    buildAll(MAIN_PATH);
    return;
  }

  const isNotPug = !/.*\.pug$/.test(fileName);
  if (isNotPug) return;

  const fullPath = `${MAIN_PATH}\\${fileName}`;
  buildTemplate(fullPath);
});
