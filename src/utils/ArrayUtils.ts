function isArrayOf<T>(typeLike: T, arr: any): boolean {
  return (
    !!arr &&
    arr instanceof Array &&
    (arr.length === 0 || arr.every(v => typeof v === typeof typeLike))
  );
}

export function isArrayOfStrings(arr: any): boolean {
  return isArrayOf("string", arr);
}
