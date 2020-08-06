// Use "tdd" interface.  This is a shortcut to setting the interface;
// any other options must be passed via an object.
mocha.setup('tdd');

// This is equivalent to the above.
mocha.setup({
  ui: 'tdd',
});

// Examples of options:
mocha.setup({
  allowUncaught: true,
  bail: true,
  checkLeaks: true,
  forbidPending: true,
  global: ['MyLib'],
  retries: 3,
  slow: '100',
  timeout: '2000',
  ui: 'bdd',
});

for(let i = 0; i < 200; i++) {
  test('Success!! '+i+'case', () => chai.assert.equal(1,1));
}

for(let i = 0; i < 10; i++) {
  test('Fail '+i+'case', () => chai.assert.equal(1,0));
}