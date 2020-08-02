const expect = require("chai").expect;

const fun = num => {
    const countMultiple = Math.floor(num / 5) + 1;
    const targetNum = countMultiple * 5;
    if (targetNum < 40 || targetNum - num >= 3) return num;
    return targetNum;
};

describe("이 함수는", () => {
    it("43를 넣으면 45를 반환한다", () => {
        const num = 43;
        const result = fun(num);
        expect(result).to.equal(45);
    });

    it("89를 넣으면 90을 반환한다.", () => {
        const num = 89;
        const result = fun(num);
        expect(result).to.equal(90);
    });

    it("33을 넣으면33을 반환한다", () => {
        const num = 33;
        const result = fun(num);
        expect(result).to.equal(33);
    });
});

describe("이 함수를 map 의 함수로 사용하면", () => {
    it("[43, 89, 33]을 [45, 90, 33] 으로 반환한다", () => {
        const grades = [43, 89, 33];
        const result = grades.map(fun);
        expect(result).to.have.members([45, 90, 33]);
    });
});
