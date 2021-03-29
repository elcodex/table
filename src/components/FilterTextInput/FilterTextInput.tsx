import { FormEvent, useState, KeyboardEvent } from "react";

interface InputProps {
    text: string | undefined;
    setFilter: (text: string) => void;
    classPrefix: string;
}

export default function FilterTextInput({ text, setFilter, classPrefix }: InputProps) {

    const [inputValue, setInputValue] = useState("");

    const filterClassName = `${classPrefix}__filter`;
    const inputClassName=`${classPrefix}__filter__input`;
    const inputId = `${classPrefix}FilterInput`;
    const labelClassName= `${classPrefix}__filter__label`;
    const hintClassName = `${classPrefix}__filter__hint`;

    function handleInputChange(event: FormEvent<HTMLInputElement>) {
        setInputValue(event.currentTarget.value)
    }

    function handleInputKeyPress(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            event.preventDefault();
            setFilter(inputValue);
        }
    }

    if (!text) {
        return null;
    }

    return (
        <div className={filterClassName}>
            <label className={labelClassName} htmlFor={inputId}>{text}</label>
            <input className={inputClassName}
                type="text"
                id={inputId}
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleInputKeyPress}
            />
            <p className={hintClassName}>Hint: text to find; fieldName:text to find;</p>
        </div>
    )
}