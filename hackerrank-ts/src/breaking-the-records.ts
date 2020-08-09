export const countMinimum = (numList: number[]) => numList.reduce(
  (acc: {count: number; compareNum: number | null}, curr: number) => {
    if (!acc.compareNum) {
      acc.compareNum = curr;
      return acc;
    }

    if (acc.compareNum > curr) {
      acc.count += 1;
      acc.compareNum = curr;
      return acc;
    }
    return acc;
  }, { count: 0, compareNum: null },
).count;

export const countMaximum = (numList: number[]) => numList.reduce(
    (acc: {count: number; compareNum: number | null}, curr: number) => {
        if (!acc.compareNum) {
            acc.compareNum = curr;
            return acc;
        }

        if (acc.compareNum < curr) {
            acc.count += 1;
            acc.compareNum = curr;
            return acc;
        }
        return acc;
    }, { count: 0, compareNum: null },
).count;
