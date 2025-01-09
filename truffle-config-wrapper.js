// truffle-config-wrapper.js
import('path').then(({ resolve }) => {
    import(resolve(__dirname, 'truffle-config.js')).then((config) => {
      module.exports = config.default;
    });
  });
  