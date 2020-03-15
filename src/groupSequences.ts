
/**
 * @param {Number[]} numbers an array of sorted numbers
 * @returns {Array[]} an array of array of numbers grouped by sequences
 */
export default (numbers: ReadonlyArray<number>) => {
  if (numbers.length === 0) {
    return [];
  }

  return numbers.reduce((array: Array<Array<number>>, number, index) => {
    if (index === 0 || number !== numbers[index - 1] + 1) {
      array.push([]);
    }

    array[array.length - 1].push(number);

    return array;
  }, []);
};