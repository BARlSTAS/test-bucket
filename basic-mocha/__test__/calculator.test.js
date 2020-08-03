const assert = require('assert');

const { calculator } = require('../src/calculator');

describe('Calculator', () => {
  let aCalculator;
  before(() => {
    aCalculator = calculator();
  });

  it('add', () => {
    assert.equal(aCalculator('add', 1, 2), 3);
  });

  it('subtract', () => {
    // positive
    assert.equal(aCalculator('sub', 4, 1), 3);
    
    // negative
    assert.equal(aCalculator('sub', 1, 4), -3);

    // zero
    assert.equal(aCalculator('sub', 1, 1), 0);
  });

  it('multiply', () => {
    assert.equal(aCalculator('mul', 4, 5), 20);
    assert.equal(aCalculator('mul', 4, 0), 0);
    assert.equal(aCalculator('mul', -1, 5), -5);
  });

  it('division', () => {
    assert.equal(aCalculator('dvs', 4, 2), 2);
    assert.throws(() => aCalculator('dvs', 0, 2));
    assert.throws(() => aCalculator('dvs', 4, 0));
  });

  it('square root', () => {
    assert.equal(aCalculator('sqr', 4), 16);
    assert.equal(aCalculator('sqr', 0), 0);
  })
});
