const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
const { resolve } = require('path');

module.exports = {
  webpack(config) {
    // Ensures that web workers can import scripts.
    config.output.publicPath = '/_next/';

    // From https://github.com/rustwasm/wasm-pack/issues/835#issuecomment-772591665
    config.experiments = {
      syncWebAssembly: true,
    };

    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/sync',
    });

    // From https://github.com/wasm-tool/wasm-pack-plugin
    config.plugins.push(
      new WasmPackPlugin({
        crateDirectory: resolve('./mandelbrot-generator'),
        args: '--log-level warn',
      })
    );

    return config;
  },
};
