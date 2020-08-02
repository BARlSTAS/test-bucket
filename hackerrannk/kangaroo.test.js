// https://www.hackerrank.com/challenges/kangaroo/problem

const expect = require("chai").expect;

class Kangaroo {
    location = -1;
    distance = -1;

    constructor(location, distance) {
        this.location = location;
        this.distance = distance;
    }

    calculateJumpResult(count) {
        return this.location + this.distance * count;
    }
}

const operateEachJumpDistance = (kangaroo1, kangaroo2) => {
    const location1 = kangaroo1.location;
    const location2 = kangaroo2.location;

    const distance1 = kangaroo1.distance;
    const distance2 = kangaroo2.distance;

    const a = location1 - location2;
    const b = distance2 - distance1;

    if (location2 > location1 && distance2 > distance1) {
        return false;
    }

    return a % b === 0;
};

const operateEachJumpDistanceWithParams = (
    location1,
    distance1,
    location2,
    distance2
) => {
    const kangaroo1 = new Kangaroo(location1, distance1);
    const kangaroo2 = new Kangaroo(location2, distance2);
    const isArrivedConcurrently = operateEachJumpDistance(kangaroo1, kangaroo2);
    return isArrivedConcurrently ? "YES" : "NO";
};

describe("캥거루는", () => {
    it("위치값과 도약거리를 가지고 있다.", () => {
        const location = 0;
        const distance = 2;
        const kangaroo = new Kangaroo(location, distance);
        expect(kangaroo.location).to.equal(0);
        expect(kangaroo.distance).to.equal(2);
    });

    it("주어진 도약 횟수에 따라 예상 거리를 가진다. ", () => {
        const location = 0;
        const distance = 2;
        const kangaroo = new Kangaroo(location, distance);
        const jumpCount = 3;
        const distanceResult = kangaroo.calculateJumpResult(jumpCount);
        expect(distanceResult).to.equal(6);
    });

    it("두 캥거루는 동시에 도착하는 것을 알 수 있다", () => {
        const location1 = 0;
        const distance1 = 5;
        const kangaroo1 = new Kangaroo(location1, distance1);
        const location2 = 3;
        const distance2 = 2;
        const kangaroo2 = new Kangaroo(location2, distance2);

        const isArrivedConcurrently = operateEachJumpDistance(
            kangaroo1,
            kangaroo2
        );
        expect(isArrivedConcurrently).to.be.true;
    });

    it("첫번째 캥거루 위치, 첫번재 캥거루 도약 거리, 두번째 캥거루 위치, 두번째 캥거루 도약 거리가 주어지면 캥거루의 동시 도착 가능을 알 수 있다.", () => {
        const location1 = 0;
        const distance1 = 5;
        const location2 = 3;
        const distance2 = 2;

        const isArrivedConcurrently = operateEachJumpDistanceWithParams(
            location1,
            distance1,
            location2,
            distance2
        );
        expect(isArrivedConcurrently).to.equal("YES");
    });

    // 문제를 정확하게 읽지 않아서 틀린 테스트 케이스를 테스트 명세로 추가했다.
    it("첫번째 위치35, 첫번째 도약거리 1, 두번째 위치 45, 두번째 도약거리 3 인 경우 동시에 도착하는 것은 불가능하다", () => {
        const location1 = 35;
        const distance1 = 1;
        const location2 = 45;
        const distance2 = 3;

        const isArrivedConcurrently = operateEachJumpDistanceWithParams(
            location1,
            distance1,
            location2,
            distance2
        );
        expect(isArrivedConcurrently).to.equal("NO");
    });

    // 문제를 정확하게 읽지 않아서 틀린 테스트 케이스를 테스트 명세로 추가했다.
    it("첫번째 위치0, 첫번째 도약거리 2, 두번째 위치 5, 두번째 도약거리 3 인 경우 동시에 도착하는 것은 불가능하다", () => {
        const location1 = 0;
        const distance1 = 2;
        const location2 = 5;
        const distance2 = 3;

        const isArrivedConcurrently = operateEachJumpDistanceWithParams(
            location1,
            distance1,
            location2,
            distance2
        );
        expect(isArrivedConcurrently).to.equal("NO");
    });
});
