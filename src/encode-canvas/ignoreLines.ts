export function ignoreLines(n: number) {
  const emptyLine = [0x0a, 0x0d]
  return Array<number[]>(n).fill(emptyLine).flat()
}
