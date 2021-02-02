export function splitKey(key) {
  let string = String.fromCharCode(Number(key.charCodeAt(0)) - 32);
  for (let i = 1; i < key.length; i++) {
    if (key.charCodeAt(i) < 97) {
      string += " ";
    }
    string += key.charAt(i);
  }
  return string;
}