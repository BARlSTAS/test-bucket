var assert = require("assert");
const { isMainThread } = require("worker_threads");

describe('Mocha Array Test', function(){
    describe('indexOf() method test', function(){
        it('값이 없으면 -1 리턴', function(){
            assert.equal(-1, [1,2,3].indexOf(5));
            assert.equal(-1, [1,2,3].indexOf(0));
        });
    });
});