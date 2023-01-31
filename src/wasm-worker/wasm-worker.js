import { expose } from 'threads/worker';

expose(async function getTile({ coords, maxIterations, exponent, tileSize }) {
    const wasm = await import('../../mandelbrot-generator/pkg');
    wasm.init();
    const pixels = wasm.get_tile(
        coords.x,
        coords.y,
        coords.z,
        maxIterations,
        exponent,
        tileSize
    );
    // console.log({
    //     coords: `${coords.x},${coords.y},${coords.z}`
    // });
    return {
        pixels
    };
});
