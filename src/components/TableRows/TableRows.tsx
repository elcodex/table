import { TableRow } from '../../types/RecordType';

interface TableProps {
    pageData: TableRow[];
    fieldsNames: string[];
    filter?: string[][]; // not used yet
    classPrefix: string;
}

export default function TableRows({ pageData, fieldsNames, classPrefix }: TableProps) {
    const rowsClassName = `${classPrefix}__rows`;
    const rowClassName = `${classPrefix}__rows__row`;
    const columnClassName = `${classPrefix}__row__column`;

    return (
        <div className={rowsClassName}>
            {pageData.map((data, i) =>
                <div className={rowClassName} key={i}>
                    {fieldsNames.map((name, j) =>
                        <div className={columnClassName} key={j}>
                            {data[name]?.toString()}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}