const withTM = require('next-transpile-modules')([
  '@sonic-web-dev/core',
  '@sonic-web-dev/form',
  '@sonic-web-dev/award',
  '@sonic-web-dev/icon',
  '@sonic-web-dev/select',
  '@sonic-web-dev/date',
]); // pass the modules you would like to see transpiled

const envVars = require('./envs-vars/env-local.json');

module.exports = withTM({
  // assetPrefix: './', use this when running th builds locally
  env: { ...envVars },
  images: {
    loader: 'imgix',
    path: '',
  },

  webpack5: false

});
