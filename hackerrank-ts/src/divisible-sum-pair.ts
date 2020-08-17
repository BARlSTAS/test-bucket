export const addEachNumberOfArray = (arr: number[]): number[] => {
    let results: number[] = [];
    for (let i = 0; i < arr.length; i += 1) {
        for (let j = i + 1; j < arr.length; j += 1) {
            const sum = arr[i] + arr[j];
            results = [...results, sum];
        }
    }
    return results;
};

export const getCountMultiples = (arr: number[], selectNum: number): number =>
    addEachNumberOfArray(arr).filter(sum => sum % selectNum === 0).length;
