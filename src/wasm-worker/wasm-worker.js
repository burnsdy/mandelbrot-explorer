import { expose } from 'threads/worker';

expose(async function getPixelData({ coords, iterations, colorScheme }) {
    const wasm = await import('../../mandelbrot-generator/pkg');
    const pixels = wasm.get_pixel_data(
        coords.x,
        coords.y,
        coords.z,
        iterations,
        ...colorScheme
    );
    return {
        pixels
    };
});
