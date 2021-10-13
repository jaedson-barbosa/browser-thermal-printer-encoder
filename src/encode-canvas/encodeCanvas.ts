import { encodeColumn } from './encodeColumn'
import { encodeRaster } from './encodeRaster'
import { processCanvas } from './processCanvas'
import { ignoreLines } from './ignoreLines'
import type { IEncodeOptions } from './IEncodeOptions'
import { sendPulse } from './sendPulse'
import { cutPaper } from './cutPaper'

export function encodeCanvas(options: IEncodeOptions) {
  const canvasData = processCanvas(options.canvas)
  const encodedCanvas =
    options.imageMode == ImageModes.column
      ? encodeColumn(canvasData)
      : encodeRaster(canvasData)

  const data: number[] = [
    [0x1b, 0x40],
    ignoreLines(options.paddingTop),
    encodedCanvas,
    ignoreLines(options.paddingBottom),
    cutPaper(options.cut),
    sendPulse(options.pulse),
  ].flat()
  return new Uint8Array(data)
}

export enum ImageModes {
  column,
  raster,
}
