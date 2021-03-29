interface ButtonProps {
    text: string;
    dataNumber: number;
    disabled?: boolean;
    className: string;
}

export default function NavigationButton({
    text, 
    dataNumber, 
    disabled = false, 
    className
}: ButtonProps) {
    
    return (
        <button className={className}
            data-number={dataNumber}
            disabled={disabled}
        >
            {text}
        </button>            
    )
}