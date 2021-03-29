export function sort(prevValue: string | number, nextValue: string | number) {
    if (prevValue < nextValue) return -1;
    if (prevValue > nextValue) return 1;
    return 0;
}