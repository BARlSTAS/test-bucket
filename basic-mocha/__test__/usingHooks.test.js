const assert = require('assert');

describe('hooks', () => {
  let beforeText;
  let beforeEachText;

  before(() => {
    beforeText = 'call before';
  });

  beforeEach(() => {
    beforeEachText = 'call beforeEach';
  });

  afterEach(() => {
    beforeEachText = null;
  })

  after(() => {
    beforeText = null;
  });

  it('default', () => {
    let expected = 'call before';
    assert.equal(beforeText, expected);

    expected = 'call beforeEach';
    assert.equal(beforeEachText, expected);
  });
});
