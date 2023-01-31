import { useState, useRef } from 'react';
import { MapContainer } from 'react-leaflet';
import { spawn, Pool, Worker } from 'threads';
import GridLayer from './GridLayer';
import styles from '../../../styles/Leaflet.module.css';

interface RenderingSettings {
    iterations: number;
    exponent: number;
    tileSize: number;
    colorScheme?: number;
}

const Leaflet = () => {
    const [config, setConfig] = useState({
        iterations: 1000,
        exponent: 2,
        tileSize: 200
    });

    const workerRef = useRef(
        Pool(() => {
            return spawn(
                new Worker(
                    // @ts-ignore
                    new URL('../../wasm-worker/wasm-worker.js', import.meta.url)
                )
            );
        })
    );

    return (
        <MapContainer
            className={styles.leaflet}
            center={[0, 0]}
            zoom={4}
            preferCanvas={true}
            attributionControl={false}
            zoomControl={false}
            maxZoom={64}
            zoomAnimationThreshold={64}
        >
            <GridLayer workerRef={workerRef} config={config} />
        </MapContainer>
    );
};

export default Leaflet;
