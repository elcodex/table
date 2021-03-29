import { MouseEvent, useState } from "react";
import { SortOptions } from "../../types/Options";

import {ReactComponent as AscArrow} from "./images/ascArrow.svg";
import {ReactComponent as DescArrow}  from "./images/descArrow.svg";

interface HeaderProps {
    fieldsNames: string[];
    setSort: (options: SortOptions) => void;
    classPrefix: string;
}

export default function TableHeader({ fieldsNames, setSort, classPrefix }: HeaderProps) {

    const [sortedField, setSortedField] = useState<string | null>(null);
    const [sortedDirection, setSortedDirection] = useState<string | null>(null);

    const headerClassName = `${classPrefix}__header`;
    const columnClassName = `${classPrefix}__header__columnButton`;
    
    function handleClick(event: MouseEvent<HTMLDivElement>) {
        const targetElement = event.target;
        if (targetElement instanceof HTMLButtonElement) {
            const fieldName = (targetElement as HTMLButtonElement).value;
            let direction: "asc" | "desc" = "asc";
            if (sortedField === fieldName) {
                direction = sortedDirection === "asc" ? "desc" : "asc";
                setSortedDirection(direction);
            } else {
                setSortedField(fieldName);
                setSortedDirection("asc");
            }

            setSort({fieldName, direction});
        }
    }
    
    return (
        <div className={headerClassName} onClick={handleClick}>
            {fieldsNames.map((name, i) => {
                const formattedName = name.toLowerCase();
                const sortMarker = 
                    sortedField === formattedName ? (sortedDirection === "asc" ? "^" : "v")
                    : "";
                return (
                    <button className={columnClassName} key={i} value={formattedName}>
                        {name}
                        {sortMarker === "^" && <AscArrow />}
                        {sortMarker === "v" && <DescArrow />}
                    </button>
                );
            })}
        </div>
    );
}