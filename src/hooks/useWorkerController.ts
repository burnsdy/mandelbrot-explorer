// use workerpool instead of MandelbrotWorker

import { useRef } from 'react';
import { pool } from 'workerpool';
import { RenderingSettings } from "./renderingSettings";

function add(a: number, b: number) {
  return a + b;
}

export const useWorkerController = () => {
    const poolRef = useRef(pool());
    // offload a function to a worker
    poolRef.current
        .exec(add, [2, 4])
        .then(function (result) {
            console.log(result); // will output 6
        })
        .catch(function (err) {
            console.error(err);
        });
    return poolRef;
};

// export class MandelbrotWorker extends Worker {
//     tasks: number = 0;
//     ready: boolean = true;
// };

// export class WorkerController {
//     workers: Array<MandelbrotWorker> = [];
//     config: RenderingSettings;

//     constructor(config: RenderingSettings) {
//         this.config = config;
//         this.resetWorkers();
//         // probably don't need to have config as instance field
//         // just set workers here, then use .forEach.map below
//     };

//     // break this method into startWorkers and terminateWorkers
//     async resetWorkers() {
//         this.workers.forEach((w) => w.terminate());
//         this.workers = [...Array(this.config.numWorkers)].map(() => {
//             const w = new MandelbrotWorker('../mandelbrot-worker/worker.js');
//             const onReady = (e: MessageEvent) => {
//                 if (e.data.ready) {
//                     w.ready = true;
//                     w.removeEventListener('message', onReady);
//                 }
//             };
//             w.addEventListener('message', onReady);
//             console.log(w);
//             return w;
//         });
//         // determine some better way to wait for workers to be ready
//         while (!this.workers.every(w => w.ready)) await new Promise(resolve => setTimeout(resolve, 300));
//     }
// };
