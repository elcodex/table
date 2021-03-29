export default function useFrom(
    pageNumber: number,
    length: number,
    maxPageRows: number
): number {
    return Math.min((pageNumber - 1) * maxPageRows + 1, length);
}