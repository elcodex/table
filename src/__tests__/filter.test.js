import { render, cleanup, screen, act, waitFor, fireEvent } from '@testing-library/react';

import Table from "../components/Table/Table";

afterEach(cleanup);

const getData = () => {
    return {
        names: ["Title", "Rating", "Description"],
        data: [
            {"title": "Rangers", "description": "some text 10", "rating": 1209},
            {"title": "King of the wood", "description": "some text 1", "rating": 339},
            {"title": "Piano ballad", "description": "some statetext 5", "rating": 4315},
            {"title": "Pullstate", "description": "some text 2", "rating": 678},
            {"title": "One? No, two", "description": "some text 7", "rating": 4},
            {"title": "Kvadrat", "description": "some text 10", "rating": 111},
            {"title": "State and effect", "description": "some text 100", "rating": 345},
        ]
    }
}

describe("Filter", () => {

    test("Filter text, many rows", async () => {
        const {names, data} = await getData();

        await act(async () => {
            render(<Table 
                data={data}
                fieldsNames={names}
                maxPageRows={data.length}
                className="table"
                textForFilterLabel="Filter"
            />);
        });

        await waitFor(() => screen.getByText(names[0]));
        fireEvent.change(screen.getByLabelText("Filter"), {target: {value: "State"}});

        act(() => { fireEvent.keyDown(screen.getByLabelText("Filter"), {key: "Enter"}) });
        await waitFor(() => screen.getByText(names[0]));
        
        expect(screen.getAllByText(/state/i)).toHaveLength(3);
        expect(document.getElementsByClassName("table__rows__row")).toHaveLength(3);
    });

    test("Filter text, one row", async () => {
        const {names, data} = await getData();

        await act(async () => {
            render(<Table 
                data={data}
                fieldsNames={names}
                maxPageRows={data.length}
                className="table"
                textForFilterLabel="Filter"
            />);
        });

        await waitFor(() => screen.getByText(names[0]));
        fireEvent.change(screen.getByLabelText("Filter"), {target: {value: "wood"}});

        act(() => { fireEvent.keyDown(screen.getByLabelText("Filter"), {key: "Enter"}) });
        await waitFor(() => screen.getByText(names[0]));
        
        expect(screen.getAllByText(/wood/i)).toHaveLength(1);
        expect(document.getElementsByClassName("table__rows__row")).toHaveLength(1);
    });

    test("Filter text, no rows", async () => {
        const {names, data} = await getData();

        await act(async () => {
            render(<Table 
                data={data}
                fieldsNames={names}
                maxPageRows={data.length}
                className="table"
                textForFilterLabel="Filter"
            />);
        });

        await waitFor(() => screen.getByText(names[0]));
        fireEvent.change(screen.getByLabelText("Filter"), {target: {value: "none"}});

        act(() => { fireEvent.keyDown(screen.getByLabelText("Filter"), {key: "Enter"}) });
        await waitFor(() => screen.getByText(names[0]));
        
        expect(document.getElementsByClassName("table__rows__row")).toHaveLength(0);
    });

    test("Filter with field", async () => {
        const {names, data} = await getData();

        await act(async () => {
            render(<Table 
                data={data}
                fieldsNames={names}
                maxPageRows={data.length}
                className="table"
                textForFilterLabel="Filter"
            />);
        });

        await waitFor(() => screen.getByText(names[0]));
        fireEvent.change(screen.getByLabelText("Filter"), {target: {value: "rating: 678"}});

        act(() => { fireEvent.keyDown(screen.getByLabelText("Filter"), {key: "Enter"}) });
        await waitFor(() => screen.getByText(names[0]));
        
        expect(document.getElementsByClassName("table__rows__row")).toHaveLength(1);

        expect(
            document.getElementsByClassName("table__rows__row")[0].children[1].textContent.includes("678")
        ).toBeTruthy();
    });
})