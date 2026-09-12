const htmlTagPattern = /<[^>]*>/g
const whitespacePattern = /\s+/g

export function plainText(value: string) {
  return value
    .replace(htmlTagPattern, ' ')
    .replace(whitespacePattern, ' ')
    .trim()
}

export function truncateAtWord(value: string, limit: number) {
  const text = value.trim()
  if (text.length <= limit) return text
  const clipped = text.slice(0, limit - 1)
  const lastSpace = clipped.lastIndexOf(' ')
  const candidate = lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped
  return `${candidate.trimEnd()}…`
}
