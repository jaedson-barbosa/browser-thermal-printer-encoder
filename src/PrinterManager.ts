import { IEncodeOptions } from "."
import { encodeCanvas } from "./encode-canvas"

export async function connectToPrinter() {
  const port = await navigator.serial.requestPort()
  if (port) {
    return async (options: IEncodeOptions) => {
      const data = encodeCanvas(options)
      if (!port) throw new Error('Printer is not connected.')
      await port.open({ baudRate: 9600 })
      const writer = port.writable!.getWriter()
      await writer.write(data)
      writer.releaseLock()
      port.close()
    }
  } else return undefined
}
