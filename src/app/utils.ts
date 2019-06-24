export const getRandomElementsFromArray = <T>(arr: T[], count: number): T[] => {
    const result = new Array<T>(count);
    let len = arr.length;
    const taken = new Array<number>(len);

    if (count > len) {
        throw new RangeError('getRandomElementsFromArray: more elements taken than available');
    }

    while (count--) {
        const x = Math.floor(Math.random() * len);
        result[count] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }

    return result;
};
