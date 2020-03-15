import groupSequences from './groupSequences';

describe('groupSequences', () => {
  it('should return an empty array when array is empty', () => {
    expect(groupSequences([])).toEqual([]);
  });
  it('should return grouped sequences', () => {
    const array = [1, 2, 3, 10, 11, 12, 13, 42];

    expect(groupSequences(array)).toEqual([
      [1, 2, 3],
      [10, 11, 12, 13],
      [42]
    ]);
  });
})