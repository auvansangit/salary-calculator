const calculateChangedBits = <S extends { [key: string]: any }>(
  prev: S,
  next: S
) => {
  let result = 0;

  if (!prev || !next) {
    return 0xffffff;
  }

  const prevKeys = Object.keys(prev);
  const nextKeys = Object.keys(next);
  const keys = prevKeys.length > nextKeys.length ? prevKeys : nextKeys;

  keys.forEach((key, index) => {
    if (prev[key] !== next[key]) {
      result |= 1 << index % 31;
    }
  });

  return result;
};

export default calculateChangedBits;
