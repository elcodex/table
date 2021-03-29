interface TextProps {
    userText: string | undefined;
    text: string;
    className: string;
}

export default function DisplayedText({ userText, text, className }: TextProps) {
    return (
        <>
            {userText && 
                <div className={className}>
                    {userText} {text}
                </div>
            }
        </>
    )
}