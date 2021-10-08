const withTM = require("next-transpile-modules")([
  "@sonic-web-dev/core",
  "@sonic-web-dev/form",
  "@sonic-web-dev/award",
  "@sonic-web-dev/icon",
  "@sonic-web-dev/select",
  "@sonic-web-dev/date",
]);

module.exports = withTM({
  rewrites() {
    return [
      {
        source: "/graphql",
        destination: "http://localhost:4000/graphql",
      },
    ];
  },
});
