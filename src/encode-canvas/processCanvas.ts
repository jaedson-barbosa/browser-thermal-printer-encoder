import type { ICanvasData } from './ICanvasData'

/** Validate and get canvas main data */
export function processCanvas(canvas: HTMLCanvasElement): ICanvasData {
  const width = canvas.width
  const height = canvas.height

  // Validate width
  if (width % 8 !== 0) {
    throw new Error('Width must be a multiple of 8')
  }

  // Validate height
  if (height % 8 !== 0) {
    throw new Error('Height must be a multiple of 8')
  }

  const context = canvas.getContext('2d')!
  const image = context.getImageData(0, 0, width, height)

  // Validate data
  if (image.data.some((v, i) => v && (v != 255 || (i + 1) % 4))) {
    throw new Error('Invalid canvas data.')
  }

  const getPixel = (x: number, y: number) => {
    if (x >= width || y >= height) return 0
    return image.data[(width * y + x) * 4 + 3] && 1
  }

  return { width, height, getPixel }
}
