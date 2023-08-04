import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { Loader } from '@mantine/core';
import {
  selectColorScheme,
  selectMaxIterations
} from '../../store/renderingSettingsSlice';

const MandelbrotRenderer = () => {
  // Import leaflet component dynamically to disable SSR
  const DynamicLeaflet = dynamic(() => import('./Leaflet'), {
    ssr: false
  });

  const maxIterations = useSelector(selectMaxIterations);
  const colorScheme = useSelector(selectColorScheme);

  return (
    <Suspense fallback={<Loader />}>
      <DynamicLeaflet maxIterations={maxIterations} colorScheme={colorScheme} />
    </Suspense>
  );
};

export default MandelbrotRenderer;
