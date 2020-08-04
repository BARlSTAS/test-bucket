exports.TestArr = class TestArr {
    constructor(arr){
        this.__value = arr
    }
    getValue() {
        return this.__value
    }
    pop() {
        return pop(this.__value)
    }
    getLength() {
        return getLength(this.__value)
    }
}

function pop(arr) {
    return arr.pop()
}

function getLength(arr) {
    return arr.length
}