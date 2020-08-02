const expect = require("chai").expect;

/*
const calculateApplesLocation = (apples, appleTreeLocation) =>
    apples.map(apple => apple + appleTreeLocation);
    */

/*
const calculateOrangesLocation = (oranges, orangeTreeLocation) =>
    oranges.map(orange => orange + orangeTreeLocation);
 */

const calculateFruitsLocation = (fruits, fruitTreeLocation) =>
    fruits.map(fruit => fruit + fruitTreeLocation);

const getCountFruits = (firstPoint, secondPoint, fruitsAbsoluteLocation) =>
    fruitsAbsoluteLocation.filter(
        fruit => firstPoint <= fruit && secondPoint >= fruit
    ).length;

const getFruitResult = (firstPoint, secondPoint, appleTreeLocation, apples) => {
    const fruitsAbsoluteLocation = calculateFruitsLocation(
        apples,
        appleTreeLocation
    );
    const countFruits = getCountFruits(
        firstPoint,
        secondPoint,
        fruitsAbsoluteLocation
    );
    return countFruits;
};

const getFinalResult = (
    firstPoint,
    secondPoint,
    appleTreeLocation,
    orangeTreeLocation,
    apples,
    oranges
) => {
    const appleResult = getFruitResult(
        firstPoint,
        secondPoint,
        appleTreeLocation,
        apples
    );

    const orangeResult = getFruitResult(
        firstPoint,
        secondPoint,
        orangeTreeLocation,
        oranges
    );

    return [appleResult, orangeResult];
};

describe("사과나무와 오렌지 나무 문제에서는", () => {
    const firstPoint = 3;
    const secondPoint = 6;
    const apples = [1, 2, -3];
    const appleTreeLocation = 4;
    const oranges = [-2, 1];
    const orangeTreeLocation = 8;

    describe("사과의 결과를 구하기 위해서", () => {
        it("사과의 상대위치에서 사과나무의 위치를 더해서 절대위치를 구한다", () => {
            const applesAbsoluteLocation = calculateFruitsLocation(
                apples,
                appleTreeLocation
            );
            expect(applesAbsoluteLocation).to.have.members([5, 6, 1]);
        });

        it("지정한 범위 내에 있는 사과의 절대위치 개수를 구한다.", () => {
            const applesAbsoluteLocation = calculateFruitsLocation(
                apples,
                appleTreeLocation
            );
            const countApples = getCountFruits(
                firstPoint,
                secondPoint,
                applesAbsoluteLocation
            );
            expect(countApples).to.equal(2);
        });

        it("범위와 사과나무의 위치, 각 사과들의 상대위치를 제공하면 사과의 절대위치 개수를 구한다.", () => {
            const result = getFruitResult(
                firstPoint,
                secondPoint,
                appleTreeLocation,
                apples
            );
            expect(result).to.equal(2);
        });
    });

    describe("오렌지의 결과를 구하기 위해서", () => {
        it("오렌지의 상대위치에서 오렌지나무의 위치를 더해서 절대위치를 구한다", () => {
            const orangesAbsoluteLocation = calculateFruitsLocation(
                oranges,
                orangeTreeLocation
            );
            expect(orangesAbsoluteLocation).to.have.members([6, 9]);
        });

        it("지정한 범위 내에 있는 사과의 절대위치 개수를 구한다.", () => {
            const orangesAbsoluteLocation = calculateFruitsLocation(
                oranges,
                orangeTreeLocation
            );
            const countOranges = getCountFruits(
                firstPoint,
                secondPoint,
                orangesAbsoluteLocation
            );
            expect(countOranges).to.equal(1);
        });

        it("범위와 사과나무의 위치, 각 사과들의 상대위치를 제공하면 사과의 절대위치 개수를 구한다.", () => {
            const result = getFruitResult(
                firstPoint,
                secondPoint,
                orangeTreeLocation,
                oranges
            );
            expect(result).to.equal(1);
        });
    });

    describe("사과와 오렌지의 결과를 구하기 위해는", () => {
        it("두 배열과 두 과일나무의 위치를 전달했을 때 각각의 결과값을 보여주어야 한다.", () => {
            const finalResult = getFinalResult(
                firstPoint,
                secondPoint,
                appleTreeLocation,
                orangeTreeLocation,
                apples,
                oranges
            );
            expect(finalResult).to.have.members([2, 1]);
        });
    });
});
