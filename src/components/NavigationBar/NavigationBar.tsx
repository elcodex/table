import { MouseEvent, useRef } from 'react';
import NavigationButton from "../NavigationButton/NavigationButton";
import NavigationInput from '../NavigationInput/NavigationInput';

interface barProps {
    lastPage: number,
    currentPage: number,
    setPage: (page: number) => void;
    classPrefix: string;
}

export default function NavigationBar({ lastPage, currentPage, setPage, classPrefix }: barProps) {
    const linkRef = useRef<HTMLAnchorElement>(null);

    const fromPage = Math.max(currentPage - 2, 1);
    const toPage = Math.min(currentPage + 2, lastPage);

    const navigationClassName = `${classPrefix}__navigation`;
    const navigationButtonClassName = `${classPrefix}__navigation__numberButton`;
    const navigationPageInputClassName = `${classPrefix}__navigation__pageInput`;
    const navigationDirectionClassName = `${classPrefix}__navigation__direction`;

    function handleClick(event: MouseEvent<HTMLDivElement>) {
        if ((event.target as HTMLElement)?.tagName === "BUTTON") {
            if (linkRef.current) {
                (linkRef.current as HTMLAnchorElement)?.click();
            }
            const page = Number((event.target as HTMLButtonElement).dataset.number);
            setPage(page);
        }
    }

    function firstBlock() {
        if (fromPage === 1) return null;

        return (
            <>
                <NavigationButton 
                    text="1"
                    dataNumber={1}
                    className={navigationButtonClassName}
                />
                {(fromPage - 1 > 2) && 
                    <NavigationInput 
                        pageEnter={setPage}
                        pagesRange={[2, fromPage - 1]}
                        className={navigationPageInputClassName}
                    />
                }

                {(fromPage - 1 === 2) &&
                    <NavigationButton 
                        text="2"
                        dataNumber={2}
                        className={navigationButtonClassName}
                    />
                }
            </>
        )
    }

    function lastBlock() {
        if (toPage === lastPage) return null;

        return (
            <>
                {(lastPage - toPage > 2) && 
                    <NavigationInput 
                        pageEnter={setPage}
                        pagesRange={[toPage + 1, lastPage - 1]}
                        className={navigationPageInputClassName}
                    />
                }
                
                {(lastPage - toPage === 2) &&
                    <NavigationButton 
                        text={(lastPage - 1).toString()}
                        dataNumber={lastPage - 1}
                        className={navigationButtonClassName}
                    />
                }

                <NavigationButton 
                    text={lastPage.toString()}
                    dataNumber={lastPage}
                    className={navigationButtonClassName}
                />
                
            </>
        )
    }

    function numberedBlock() {
        let elements: JSX.Element[] = [];
        for (let page = fromPage; page <= toPage; page++) {
            const currentButtonClassName = (page === currentPage) ?
                ` ${navigationButtonClassName}_current`
                : ""; 
            
            elements.push(
                <NavigationButton
                    className={`${navigationButtonClassName}${currentButtonClassName}`}
                    text={page.toString()}
                    dataNumber={page}
                    disabled={page === currentPage}
                    key={page.toString()}
                />
            )
        }

        return <>{elements}</>;
    }

    if (lastPage === 0) {
        return null;
    }
    
    return (
        <>
            <a ref={linkRef} href="#table-nav" style={{display: "none"}}>link</a>
            <div className={navigationClassName} onClick={handleClick} id="table-nav">
                <NavigationButton 
                    text="Previous"
                    dataNumber={currentPage - 1}
                    disabled={currentPage === 1}
                    className={navigationDirectionClassName}
                />

                {firstBlock()}
                {numberedBlock()}
                {lastBlock()}

                <NavigationButton
                    text="Next"
                    dataNumber={currentPage + 1}
                    disabled={currentPage === lastPage}
                    className={navigationDirectionClassName}
                />
            </div>
        </>
    );
}