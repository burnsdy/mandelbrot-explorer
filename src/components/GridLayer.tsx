import {
  createElementHook,
  createElementObject,
  useLeafletContext,
} from '@react-leaflet/core'
import L from 'leaflet'
import { useEffect } from 'react'
import { MandelbrotGridLayer } from '../mandelbrot-controller/mandelbrotGridLayer'
import { WorkerController } from '../mandelbrot-controller/workerController'

interface GridLayerProps { workerController: WorkerController }

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

const createGrid = (props: GridLayerProps, context) => {
  return createElementObject(new MandelbrotGridLayer(props.workerController), context);
};

const updateGrid = (instance, props: GridLayerProps, prevProps: GridLayerProps) => {
  // TODO
};

const useGridElement = createElementHook(createGrid, updateGrid);

const GridLayer = (props: GridLayerProps) => {
    const context = useLeafletContext();
    const gridRef = useGridElement(props, context);

    useEffect(() => {
      const container = context.layerContainer || context.map
      container.addLayer(gridRef.current.instance)

      return () => {
        container.removeLayer(gridRef.current.instance)
      }
    }, [])

    return null
};

export default GridLayer;
