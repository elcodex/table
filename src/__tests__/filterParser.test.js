import { filterParser } from "../helpers/filter";

describe("Basic filter parser tests", () => {
    test("Empty string", () => {
        expect(filterParser("")).toEqual([]);
    });

    test("Just string without fields", () => {
        expect(filterParser("text without fields")).toEqual([["text without fields"]]);
    });

    test("Filter with fields", () => {
        expect(filterParser("fieldName:some text")).toEqual([["fieldname", "some text"]]);
    });
});

describe("Conditional filter parser tests", () => {
    const tests = [
        {input: "f1:t1;f2:t2;", output: [["f1", "t1"], ["f2", "t2"]]},
        {input: "f1:t1; f2:t2", output: [["f1", "t1"], ["f2", "t2"]]},
        {input: "f1:t1 ; ; ; ;f2:t2;", output: [["f1", "t1"], ["f2", "t2"]]},
        {input: "f1 : t1;f2 : t2", output: [["f1", "t1"], ["f2", "t2"]]},
        {input: "f1:t1:f2:t2;", output: [["f1", "t1", "f2", "t2"]]},
        {input: "  f1:t1;f2:t2;", output: [["f1", "t1"], ["f2", "t2"]]},
        {input: ":;  f1:t1;f2:t2;", output: [["f1", "t1"], ["f2", "t2"]]},
        {input: ":", output: []},
        {input: ";", output: []},
        {input: ":;  f1:t1;text;f2:t2;", output: [["f1", "t1"], ["text"], ["f2", "t2"]]},
    ];

    tests.forEach(({input, output}) =>
        test(`${input} -> ${output}`, () =>
            expect(filterParser(input)).toEqual(output)
        )
    )
});