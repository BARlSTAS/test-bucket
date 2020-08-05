//https://www.hackerrank.com/challenges/between-two-sets/problem
import chai from "chai";

const { expect } = chai;

const getMinimumNum = arr =>
    arr.reduce((acc, curr) => {
        if (acc > curr) {
            acc = curr;
            return acc;
        }
        return acc;
    });

// getFirstMultiples 함수에서 버그가 있는 것은 찾았으나 여러가지 operation 이 혼재 되어 있어서 곧바로 버그를 찾기가 어려웠다.
// 함수를 좀 더 분할해서 테스트 케이스를 추가했다면 바로 버그를 찾을 수 있었을 것이다.
const getFirstMultiples = arr => {
    let multiplesNum = [];
    for (const num of arr) {
        const isUniqueFactor =
            arr.filter(currentNum => currentNum % num === 0).length === 1;
        if (isUniqueFactor) {
            multiplesNum.push(num);
        }
    }

    const minimumNum = getMinimumNum(multiplesNum);
    let maxFactor = -1;
    for (let i = 2; i <= minimumNum; i += 1) {
        if (
            multiplesNum.filter(num => num % i === 0).length ===
                multiplesNum.length &&
            multiplesNum.length !== 1
        ) {
            maxFactor = i;
        }
    }

    if (maxFactor === -1) {
        return multiplesNum.reduce((acc, curr) => {
            return acc * curr;
        });
    }

    return maxFactor * minimumNum;
};

const isFactor = (arr, multiplesNum) =>
    arr.filter(num => num % multiplesNum === 0).length === arr.length;

const getMultiplesArr = (arr1, arr2) => {
    const multiplesNum = getFirstMultiples(arr1);
    const minimumNum = getMinimumNum(arr2);

    let multiplesArr = [];
    let count = 1;
    let currentMultiplesNum = multiplesNum;
    while (currentMultiplesNum <= minimumNum) {
        if (isFactor(arr2, currentMultiplesNum)) {
            multiplesArr.push(currentMultiplesNum);
        }
        count += 1;
        currentMultiplesNum = multiplesNum * count;
    }
    return multiplesArr;
};

const getCountMultiplesArr = (arr1, arr2) => getMultiplesArr(arr1, arr2).length;

describe("공배수를 구하는 문제에서", () => {
    // 여기서 테스트를 4개 만든 것은 켄트 백의 TDD 에서 이야기하는 삼각측량을 하기 위해서이다.
    it("3와 4가 배열로 주어지면 최소 공배수로 12를 구한다.", () => {
        const arr = [3, 4];
        const commonMultiples = getFirstMultiples(arr);
        expect(commonMultiples).to.equal(12);
    });

    it("2,3,5가 주어지면 최소 공배수로 30을 구한다", () => {
        const arr = [2, 3, 5];
        const commonMultiples = getFirstMultiples(arr);
        expect(commonMultiples).to.equal(30);
    });

    it("2,3,4 가 주어지면 최소 공배수로 12를 구한다", () => {
        const arr = [2, 3, 4];
        const commonMultiples = getFirstMultiples(arr);
        expect(commonMultiples).to.equal(12);
    });

    it("2,4가 주어지면 최소 공배수로 4를 구한다", () => {
        const arr = [2, 4];
        const commonMultiples = getFirstMultiples(arr);
        expect(commonMultiples).to.equal(4);
    });

    // 이 테스트가 추가된 것은 최소 공배수를 구하기 위해 충분한 사례가 없었기 때문이다.
    // 즉 hackerrank 에서 풀었던 문제중 통과하지 못한 테스트를 추가한 것이다.
    it("3, 9, 6 이 주어지면 최소 공배수로 18을 구한다", () => {
        const arr = [3, 9, 6];
        const commonMultiples = getFirstMultiples(arr);
        expect(commonMultiples).to.equal(18);
    });
});

describe("두 배열이 주어지면 하나의 배열에서는 공배수를 구하고, 두번째 배열에서는 공배수가 공약수인지 확인한다", () => {
    describe("2와 4로 공배수를 구했을 때", () => {
        it("16, 32, 96 의 배열을 주면 미리 구한 공배수가 공약수인지 확인한다.", () => {
            const arr1 = [2, 4];
            const multiplesNum = getFirstMultiples(arr1);

            const arr2 = [16, 32, 96];
            expect(isFactor(arr2, multiplesNum)).to.be.true;
        });

        it("16, 32, 96 의 배열을 주면 미리 구한 공배수의 배수를 배열에서 가장 작은 숫자를 넘거나 동등할 때까지 구한다.", () => {
            const arr1 = [2, 4];
            const arr2 = [16, 32, 96];
            const multiplesArr = getMultiplesArr(arr1, arr2);
            expect(multiplesArr).to.have.members([4, 8, 16]);
        });

        it("16, 32, 96 의 배열을 주면 미리 구한 공배수의 배수를 배열에서 가장 작은 숫자를 넘거나 동등할 때까지 구해 갯수를 센다.", () => {
            const arr1 = [2, 4];
            const arr2 = [16, 32, 96];
            const countMultiplesArr = getCountMultiplesArr(arr1, arr2);
            expect(countMultiplesArr).to.have.equal(3);
        });
    });
});
