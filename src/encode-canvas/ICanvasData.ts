export interface ICanvasData {
  width: number
  height: number
  getPixel: (x: number, y: number) => 0 | 1
}
