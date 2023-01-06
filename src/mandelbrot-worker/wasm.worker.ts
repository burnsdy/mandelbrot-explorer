import init, { get_tile } from '../../mandelbrot-generator/pkg';

const ctx: Worker = self as unknown as Worker;

async function start() {
  // From https://github.com/wasm-tool/wasm-pack-plugin
  const { greet, get_rust_data } = await import('../../mandelbrot-generator/pkg');
  greet();

  ctx.postMessage({
    type: 'rustData',
    data: get_rust_data(),
  });
}

ctx.addEventListener('message', (evt) => {
  switch (evt.data.type) {
    case 'start':
      start();
      return;
  }
});

ctx.postMessage({ ready: true });
