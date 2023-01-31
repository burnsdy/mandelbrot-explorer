import { useEffect, MutableRefObject } from 'react';
import L from 'leaflet';
import {
    createElementHook,
    createElementObject,
    useLeafletContext
} from '@react-leaflet/core';

interface GridLayerProps {
    workerRef: MutableRefObject<any>;
    config: any;
}

const MandelbrotGridLayer = L.GridLayer.extend({
    initialize: function ({ workerRef, config }: GridLayerProps) {
        this.workerRef = workerRef;
        this.config = config;
    },

    createTile: function (coords: L.Coords, done: L.DoneCallback): HTMLElement {
        const tile = L.DomUtil.create('canvas', 'mandelbrot-tile');
        const canvasContext = tile.getContext('2d');
        if (
            !canvasContext ||
            !(canvasContext instanceof CanvasRenderingContext2D)
        ) {
            throw new Error('Failed to get 2D context');
        }
        tile.width = 200;
        tile.height = 200;
        const pixelData = this.workerRef.current.queue(
            async (getPixelData: any) => {
                return getPixelData({
                    coords,
                    maxIterations: this.config.iterations,
                    exponent: this.config.exponent,
                    tileSize: this.config.tileSize
                });
            }
        );
        pixelData.then((data: any) => {
            // console.log(data);
            const imageData = new ImageData(
                Uint8ClampedArray.from(data.pixels),
                this.config.tileSize,
                this.config.tileSize
            );
            canvasContext.putImageData(imageData, 0, 0);
            done(undefined, tile);
        });
        return tile;
    }
});

// For testing purposes
const RedGrid = L.GridLayer.extend({
    createTile: (coords: L.Coords, done: L.DoneCallback) => {
        var tile = document.createElement('div');
        tile.innerHTML = [coords.x, coords.y, coords.z].join(', ');
        tile.style.outline = '1px solid red';
        setTimeout(function () {
            done(undefined, tile);
        }, 500 + Math.random() * 1500);
        return tile;
    }
});

const createGrid = (props: GridLayerProps, context: any) => {
    // @ts-ignore
    return createElementObject(new MandelbrotGridLayer(props), context);
    // return createElementObject(new RedGrid(), context);
};

const updateGrid = (
    instance: any,
    props: GridLayerProps,
    prevProps: GridLayerProps
) => {
    // TODO
};

const useGridElement = createElementHook(createGrid, updateGrid);

const GridLayer = (props: GridLayerProps) => {
    const context = useLeafletContext();
    const gridRef = useGridElement(props, context);

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
