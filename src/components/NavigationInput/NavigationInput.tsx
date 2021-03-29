import { FormEvent, KeyboardEvent, MouseEvent, useState } from "react";

interface InputProps {
    pageEnter: (page: number) => void;
    pagesRange: number[];
    className: string;
}

export default function NavigationInput({ pageEnter, pagesRange, className }: InputProps) {

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

    function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            event.preventDefault();

            const page = Number(value);
            if (!Number.isNaN(page) && pagesRange[0] <= page && page <= pagesRange[1]) {
                pageEnter(page);
                setIsEditable(false);
                setValue("");
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
                    onKeyPress={handleKeyPress}
                    onBlur={handleBlur}
                    value={value}
                /> :
                <button className={buttonClassName} onClick={handleClick} title="enter page number">
                    ...
                </button>
            }
        </>
    )
}