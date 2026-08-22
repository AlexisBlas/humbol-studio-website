/** Placehold.co helper — swap these URLs for real assets when a study ships. */
export function placeholder(
  width: number,
  height: number,
  label: string,
  bg = "1A1C20",
  fg = "F8F9FB",
): string {
  const text = encodeURIComponent(label);
  return `https://placehold.co/${width}x${height}/${bg}/${fg}.png?text=${text}`;
}
