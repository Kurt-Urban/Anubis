const withTM = require('next-transpile-modules')([
  '@sonic-web-dev/core',
  '@sonic-web-dev/form',
  '@sonic-web-dev/award',
  '@sonic-web-dev/icon',
  '@sonic-web-dev/select',
  '@sonic-web-dev/date',
]); // pass the modules you would like to see transpiled

module.exports = withTM({
  images: {
    loader: 'imgix',
    path: '',
  },
  future: {
    webpack5: true,
  },
});
