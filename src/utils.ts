export function buf2hex(buffer: Uint8Array) {
  return [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

export function dec2buf(decNumber: number) {
  return hex2buf(decNumber.toString(16));
}

export function hex2buf(hexString: string) {
  if (hexString.length % 2 !== 0) {
    hexString = "0" + hexString;
  }
  const numBytes = hexString.length / 2;
  const uint8Array = new Uint8Array(numBytes);
  for (let i = 0; i < numBytes; i++) {
    uint8Array[i] = parseInt(hexString.substr(i * 2, 2), 16);
  }
  return uint8Array;
}
