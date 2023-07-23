import { useEffect } from 'react';
import { spawn, Pool, Worker } from 'threads';
import L from 'leaflet';
import {
    createElementHook,
    createElementObject,
    useLeafletContext
} from '@react-leaflet/core';
import { LEAFLET_TILE_SIZE } from '../../utils/constants';

interface GridLayerProps {
    maxIterations: number;
    colorScheme: string[];
}

interface RenderingState extends GridLayerProps {
    workerPool: Pool<any>;
}

const MandelbrotGridLayer = L.GridLayer.extend({
    initialize: function ({
        workerPool,
        maxIterations,
        colorScheme
    }: RenderingState) {
        this.workerPool = workerPool;
        this.maxIterations = maxIterations;
        this.colorScheme = colorScheme;
    },

    createTile: function (coords: L.Coords, done: L.DoneCallback): HTMLElement {
        const tile = L.DomUtil.create('canvas', 'mandelbrot-tile');
        tile.width = 200;
        tile.height = 200;
        const canvasContext = tile.getContext('2d');
        if (
            !canvasContext ||
            !(canvasContext instanceof CanvasRenderingContext2D)
        ) {
            throw new Error('Failed to get 2D context');
        }
        const pixelData = this.workerPool.queue(async (getPixelData: any) => {
            return getPixelData({
                coords,
                maxIterations: this.maxIterations,
                colorScheme: this.colorScheme
            });
        });
        pixelData.then((data: any) => {
            const imageData = new ImageData(
                Uint8ClampedArray.from(data.pixels),
                LEAFLET_TILE_SIZE,
                LEAFLET_TILE_SIZE
            );
            canvasContext.putImageData(imageData, 0, 0);
            done(undefined, tile);
        });
        return tile;
    }
});

const createGrid = (renderingState: RenderingState, context: any) => {
    return createElementObject(
        // @ts-ignore
        new MandelbrotGridLayer(renderingState),
        context
    );
};

// const updateGrid = (
//     instance: any,
//     renderingState: RenderingState,
//     prevRenderingState: RenderingState
// ) => {};

const useGridElement = createElementHook(createGrid);
// const useGridElement = createElementHook(createGrid, updateGrid);

const GridLayer = ({ maxIterations, colorScheme }: GridLayerProps) => {
    const workerPool = Pool(() => {
        return spawn(
            new Worker(
                // @ts-ignore
                new URL('../../wasm-worker/wasm-worker.js', import.meta.url)
            )
        );
    });

    const renderingState = {
        maxIterations,
        colorScheme,
        workerPool
    };

    const context = useLeafletContext();
    const gridRef = useGridElement(renderingState, context);

    useEffect(() => {
        const container = context.layerContainer || context.map;
        container.addLayer(gridRef.current.instance);

        return () => {
            container.removeLayer(gridRef.current.instance);
        };
    }, []);

    return null;
};

export default GridLayer;
