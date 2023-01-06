// export class RenderingSettings {
//     iterations: number = 500;
//     numWorkers: number = Math.min(navigator.hardwareConcurrency || 4, 64);
//     colorScheme?: number
// }

export interface RenderingSettings {
    iterations: number;
    exponent: number;
    numWorkers: number;
    tileSize: number;
    colorScheme?: number
}
