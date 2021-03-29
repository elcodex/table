import { TableRow } from "../types/RecordType";

export function filterParser(text: string): string[][] {
    if (!text) return [];
    
    const pairs = text
        .toLowerCase()
        .split(/;+/)
        .map(v => v.trim())
        .filter(v => v)
        .map(pair => 
            pair
                .split(/:+/)
                .map(v => v.trim())
        )
        .filter(a => (a.length === 1 && a[0]) || (a.length > 1 && a[0] && a[1]));

    return pairs;
}

export function filterData(data: TableRow[], filters:string[][]) {
    let _data: TableRow[] = Array.from(data, row => Object.assign({}, row));
    
    if (filters.length === 0) return _data;
    
    filters
        .sort((f1: string[], f2: string[]) => f2.length - f1.length)
        .forEach(filter => {
            if (filter.length > 1) {
                _data = _data.filter(row => 
                    filter[1]
                        .split(/[ \t]+/)
                        .every(word => 
                            row[filter[0]] && row[filter[0]].toString().includes(word)
                        )
                )
            } else if (filter.length === 1) {
                _data = _data.filter(row => {
                    const values: (string | number)[] = Object.values(row);
                    
                    return filter[0]
                        .split(/[ \t]+/)
                        .every(word =>
                            values.some(value => value.toString().includes(word))
                        );
                })
            }
        });

    return _data;
}