var assert = require('assert')
var {sum} = require('../src/level01')

describe(('더하기 함수를 사용하면') , function() {
    it('1과 2를 매개변수로 전달하면 3을 반환한다.', ()=> {
        var result = sum(1,2);
        assert(result, 3);
    })

    it('1과 2를 매개변수로 전달하면 4는 반환하지 않는다.', () => {
        var result = sum(1,2);
        assert.notEqual(result, 4);
    })
})