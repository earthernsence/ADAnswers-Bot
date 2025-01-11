// eslint-disable-next-line max-params
export function makeEnumeration<itemType>(
  items: Array<itemType>,
  separator: string = ", ",
  name: string = "",
  finalSeperator: string = "or"
) {
  if (items.length === 0) return "";
  if (items.length === 1) return `${name}${items[0]}`;
  if (items.length === 2) return `${name}${items[0]} ${finalSeperator} ${name}${items[1]}`;
  const commaSeparated = items.slice(0, items.length - 1).join(separator);
  const last = items[items.length - 1];
  return `${name}${commaSeparated}, ${finalSeperator} ${name}${last}`;
}

export const capitalise = function(word: string): string {
  return word.toLowerCase().replace(/^\w/u, c => c.toUpperCase());
};