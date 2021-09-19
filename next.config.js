const withTM = require("next-transpile-modules")([
  "@sonic-web-dev/core",
  "@sonic-web-dev/form",
  "@sonic-web-dev/award",
  "@sonic-web-dev/icon",
  "@sonic-web-dev/select",
  "@sonic-web-dev/date",
]);

// const ENV = process.env.ENV || "dev";
// const pathToConfigs = path.join(__dirname, `/configs/${ENV}.config.js`);

// module.exports = require(pathToConfigs);
module.exports = withTM();
