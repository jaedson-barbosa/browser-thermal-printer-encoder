export function sendPulse(pulse: IPulse | undefined) {
  if (!pulse) return []
  const devicePin = pulse.devicePin
  const on = Math.min(500, Math.round(pulse.on / 2))
  const off = Math.min(500, Math.round(pulse.off / 2))
  return [0x1b, 0x70, devicePin, on & 0xff, off & 0xff]
}

export interface IPulse {
  /** 0 or 1 for on which pin the device is connected */
  devicePin: 0 | 1
  /** Time the pulse is on in milliseconds */
  on: number
  /** Time the pulse is off in milliseconds */
  off: number
}
