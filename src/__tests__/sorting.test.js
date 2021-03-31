import { render, cleanup, screen, act } from '@testing-library/react';

import Table from "../components/Table/Table";

afterEach(cleanup);

const getData = () => {
    return {
        names: ["Title", "Description"],
        data: [
            {"title": "10a", "description": "some text 10"},
            {"title": "1s", "description": "some text 1"},
            {"title": "5r", "description": "some text 5"},
            {"title": "2f", "description": "some text 2"},
            {"title": "7t", "description": "some text 7"},
            {"title": "10u", "description": "some text 10"},
            {"title": "100q", "description": "some text 100"},
        ]
    }
}

describe("Sorting", () => {
    test("Ascending sort", async () => {
        const {names, data} = await getData();

        await act(async () => {
            render(<Table 
                data={data}
                fieldsNames={names}
                maxPageRows={4}
                className="table"
            />);
        });

        act(() => {
            screen.getByText("Title").click();
        });

        const rows = [...document.getElementsByClassName("table__rows__row")];

        const isAscSorting = rows
            .map(row => row.children[0].textContent)
            .every((columnText, i, columns) => 
                (i === 0) || (columnText > columns[i-1])
            );

        expect(isAscSorting).toBeTruthy();
    });

    test("Descending sort", async () => {
        const {names, data} = await getData();

        await act(async () => {
            render(<Table 
                data={data}
                fieldsNames={names}
                maxPageRows={4}
                className="table"
            />);
        });

        act(() => {
            screen.getByText("Title").click();
        });
        act(() => {
            screen.getByText("Title").click();
        });

        const rows = [...document.getElementsByClassName("table__rows__row")];

        const isDescSorting = rows
            .map(row => row.children[0].textContent)
            .every((columnText, i, columns) => 
                (i === 0) || (columnText < columns[i-1])
            );

        expect(isDescSorting).toBeTruthy();
    });

})