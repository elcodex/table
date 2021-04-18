import { FormEvent, KeyboardEvent, MouseEvent, useRef, useState } from "react";

interface InputProps {
    pageEnter: (page: number) => void;
    pagesRange: number[];
    className: string;
}

export default function NavigationInput({ pageEnter, pagesRange, className }: InputProps) {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const [isEditable, setIsEditable] = useState(false);
    const [value, setValue] = useState(""); 

    const inputClassName = `${className}__input`;
    const buttonClassName = `${className}__button`;

    function handleClick(event: MouseEvent<HTMLButtonElement>) {
        event.stopPropagation();
        setIsEditable(true);
    }

    function handleChange(event: FormEvent<HTMLInputElement>) {
        setValue(event.currentTarget.value);
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            event.preventDefault();

            const page = Number(value);
            if (!Number.isNaN(page) && pagesRange[0] <= page && page <= pagesRange[1]) {
                pageEnter(page);
                setIsEditable(false);
                setValue("");
            }
            if (linkRef.current) {
                (linkRef.current as HTMLAnchorElement)?.click();
            }
        }
    }

    function handleBlur() {
        setIsEditable(false);
    }

    return (
        <>
            {isEditable ?
                <input className={inputClassName} autoFocus={true} size={5}
                    type="text" 
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    value={value}
                    data-testid={"pageInput"}
                /> :
                <button className={buttonClassName} onClick={handleClick} title="enter page number">
                    ...
                </button>
            }
            <a ref={linkRef} href="#table-nav" style={{display: "none"}}>link</a>
        </>
    )
}