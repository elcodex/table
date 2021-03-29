import { useState } from 'react';
import { TableRow } from '../types/RecordType';
import { PageOptions, SortOptions } from '../types/Options';
import { filterParser } from '../helpers/filter';

import useCurrentData from './useCurrentData';
import useFrom from './useFrom';
import useTo from './useTo';
import usePagesLength from './usePageLength';
import useLength from './useLength';
import useData from './useData';

export default function usePage(allData: TableRow[], maxPageRows: number): [{
    data: TableRow[],
    number: number,
    from: number,
    to: number,
    length: number,
    pagesLength: number
},
(options: PageOptions) => void
] {
    const [currentData, setCurrentData] = useCurrentData(allData);
    const [appliedSort, setAppliedSort] = useState<SortOptions | null>(null);

    const length = useLength(currentData);
    const [number, setNumber] = useState(1);

    const from = useFrom(number, length, maxPageRows);
    const to = useTo(number, length, maxPageRows);
    const pagesLength = usePagesLength(length, maxPageRows);
    const data = useData(currentData, from, to);

    function setPage({nextPageNumber, sort, filter}: PageOptions) {
        let options: {filter?: string[][], sort?: SortOptions} = {};

        if (sort || filter !== undefined) {
            if (filter !== undefined) {
                const parsedFilter = filterParser(filter || "");
                options.filter = parsedFilter;

                if (appliedSort) {
                    options.sort = appliedSort;
                }
            }

            if (sort) {
                setAppliedSort(sort);
                options.sort = sort; 
            }
            setCurrentData(options);
            setNumber(1);

        } else if (nextPageNumber && nextPageNumber !== number) {
            setNumber(nextPageNumber);
        }
    }
    
    return [ { data, number, from, to, length, pagesLength }, setPage ];
}