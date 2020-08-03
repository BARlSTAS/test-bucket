const assert = require('assert');
const { getHello, getText } = require('../src/common');

describe('common', () => {
  it('getHello, func call.', () => {
    const name = 'thiporia';
    const expected = ['Hello,', name].join(' ');
    assert.equal(getHello(name), expected);
  });

  it('getText, async(axios).', (done) => {
    const expected = {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false
    };
    
    getText().then(({ data }) => {
      assert.deepEqual(data, expected);
    })
    .catch((err) => console.error(err));

    done();
  });
});
