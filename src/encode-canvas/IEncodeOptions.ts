import { CutTypes } from './cutPaper'
import { ImageModes } from './encodeCanvas'
import type { IPulse } from './sendPulse'

export interface IEncodeOptions {
  /** Some printers accept 'column' (ESC *) while others accept 'raster' (GS v ) */
  imageMode: ImageModes
  /** Canvas with the content that will be printed */
  canvas: HTMLCanvasElement
  /** Top padding in white lines */
  paddingTop: number
  /** Bottom padding in white lines */
  paddingBottom: number
  /** Cut paper, full or partial */
  cut: CutTypes
  /** Send a pulse, useful for some cash drawers */
  pulse?: IPulse
}
