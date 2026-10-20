/** Mixes a hex colour with white; `amount` is how much of the colour remains (0.25 → light pastel). */
export function tint(hex: string, amount = 0.25) {
  const value = hex.replace('#', '')
  const full = value.length === 3 ? value.split('').map((char) => char + char).join('') : value
  const channels = [0, 2, 4].map((offset) => Number.parseInt(full.slice(offset, offset + 2), 16))
  const mixed = channels.map((channel) => Math.round(255 - (255 - channel) * amount))
  return `#${mixed.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`
}
