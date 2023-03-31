mod utils;

use wasm_bindgen::prelude::*;
use itertools_num::linspace;
use num::complex::Complex64;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

const POW_2: u32 = 2;
const ESCAPE_RADIUS: f64 = 3.0;
const TILE_SIZE: usize = 200;
const RGBA_SIZE: usize = 4;
const OUTPUT_SIZE: usize = TILE_SIZE * TILE_SIZE * RGBA_SIZE;
const MIN_RGBA_VAL: u8 = 0;
const MAX_RGBA_VAL: u8 = 255;
const RGBA_BLACK: [u8; 4] = [MIN_RGBA_VAL, MIN_RGBA_VAL, MIN_RGBA_VAL, MAX_RGBA_VAL];
const COMPLEX_PLANE_SCALE_FACTOR: f64 = TILE_SIZE as f64 / 128.5;
const PALLETE_SCALE_FACTOR: f64 = 10.0;

fn get_complex_coords(x: f64, y: f64, z: f64) -> (f64, f64) {
    let d: f64 = 2.0f64.powf(z - 2.0);
    let re = x / d * COMPLEX_PLANE_SCALE_FACTOR - 4.0;
    let im = y / d * COMPLEX_PLANE_SCALE_FACTOR - 4.0;
    (re, im)
}

fn get_escape_iterations(
    x0: f64,
    y0: f64,
    max_iter: u32,
) -> (u32, Complex64) {
    let c: Complex64 = Complex64::new(x0, y0);
    let mut z: Complex64 = Complex64::new(0.0, 0.0);
    let mut esc_iter: u32 = 0;
    while z.norm() < ESCAPE_RADIUS && esc_iter < max_iter {
        esc_iter += 1;
        z = z.powu(POW_2) + c;
    }
    (esc_iter, z)
}

fn is_tile_in_set(
    re_range: itertools_num::Linspace<f64>,
    im_range: itertools_num::Linspace<f64>,
    max_iterations: u32,
) -> bool {
    let top = im_range.clone().next().unwrap();
    let bottom = im_range.clone().last().unwrap();
    for re in re_range.clone() {
        let top_in_set = get_escape_iterations(re, top, max_iterations).0
            == max_iterations;
        let bottom_in_set =
            get_escape_iterations(re, bottom, max_iterations).0
                == max_iterations;
        if !top_in_set || !bottom_in_set {
            return false;
        }
    }

    let left = re_range.clone().next().unwrap();
    let right = re_range.last().unwrap();
    for im in im_range.clone() {
        let left_in_set =
            get_escape_iterations(left, im, max_iterations).0
                == max_iterations;
        let right_in_set =
            get_escape_iterations(right, im, max_iterations).0
                == max_iterations;
        if !left_in_set || !right_in_set {
            return false;
        }
    }

    true
}

#[wasm_bindgen]
pub fn get_pixel_data(
    tile_x: f64,
    tile_y: f64,
    tile_z: f64,
    max_iterations: u32,
    color1: &str,
    color2: &str,
    color3: &str,
    color4: &str,
    color5: &str,
    color6: &str,
) -> Vec<u8> {
    let (re_min, im_min) = get_complex_coords(tile_x, tile_y, tile_z);
    let (re_max, im_max) = get_complex_coords(tile_x + 1.0, tile_y + 1.0, tile_z);
    let re_range = linspace(re_min, re_max, TILE_SIZE);
    let im_range = linspace(im_min, im_max, TILE_SIZE);
    let enumerated_re_range = re_range.clone().enumerate();
    let enumerated_im_range = im_range.clone().enumerate();
    if is_tile_in_set(
        re_range,
        im_range,
        max_iterations,
    ) {
        return RGBA_BLACK
            .iter()
            .cycle()
            .take(OUTPUT_SIZE)
            .cloned()
            .collect();
    }

    let color_scheme = vec![color1, color2, color3, color4, color5, color6];
    let gradient = colorgrad::CustomGradient::new()
        .html_colors(&color_scheme)
        .build()
        .unwrap();

    let scaled_max_iter = (max_iterations * PALLETE_SCALE_FACTOR as u32) as usize;
    let mut pixel_data: Vec<u8> = vec![0; OUTPUT_SIZE];
    for (y, im) in enumerated_im_range {
        for (x, re) in enumerated_re_range.clone() {
            let (escape_iter, final_z) = get_escape_iterations(re, im, max_iterations);
            let pixel: [u8; 4] = if escape_iter == max_iterations {
                RGBA_BLACK
            } else {
                // https://stackoverflow.com/questions/369438/smooth-spectrum-for-mandelbrot-set-rendering
                let smoothed_escape_iter = f64::from(escape_iter) + f64::from(1) - ((final_z.norm().ln()).ln() / f64::from(POW_2).ln());
                let scaled_escape_iter = (smoothed_escape_iter * PALLETE_SCALE_FACTOR) as usize;
                let color = gradient.at(scaled_escape_iter as f64 / scaled_max_iter as f64).to_rgba8();
                color
            };
            // Individually set RGBA values at correct indices in output pixel data
            let index = (y * TILE_SIZE + x) * RGBA_SIZE;
            pixel_data[index] = pixel[0];
            pixel_data[index + 1] = pixel[1];
            pixel_data[index + 2] = pixel[2];
            pixel_data[index + 3] = MAX_RGBA_VAL;
        }
    }

    // Return UInt8ClampedArray of [R,G,B,A,R,G,B,A,...] for every pixel in tile
    pixel_data
}
