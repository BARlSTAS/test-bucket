//https://www.hackerrank.com/challenges/the-birthday-bar/problem

import { expect } from "chai";

import {
    getIncrementedResults,
    getCountChocolate
} from "../src/birthday-chocolate";

describe("생일 초콜릿 문제에서는", () => {
    describe("n이 주어지면 배열의 연속된 n 만큼 더하는데", () => {
        it("1 2 1 3 2 가 주어지면 연속된 2개의 배열요소를 더한 결과들을 보여준다.", () => {
            const arr = [1, 2, 1, 3, 2];
            const incrementedResults = getIncrementedResults(arr, 2);
            expect(incrementedResults).to.have.members([3, 3, 4, 5]);
        });
    });

    describe("m, n이 주어지면 배열의 연속된 n 만큼 더하여 나온 값 중 m 과 동일한 개수를 구하는데", () => {
        it("1 2 1 3 2 가 주어졌을 때 3, 2 가 주어지면 조건을 만족하는 개수는 2이다.", () => {
            const arr = [1, 2, 1, 3, 2];
            const countChocolate = getCountChocolate(arr, 3, 2);
            expect(countChocolate).to.be.equal(2);
        });

        it("4 가 주어졌을 때 4,1 가 주어지면 조건을 만족하는 개수는 1이다.", () => {
            const arr = [4];
            const countChocolate = getCountChocolate(arr, 4, 1);
            expect(countChocolate).to.be.equal(1);
        });
    });
});
