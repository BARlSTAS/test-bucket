exports.num_sum = function (a, b) {
    if(!Number.isInteger(a) || !Number.isInteger(b)) {
        throw Error('숫자가 아닙니다.')
    }
    return a + b
}