const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer({
    webpack(config, { isServer, dev }) {
        config.experiments = {
            asyncWebAssembly: true,
            layers: true
        };

        // Note: this plugin causes hashes to be appended to the output chunk file names
        config.plugins.push(
            new WasmPackPlugin({
                crateDirectory: path.resolve(
                    __dirname,
                    './mandelbrot-generator'
                ),
                args: '--log-level warn'
            })
        );

        if (!dev && isServer) {
            config.output.webassemblyModuleFilename = 'chunks/[id].wasm';
            config.plugins.push(new WasmChunksFixPlugin());
        }

        return config;
    }
});

class WasmChunksFixPlugin {
    apply(compiler) {
        compiler.hooks.thisCompilation.tap(
            'WasmChunksFixPlugin',
            compilation => {
                compilation.hooks.processAssets.tap(
                    { name: 'WasmChunksFixPlugin' },
                    assets =>
                        Object.entries(assets).forEach(([pathname, source]) => {
                            if (!pathname.match(/\.wasm$/)) return;
                            compilation.deleteAsset(pathname);

                            const name = pathname.split('/')[1];
                            const info = compilation.assetsInfo.get(pathname);
                            compilation.emitAsset(name, source, info);
                        })
                );
            }
        );
    }
}
