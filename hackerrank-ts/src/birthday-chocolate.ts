export const getIncrementedResults = (
    arr: number[],
    serialNumber: number
): number[] => {
    let incrementedResults = [];
    let initialNumber = 0;
    for (let i = 0; i < arr.length - 1; i += 1) {
        for (let j = i; j < i + serialNumber; j += 1) {
            if (i + serialNumber > arr.length) {
                break;
            }
            initialNumber += arr[j];
        }
        incrementedResults.push(initialNumber);
        initialNumber = 0;
    }

    return incrementedResults;
};

export const getCountChocolate = (
    arr: number[],
    requireNum: number,
    serialNumber: number
) => {
    if (serialNumber === 1) {
        return arr.filter(number => number === requireNum).length;
    }

    const incrementedResults = getIncrementedResults(arr, serialNumber);
    return incrementedResults.filter(result => result === requireNum).length;
};
