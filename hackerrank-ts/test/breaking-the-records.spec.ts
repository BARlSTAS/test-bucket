// https://www.hackerrank.com/challenges/breaking-best-and-worst-records/problem
import { expect } from 'chai';
import { getCount, getCountMaximumAndMinimum } from '../src/breaking-the-records';

describe('배열의 첫번째 숫자부터 시작하여 ', () => {
  describe('작은 값이 나오면 기준값을 그 값으로 변경하고, 변경 횟수를 구할 때', () => {
    it('1,2,3 일 때는 변경횟수가 0이다.', () => {
      // given
      const numList = [1, 2, 3];

      // when
      const count = getCount('minimum', numList);

      // then
      expect(count).to.be.equal(0);
    });

    // 켄트백의 TDD 에서 삼각측량이라고 이야기하는 방법.
    // 하드코딩으로 구현한 실제 함수를 일반적 함수로 변경하기 위해 필요하다.
    it('2, 1, 3 일 때는 변경횟수가 1이다.', () => {
      // given
      const numList = [2, 1, 3];

      // when
      const count = getCount('minimum', numList);

      // then
      expect(count).to.be.equal(1);
    });

    it('7, 4, 3, 5, 8, 1, 9 일 때는 변경횟수가 3이다.', () => {
      // given
      const numList = [7, 4, 3, 5, 8, 1, 9];

      // when
      const count = getCount('minimum', numList);

      // then
      expect(count).to.be.equal(3);
    });
  });

  describe('큰 값이 나오면 기준값을 그 값으로 변경하고, 변경 횟수를 구할 때', () => {
    it('1,2,3 일 때는 변경횟수가 2이다.', () => {
      // given
      const numList = [1, 2, 3];

      // when
      const count = getCount('maximum', numList);

      // then
      expect(count).to.be.equal(2);
    });

    // 켄트백의 TDD 에서 삼각측량이라고 이야기하는 방법.
    // 하드코딩으로 구현한 실제 함수를 일반적 함수로 변경하기 위해 필요하다.
    it('2, 1, 3 일 때는 변경횟수가 1이다.', () => {
      // given
      const numList = [2, 1, 3];

      // when
      const count = getCount('maximum', numList);

      // then
      expect(count).to.be.equal(1);
    });

    it('7, 4, 3, 5, 8, 1, 9 일 때는 변경횟수가 2이다.', () => {
      // given
      const numList = [7, 4, 3, 5, 8, 1, 9];

      // when
      const count = getCount('maximum', numList);

      // then
      expect(count).to.be.equal(2);
    });
  });

  describe('처음 값보다 높은 값과 낮은 값의 변경 횟수를 각각 높은 값, 낮은 값 순으로 배열 요소 2개짜리 배열로 만든다', () => {
    it('7, 4, 3, 5, 8, 1, 9 일 때는 [2, 3] 배열을 반환한다.', () => {
      const numList = [7, 4, 3, 5, 8, 1, 9];
      const count = getCountMaximumAndMinimum(numList);

      expect(count).to.have.members([2, 3]);
    });

    // 테스트 케이스 실패
    it('0 9 3 10 2 20 일 때는 [3, 0] 배열을 반환한다.', () => {
      const numList = [0, 9, 3, 10, 2, 20];
      const count = getCountMaximumAndMinimum(numList);

      expect(count).to.have.members([3, 0]);
    });
  });
});
