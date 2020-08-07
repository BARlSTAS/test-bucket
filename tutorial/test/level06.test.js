mocha.setup({
  // bail: true,
  // forbidPending: true,
  slow: '100',
  timeout: '2000',
  ui: 'bdd',
});

describe('success',()=> {
  for(let i = 0; i < 100; i++) {
    it('Success!! '+ i +'case', () => chai.assert.equal(1,1));
  }
})

describe('success',()=> {
  for(let i = 0; i < 100; i++) {
    it('Fail!! '+ i +'case', () => chai.assert.equal(1,2));
  }
})