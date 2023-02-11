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
        iterations: 200,
        exponent: 2,
        tileSize: 200
    });

    // Height of 733px is highest possible amount to avoid rendering blank pixels
    // TODO: increase height after blank pixel defect is fixed
    const smallScreen = window.innerHeight < 733 || window.innerWidth < 870;

    // Move workerRef into GridLayer
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
            center={[-46, 10]}
            // use zoom of 3 for lg width
            zoom={smallScreen ? 2 : 3}
            preferCanvas={true}
            attributionControl={false}
            zoomControl={false}
            doubleClickZoom={undefined}
            maxZoom={64}
            zoomAnimationThreshold={64}
        >
            <GridLayer workerRef={workerRef} config={config} />
        </MapContainer>
    );
};

export default Leaflet;
