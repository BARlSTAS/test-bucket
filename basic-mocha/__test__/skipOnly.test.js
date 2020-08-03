const assert = require('assert');

describe('skip and only test', () => {
  // only, another test all skip.
  // it.only('only', () => {
  it('only', () => {
    assert.equal('', '');
  });

  it.skip('skip', () => {
    assert.equal('', '');
  })
});
