import { useState, useEffect, useRef } from 'react'
import L from "leaflet";
import { pool } from 'workerpool';
import { MandelbrotGridLayer } from "../mandelbrot-controller/mandelbrotGridLayer";
import { WorkerController } from '../mandelbrot-controller/workerController';
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import styles from '../../styles/Leaflet.module.css';
import GridLayer from './GridLayer';

const MandelbrotLeaflet = () => {

// Note that only wasmWorker is needed, will not use tsWorker
//   const wasmWorkerRef = useRef<Worker | null>();
//   const tsWorkerRef = useRef<Worker | null>();
//   const [wasmWorkerMessages, setWasmWorkerMessages] = useState<String[]>([]);
//   const [tsWorkerMessages, setTsWorkerMessages] = useState<String[]>([]);

//   useEffect(() => {
//     // From https://webpack.js.org/guides/web-workers/#syntax
//     wasmWorkerRef.current = new Worker(
//       new URL('../mandelbrot-worker/wasm.worker.ts', import.meta.url)
//     );
//     tsWorkerRef.current = new Worker(
//       new URL('../mandelbrot-worker/ts.worker.ts', import.meta.url)
//     );
//     wasmWorkerRef.current.addEventListener('message', (evt) => {
//       console.log('Message from wasm worker:', evt.data);
//       const newMessages = [...wasmWorkerMessages, evt.data];
//       setWasmWorkerMessages(newMessages);
//     });
//     tsWorkerRef.current.addEventListener('message', (evt) => {
//       console.log('Message from TS worker:', evt.data);
//       const newMessages = [...tsWorkerMessages, evt.data];
//       setTsWorkerMessages(newMessages);
//     });
//     wasmWorkerRef.current.postMessage({ type: 'start' });
//     tsWorkerRef.current.postMessage({ type: 'start' });
//   }, []);


    // const [config, setConfig] = useState({
    //     iterations: 500,
    //     exponent: 2,
    //     numWorkers: Math.min(navigator.hardwareConcurrency || 4, 64),
    //     tileSize: 200
    // });

    // // TODO: update leafletMap options -> set maxZoom
    // const leafletMap = L.map('mandelbrotLeaflet', { attributionControl: false, zoomControl: false, maxZoom: 32, zoomAnimationThreshold: 32 }).setView([0, 0], 2);
    // let mandelbrotGridLayer: MandelbrotGridLayer;
    // const workerController = new WorkerController(config);

    // const resetGridLayer = (leafletMap: L.Map) => {
    //     if (mandelbrotGridLayer) {
    //         leafletMap.removeLayer(mandelbrotGridLayer);
    //     }
    //     mandelbrotGridLayer = new MandelbrotGridLayer(workerController);
    // };

    // const initializeMap = async () => {
    //     await workerController.resetWorkers();
    //     // const output = workerPool.exec('someFunc');
    //     resetGridLayer(leafletMap);
    // };
    // const refreshMap = async () => {
    //     await workerController.resetWorkers();
    //     leafletMap.setView(leafletMap.getCenter(), leafletMap.getZoom());
    // };

    // useEffect(() => {
    //     console.log('test1');
    //     initializeMap();
    //     console.log('test2');
    // }, [])



    const [config, setConfig] = useState({
        iterations: 500,
        exponent: 2,
        numWorkers: Math.min(navigator.hardwareConcurrency || 4, 64),
        tileSize: 200
    });
    // const workerPoolRef = useRef(pool());
    const workerController = new WorkerController(config);

    return (
        // <div id="mandelbrotLeaflet"></div>
        <MapContainer
            className={styles.leaflet}
            center={[0,0]}
            zoom={2}
            attributionControl={false}
            zoomControl={false}
            maxZoom={32}
            zoomAnimationThreshold={32}
        >
            <GridLayer workerController={workerController} />
        </MapContainer>
    );
};

export default MandelbrotLeaflet;
