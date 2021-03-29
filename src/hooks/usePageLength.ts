export default function usePagesLength(length: number, maxPageRows: number) {
    return Math.ceil(length / maxPageRows);
}