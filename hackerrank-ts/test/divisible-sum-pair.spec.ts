// https://www.hackerrank.com/challenges/divisible-sum-pairs/problem

import { expect } from "chai";

import {
    addEachNumberOfArray,
    getCountMultiples
} from "../src/divisible-sum-pair";

describe("주어진 배열의 합이 주어진 값의 배수를 구하는 문제에서", () => {
    describe("배열이 주어지면 배열 요소들 중 두 개를 중복없는 조합으로 선택하여 더할 때", () => {
        it("1,2,3 가 주어지면 3,4,5가 결과로 나온다", () => {
            const arr: number[] = [1, 2, 3];
            const resultForSum: number[] = addEachNumberOfArray(arr);
            expect(resultForSum).to.have.members([3, 4, 5]);
        });

        it("1,2,3,4 가 주어지면 3,4,5,5,6,7가 결과로 나온다", () => {
            const arr: number[] = [1, 2, 3, 4];
            const resultForSum: number[] = addEachNumberOfArray(arr);
            expect(resultForSum).to.have.members([3, 4, 5, 5, 6, 7]);
        });
    });

    describe("배열 요소를 중복없는 조합으로 더한 값들 중 주어진 정수의 배수 개수를 구할 때", () => {
        it("1,2,3,4 가 주어지고 주어진 정수로 5가 주어지면 2가 결과로 나온다", () => {
            const arr = [1, 2, 3, 4];
            const selectNum = 5;
            const countMultiples = getCountMultiples(arr, 5);
            expect(countMultiples).to.be.equal(2);
        });

        it("1,2,3,4 가 주어지고 주어진 정수로 7이 주어지면 1이 결과로 나온다", () => {
            const arr = [1, 2, 3, 4];
            const countMultiples = getCountMultiples(arr, 7);
            expect(countMultiples).to.be.equal(1);
        });
    });
});
