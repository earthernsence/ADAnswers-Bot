import Decimal from "break_infinity.js";

// Old implementation for enumerations. In general, enumerate() should be
// just as effective, and "better" in some way. Keeping both implementations for posterity.
// export function makeEnumeration<itemType>(
//   items: Array<itemType>,
//   separator: string = ", ",
//   name: string = "",
//   finalSeperator: string = "or"
// ) {
//   if (items.length === 0) return "";
//   if (items.length === 1) return `${name}${items[0]}`;
//   if (items.length === 2) return `${name}${items[0]} ${finalSeperator} ${name}${items[1]}`;
//   const commaSeparated = items.slice(0, items.length - 1).join(separator);
//   const last = items[items.length - 1];
//   return `${name}${commaSeparated}, ${finalSeperator} ${name}${last}`;
// }

export function enumerate<itemType = string>(items: Array<itemType>, type: Intl.ListFormatType = "conjunction"): string {
  return new Intl.ListFormat("en", {
    style: "long",
    type,
  }).format(items.map(item => String(item)));
}

export const capitalise = function(word: string): string {
  return word.toLowerCase().replace(/^\w/u, c => c.toUpperCase());
};

export const Caesar = {
  mod: (n: number, p: number) => {
    let n2 = n;

    if (n < 0) n2 = p - Math.abs(n) % p;

    return n2 % p;
  },
  encrypt: (msg: string, key: number) => {
    let encMsg = "";

    const upper = msg.toUpperCase();

    for (let i = 0; i < upper.length; i++) {
      let code = upper.charCodeAt(i);

      // Encrypt only letters in 'A' ... 'Z' interval
      if (code >= 65 && code <= 65 + 26 - 1) {
        code -= 65;
        code = Caesar.mod(code + key, 26);
        code += 65;
      }

      encMsg += String.fromCharCode(code);
    }

    return encMsg;
  },
  randomKey: () => 1 + Math.floor(Math.random() * 25),
  randomEncrypt: (msg: string) => Caesar.encrypt(msg, Caesar.randomKey())
};

export function formatDecimal(number: Decimal | number | string, decimals: number = 2, lessThan: number = 1000) {
  const value = number instanceof Decimal ? number : new Decimal(number);
  if (value.lessThan(lessThan)) return formatDecimalLessThan1000(value);
  const exponent = Decimal.floor(value.log10());
  const mantissa = value.div(new Decimal(10).pow(exponent));
  return `${mantissa.toFixed(decimals)}e${exponent}`;
}

export function formatDecimalLessThan1000(number: Decimal) {
  if (number.floor().eq(number)) {
    return number.toFixed(0);
  }
  return number.toFixed(2);
}
