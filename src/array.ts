export namespace array {
  export const range = (n: number): number[] => {
    return Array.from({ length: n }, (_, index) => index);
  };
}
