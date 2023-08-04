import Head from 'next/head';
import IconShelf from '../src/components/IconShelf/IconShelf';
import ControlsDialog from '../src/components/ControlsDialog/ControlsDialog';
import MandelbrotRenderer from '../src/components/MandelbrotRenderer/MandelbrotRenderer';

const Home = () => {
  return (
    <>
      <Head>
        <title>Mandelbrot Explorer</title>
        <meta name='description' content='Explore the mandelbrot set fractal' />
        <link rel='icon' href='/mandelbrot.ico' />
      </Head>
      <main>
        <MandelbrotRenderer />
        <IconShelf />
        <ControlsDialog />
      </main>
    </>
  );
};

export default Home;
