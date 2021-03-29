import { TableRow } from '../types/RecordType';

export default function useData(data: TableRow[], from: number, to: number): TableRow[] {
    return data.slice(from - 1, to);
}