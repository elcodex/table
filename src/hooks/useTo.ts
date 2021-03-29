export default function useTo(
    pageNumber: number,
    length: number,
    maxPageRows: number
): number {
    return Math.min(pageNumber * maxPageRows, length);
}