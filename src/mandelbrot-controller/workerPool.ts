import { pool } from 'workerpool';

export const workerPool = pool('../mandelbrot-worker/wasm.worker.ts');


// TODO
// Just initialize workerPool in MandelbrotLeaflet
// And pass in workerPool when initializing mandelbrotGridLayer
// Then use exec instead of postMessage within createTile
// And await the response instead of attaching the tileRetrievedHandler callback
// But logic used in event handler remains unchanged



// OLD NOTES
// Issue is that the "action" is coming from both createTile and workerPool
// workerPool wants to receive the callback function (tileRetrieveHandler)
// But createTile must be the one to trigger the callback

// Define and export tileRetrievedHandler
// Then set tileRetrievedHandler as callback for workerPool