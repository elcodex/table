import { TouchEvent } from 'react';
import TableRows from "../TableRows/TableRows";
import FilterTextInput from "../FilterTextInput/FilterTextInput";
import NavigationBar from "../NavigationBar/NavigationBar";

import usePage from "../../hooks/usePage";
import TableHeader from "../TableHeader/TableHeader";
import DisplayedText from "../DisplayedText/DisplayedText";

interface TableProps {
    data: TableRow[];
    fieldsNames: string[];
    maxPageRows?: number;
    className?: string;

    textForFilterLabel?: string; 

    textForDataLength?: string; // ${text} ${length}
    textForFromToDataRows?: string; // ${text} ${from} - ${to}
    textForPageNumber?: string; // ${text} ${pageNumber}
}

interface TableRow {
    [name: string]: string | number
}

export default function Table({
    data,
    fieldsNames,
    maxPageRows = 50,
    className = "table",
    textForFilterLabel,
    textForDataLength,
    textForFromToDataRows,
    textForPageNumber
}: TableProps) {

    const [pageData, setPageData] = usePage(data, maxPageRows);
    const formattedFieldsNames = fieldsNames.map(name => name.toLowerCase());

    let startX: number | null;

    function handleTouchStart(event: TouchEvent) {
        if (event.targetTouches.length > 1) {
            startX = null;
        }
        else if (event.targetTouches.length === 1) {
            startX = event.targetTouches[0].clientX;
        }
    }

    function handleTouchEnd(event: TouchEvent) {
        const MIN_DISTANCE = 50;

        console.log("touch end", startX);
        
        if (startX) {
            const endX = event.targetTouches[0].clientX;
            
            if (Math.abs(endX - startX) > MIN_DISTANCE) {
                if (startX < endX && pageData.number > 1) {
                    setPageData({nextPageNumber: pageData.number - 1});
                }
                else if (startX > endX && pageData.number < pageData.pagesLength) {
                    setPageData({nextPageNumber: pageData.number + 1});
                }
            }  
        }

        startX = null;
    }

    function handleTouchCancel(e: TouchEvent) {
        startX = null;
    }

    return (
        <div className={className}
            onTouchCancel={handleTouchCancel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >

            <FilterTextInput
                text={textForFilterLabel}
                setFilter={text => setPageData({filter: text})}
                classPrefix={className}
            />

            <DisplayedText 
                className={`${className}__lengthText`}
                userText={textForDataLength}
                text={pageData.length.toString()}
             />
            
            <DisplayedText
                className={`${className}__rangeText`}
                userText={textForFromToDataRows}
                text={`(${pageData.from} - ${pageData.to})`}
            />

            <DisplayedText
                className={`${className}__pageNumberText`}
                userText={textForPageNumber}
                text={pageData.number.toString()}
            />
            
            <TableHeader
                fieldsNames={fieldsNames}
                setSort={(options) => setPageData({sort: options})}
                classPrefix={className}
            />

            <TableRows 
                pageData={pageData.data}
                fieldsNames={formattedFieldsNames}
                classPrefix={className}
            />

            <NavigationBar 
                currentPage={pageData.number} 
                lastPage={pageData.pagesLength}
                setPage={(page) => setPageData({nextPageNumber: page})}
                classPrefix={className}
            />
        </div>
    );
}