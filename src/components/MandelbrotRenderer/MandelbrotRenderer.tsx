import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { Loader } from '@mantine/core';
import {
    selectColorScheme,
    selectIterations
} from '../../store/renderingSettingsSlice';

const MandelbrotRenderer = () => {
    // Import leaflet component dynamically to disable SSR
    const DynamicLeaflet = dynamic(() => import('./Leaflet'), {
        ssr: false
    });

    const iterations = useSelector(selectIterations);
    // TODO: remove these constants
    const exponent = 2;
    const tileSize = 200;
    const config = {
        iterations,
        exponent,
        tileSize
    };
    const colorScheme = useSelector(selectColorScheme);

    return (
        <Suspense fallback={<Loader />}>
            <DynamicLeaflet config={config} colorScheme={colorScheme} />
        </Suspense>
    );
};

export default MandelbrotRenderer;