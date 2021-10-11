import type { ICanvasData } from './ICanvasData'

export function encodeRaster({ width, height, getPixel }: ICanvasData) {
  const rowData = new Uint8Array((width * height) >> 3)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x = x + 8) {
      for (let b = 0; b < 8; b++) {
        rowData[y * (width >> 3) + (x >> 3)] |= getPixel(x + b, y) << (7 - b)
      }
    }
  }
  return [
    0x1d,
    0x76,
    0x30,
    0x00,
    (width >> 3) & 0xff,
    ((width >> 3) >> 8) & 0xff,
    height & 0xff,
    (height >> 8) & 0xff,
    ...rowData,
  ]
}
