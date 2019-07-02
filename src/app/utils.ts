export const getRandomElementsFromArray = <T>(arr: T[], count: number): T[] => {
    let len = arr.length;
    const taken = new Array<number>(len);

    if (count > len) {
        count = len;
    }

    const result = new Array<T>(count);
    while (count--) {
        const x = Math.floor(Math.random() * len);
        result[count] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }

    return result;
};

// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
export const shuffle = <T>(arr: T[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};
