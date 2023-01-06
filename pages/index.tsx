import Head from 'next/head'
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css'

// Import Mandelbrot Leaflet dynamically to disable SSR
const DynamicLeaflet = dynamic(() => import('../src/components/MandelbrotLeaflet'), {
    ssr: false
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Mandelbrot Explorer</title>
        <meta name="description" content="Explore the mandelbrot set fractal" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI=" crossOrigin="" />
        <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js" integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossOrigin=""></script>
      </Head>
      <main>
        <DynamicLeaflet />
      </main>
    </>
  )
}
