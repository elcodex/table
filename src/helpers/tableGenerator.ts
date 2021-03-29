
export async function generator(pattern: {name:string, type: "text" | "number", length: number}[]) {
    const rows = 100 + Math.floor(Math.random() * 100);

    return [...new Array(rows)].map(() => {
        let row: {[name: string]: string} = {};
        pattern.forEach(({name, type, length}, i) => {
            row[name.toLowerCase()] = columnGenerator(type, length);
        });

        return row;
    });
}

function columnGenerator(type: "text" | "number", length: number): string {
    return type === "text" ? textGenerator(length) : numberGenerator(length);
}

function textGenerator(length: number): string {
    const letters = "qwrtypsdfghjklzxcvbnm" + "aeuoi".repeat(3) + " ".repeat(5) + ".".repeat(2);

    let nextLetter = letters.charAt(Math.floor(Math.random() * 26));
    let isUpperCase = true;

    let text = [];
    for (let i = 0; i < length; i++) {
        text.push(isUpperCase ? " " + nextLetter.toUpperCase(): nextLetter);
        isUpperCase = nextLetter === ".";
        nextLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    }

    return text.join("");
}

function numberGenerator(length: number): string {
    const digits = "1234567890";

    let nextDigit = digits.charAt(Math.floor(Math.random() * (digits.length - 1)));
    let n = [];
    for (let i = 0; i < length; i++) {
        n.push(nextDigit);
        nextDigit = digits.charAt(Math.floor(Math.random() * digits.length));;
    }

    return n.join("");
}