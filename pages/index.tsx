import Head from 'next/head';
import dynamic from 'next/dynamic';
import IconShelf from '../src/components/IconShelf/IconShelf';
import ControlsDialog from '../src/components/ControlsDialog/ControlsDialog';

// Import leaflet component dynamically to disable SSR
const MandelbrotRenderer = dynamic(
    () => import('../src/components/Leaflet/Leaflet'),
    {
        ssr: false
    }
);

export default function Home() {
    return (
        <>
            <Head>
                <title>Mandelbrot Explorer</title>
                <meta
                    name='description'
                    content='Explore the mandelbrot set fractal'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main>
                <MandelbrotRenderer />
                <IconShelf />
                <ControlsDialog />
            </main>
        </>
    );
}
