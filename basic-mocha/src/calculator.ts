const opTools = {
  add: (arg1: number, arg2: number) => {
    return arg1 + arg2;
  },
  sub: (arg1: number, arg2: number) => {
    return arg1 - arg2;
  },
  mul: (arg1: number, arg2: number) => {
    return arg1 * arg2;
  },
  dvs: (arg1: number, arg2: number) => {
    if (arg1 === 0) {
      throw new Error('Invalid dividend ' + arg1);
    }
    if (arg2 === 0) {
      throw new Error('Invalid divisor ' + arg2);
    }
    return arg1 / arg2;
  },
  sqr: (arg1: number) => {
    return arg1 * arg1;
  },
};

/**
 * 계산기를 만들어보자.
 * 1. add 테스트를 작성하자 -> add를 구현하여 테스트를 통과 시키자!
 * 2. subtract ... (decimal은 정밀도 문제로 제외한다. 테스트가 중점이기 때문.)
 * 3. multiply ...
 * 4. division ...
 * 5. sqrt ...
 * 6. log ...
 */
export const calculator = () => (op: string, arg1: number, arg2: number) => {
  return opTools[op](arg1, arg2);
};
