import L from "leaflet";
// TODO: remove fast-json-stringify from node_modules
import fastJson from 'fast-json-stringify';
import { MandelbrotWorker, WorkerController } from "./workerController";

// export const stringify = fastJson({
//   title: 'Coords Schema',
//   type: 'object',
//   properties: { x: { type: 'integer' }, y: { type: 'integer' }, z: { type: 'integer' }, }
// });

interface MessageFromWorker { data: { coords: string; pixels: Array<number> } }

export const MandelbrotGridLayer = L.GridLayer.extend({
    initialize: function (workerController: WorkerController) {
        // console.log('initialize');
        // console.log(workerController);
        this.workerController = workerController;
    },

    createTile: function (coords: L.Coords, done: L.DoneCallback): HTMLElement {
        const tile = L.DomUtil.create('canvas', 'mandelbrot-tile');
        const canvasContext = tile.getContext('2d');
        if (!canvasContext || !(canvasContext instanceof CanvasRenderingContext2D)) {
            throw new Error('Failed to get 2D context');
        }
        tile.width = 200;
        tile.height = 200;
        // TODO: replace coordsString with some other id/hash to identify associated worker
        const coordsString = `${coords.x},${coords.y},${coords.z}`;
        const selectedWorker = this.workerController.workers.filter((w: MandelbrotWorker) => w.ready)
            .reduce((leastActive: MandelbrotWorker, worker: MandelbrotWorker) => (
                worker.tasks < leastActive.tasks ? worker : leastActive
            ),
            this.workerController.workers[0]);
        // console.log('selectedWorker:');
        // console.log(selectedWorker);
        selectedWorker.tasks += 1;
        // Note: can use the same technique of coordsString as an id for workerpool (specify as param)
        const tileRetrievedHandler = ({ data }: MessageFromWorker) => {
            if (data.coords === coordsString) {
                selectedWorker.removeEventListener("message", tileRetrievedHandler);
                selectedWorker.tasks = Math.max(selectedWorker.tasks - 1, 0);
                const imageData = new ImageData(Uint8ClampedArray.from(data.pixels), this.workerController.config.tileSize, this.workerController.config.tileSize);
                canvasContext.putImageData(imageData, 0, 0);
                done(undefined, tile);
            }
        };
        selectedWorker.addEventListener("message", tileRetrievedHandler);
        selectedWorker.postMessage({
            coords,
            maxIterations: this.workerController.config.iterations,
            exponent: this.workerController.config.exponent,
            tileSize: this.workerController.config.tileSize
        });
        return tile;
    }
});
