const MEMORY_PATTERN = /(?:^|[^\dA-Za-z])((?:\d+(?:\.\d+)?)\s*(?:TB|GB))(?![\dA-Za-z])/i

export function getProductMemory(description = '') {
  if (typeof description !== 'string') return null

  const match = description.match(MEMORY_PATTERN)

  if (!match) return null

  return match[1].replace(/\s+/g, '').toUpperCase()
}
