function getRandomIntInclusive(min: number, max: number) {
  const minInt = Math.ceil(min);
  const maxInt = Math.floor(max);
  return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
  // The maximum is inclusive and the minimum is inclusive
}

export default function getRandomChar() {
  return String.fromCodePoint(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    getRandomIntInclusive('a'.codePointAt(0)!, 'z'.codePointAt(0)!),
  );
}
