export const getCount = (type: 'minimum' | 'maximum', numList: number[]) => numList.reduce(
  (acc: {count: number; compareNum: number | null}, curr: number) => {
    if (acc.compareNum == null) {
      acc.compareNum = curr;
      return acc;
    }
    const shouldCount = type === 'minimum' ? acc.compareNum > curr : acc.compareNum < curr;

    if (shouldCount) {
      acc.count += 1;
      acc.compareNum = curr;
      return acc;
    }
    return acc;
  }, { count: 0, compareNum: null },
).count;

export const getCountMaximumAndMinimum = (numList: number[]): number[] => {
  const countMaximum = getCount('maximum', numList);
  const countMinimum = getCount('minimum', numList);

  return [countMaximum, countMinimum];
};
