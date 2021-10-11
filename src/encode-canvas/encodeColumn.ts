import type { ICanvasData } from './ICanvasData'

export function encodeColumn({ width, height, getPixel }: ICanvasData) {
  const queued: number[] = []
  queued.push(0x1b, 0x33, 0x24)

  for (let s = 0; s < Math.ceil(height / 24); s++) {
    const bytes = new Uint8Array(width * 3)
    for (let x = 0; x < width; x++) {
      for (let c = 0; c < 3; c++) {
        for (let b = 0; b < 8; b++) {
          bytes[x * 3 + c] |= getPixel(x, s * 24 + b + 8 * c) << (7 - b)
        }
      }
    }
    queued.push(
      0x1b,
      0x2a,
      0x21,
      width & 0xff,
      (width >> 8) & 0xff,
      ...bytes,
      0x0a
    )
  }

  queued.push(0x1b, 0x32)
  return queued
}
