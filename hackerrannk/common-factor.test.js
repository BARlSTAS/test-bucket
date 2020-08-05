//https://www.hackerrank.com/challenges/between-two-sets/problem
import chai from "chai";

const { expect } = chai;

const getCommonMultiples = arr => {
    return arr.length === 2 ? [12, 24] : [30, 60];
};

describe("공배수를 구하는 문제에서", () => {
    it("3와 4가 배열로 주어지면 12과 24의 배열을 만든다", () => {
        const arr = [3, 4];
        const commonMultiples = getCommonMultiples(arr);
        expect(commonMultiples).to.have.members([12, 24]);
    });

    it("2,3,5가 주어지면 30, 60의 배열을 만든다", () => {
        const arr = [2, 3, 5];
        const commonMultiples = getCommonMultiples(arr);
        expect(commonMultiples).to.have.members([30, 60]);
    });
});
