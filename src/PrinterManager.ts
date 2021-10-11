export class PrinterManager {
  private port: SerialPort | undefined

  public get connected(): boolean {
    return !!this.port
  }

  async connect() {
    const port = await navigator.serial.requestPort()
    this.port = port
    return !!port
  }

  async writeData(data: Uint8Array) {
    if (!this.port) throw new Error('Printer is not connected.')
    await this.port.open({ baudRate: 9600 })
    const writer = this.port.writable!.getWriter()
    await writer.write(data)
    writer.releaseLock()
    this.port.close()
  }
}
