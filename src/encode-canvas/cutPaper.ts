export function cutPaper(cut: CutTypes) {
  if (cut === CutTypes.none) return []
  return [0x1d, 0x56, cut == CutTypes.partial ? 0x01 : 0x00]
}

export enum CutTypes {
  none,
  full,
  partial,
}
