const htmlTagPattern = /<[^>]*>/g

export function plainText(value: string) {
  return value.replace(htmlTagPattern, '')
}
