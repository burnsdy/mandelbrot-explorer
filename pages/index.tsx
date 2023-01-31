import Head from 'next/head';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css';

// Import leaflet component dynamically to disable SSR
const MandelbrotRenderer = dynamic(
    () => import('../src/components/mandelbrot-renderer/Leaflet'),
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
                <link
                    rel='stylesheet'
                    href='https://unpkg.com/leaflet@1.9.3/dist/leaflet.css'
                    integrity='sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI='
                    crossOrigin=''
                />
            </Head>
            <main>
                <MandelbrotRenderer />
            </main>
        </>
    );
}
