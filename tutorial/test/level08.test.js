var assert = require('assert')
var level08 = require('../src/level08')

it('Mocha!', ()=> {
    assert.equal('Mocha!',level08)
})

it.skip('No Mocha!', ()=> {
    assert.equal('Mocha!!',level08)
})