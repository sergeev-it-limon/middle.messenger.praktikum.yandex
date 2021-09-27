const fs = require("fs");
const pug = require("pug");

const buildTemplate = (pugPath) => {
  const jsFunctionString = pug.compileFileClient(pugPath, {
    name: "template",
    compileDebug: false,
  });

  fnNormalized = jsFunctionString.replace(
    /function(?= template)/,
    "export function"
  );

  const componentName = pugPath.match(/.*(?=\.pug)/);

  fs.writeFileSync(`${componentName}.tmpl.js`, fnNormalized);
};

module.exports = {
  buildTemplate,
};
