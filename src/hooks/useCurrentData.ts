import { useReducer } from 'react';
import { TableRow } from '../types/RecordType';
import { SortOptions } from '../types/Options';
import { filterData } from '../helpers/filter';
import { sort } from '../helpers/sort';

export default function useCurrentData(
    data: TableRow[]
): [TableRow[], (action: {sort?: SortOptions, filter?: string[][]}) => void] {

    const initialData = data;

    function updateData(state: TableRow[], action: {sort?: SortOptions, filter?: string[][]}) {
        let newState: TableRow[] = state.map(o => Object.assign({}, o));
        if (action.filter) {
            newState = filterData(initialData, action.filter);
        }

        if (action.sort) {
            const {direction, fieldName} = action.sort;

            newState.sort((a, b) => 
                direction === "asc" ? 
                    sort(a[fieldName], b[fieldName])
                    : sort(b[fieldName], a[fieldName])
            );
        }
        
        return newState;
    }

    const [value, setValue] = useReducer(updateData, data);

    return [value, setValue];
}