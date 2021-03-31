import { render, cleanup, screen, act, waitFor, fireEvent } from '@testing-library/react';

import { generator } from "../helpers/tableGenerator";
import Table from "../components/Table/Table";

afterEach(cleanup);

const getData = async () => {
    return {
        names: ["Title", "Description"],
        data: await generator([
            {name: "Title", type: "text", length: 20},
            {name: "Description", type: "text", length: 5}
        ])
    }
}

describe("Pages", () => {
    test("Single page", async () => {
        const {names, data} = await getData();

        await act(async () => {
            render(<Table 
                data={data}
                fieldsNames={names}
                maxPageRows={data.length}
                className="table"
            />);
        });

        await waitFor(() => screen.getByText(names[0]));

        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.queryByText("2")).not.toBeInTheDocument();

        expect(screen.getByText("1")).toHaveClass("table__navigation__numberButton_current");
        expect(screen.getByText("1")).toHaveClass("table__navigation__numberButton");

        expect(screen.getByText("1")).toBeDisabled;
        expect(screen.getByText("Previous")).toBeDisabled;
        expect(screen.getByText("Next")).toBeDisabled;
    });

    test("More than one page", async () => {
        const {names, data} = await getData();

        await act(async () => {
            render(<Table 
                data={data}
                fieldsNames={names}
                maxPageRows={1}
                className="table"
            />);
        });

        await waitFor(() => screen.getByText(names[0]));

        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText(data.length.toString())).toBeInTheDocument();

        expect(screen.getByText("1")).toBeDisabled;
        expect(screen.getByText("Previous")).toBeDisabled;
        expect(screen.getByText("Next")).toBeEnabled;
        expect(screen.getByText("2")).toBeEnabled;
        expect(screen.getByText(data.length.toString())).toBeEnabled;
    });

    test("Click on the page number 2", async () => {
        const {names, data} = await getData();
        
        await act(async () => {
            render(<Table 
                data={data}
                fieldsNames={names}
                maxPageRows={1}
                className="table"
            />);
        });

        await waitFor(() => screen.getByText(names[0]));
        act(() => {
            screen.getByText("2").click();
        });

        expect(screen.getByText("2")).toBeInTheDocument();

        expect(screen.getByText("2")).toHaveClass("table__navigation__numberButton_current");
        expect(screen.getByText("2")).toHaveClass("table__navigation__numberButton");
        expect(screen.getByText("1")).toHaveClass("table__navigation__numberButton");
        expect(screen.getByText("1")).not.toHaveClass("table__navigation__numberButton_current");
        expect(screen.getByText("3")).toHaveClass("table__navigation__numberButton");
        expect(screen.getByText("3")).not.toHaveClass("table__navigation__numberButton_current");

        expect(screen.getByText("4")).toBeInTheDocument();
        expect(screen.getByText(data.length.toString())).toBeInTheDocument();

        expect(screen.getByText("1")).toBeEnabled();
        expect(screen.getByText("2")).toBeDisabled();

        expect(screen.getByText("Previous")).toBeEnabled;
        expect(screen.getByText("Next")).toBeEnabled;
    });

    test("Click on the page number 4", async () => {
        const {names, data} = await getData();
        
        await act(async () => {
            render(<Table 
                data={data}
                fieldsNames={names}
                maxPageRows={1}
                className="table"
            />);
        });

        await waitFor(() => screen.getByText(names[0]));
        act(() => { screen.getByText("3").click(); });
        act(() => { screen.getByText("4").click(); });

        for (let number = 1; number <= 4 + 2; number++) {
            expect(screen.getByText(number.toString())).toBeInTheDocument();
        }
        expect(screen.getByText("4")).toHaveClass("table__navigation__numberButton_current");
    });

    test("Click on the last page", async () => {
        const {names, data} = await getData();
        
        await act(async () => {
            render(<Table 
                data={data}
                fieldsNames={names}
                maxPageRows={1}
                className="table"
            />);
        });

        await waitFor(() => screen.getByText(names[0]));
        act(() => {
            screen.getByText(data.length.toString()).click();
        });

        expect(screen.getByText(data.length.toString())).toBeInTheDocument();

        expect(screen.getByText(data.length.toString())).toHaveClass("table__navigation__numberButton_current");
        expect(screen.getByText(data.length.toString())).toHaveClass("table__navigation__numberButton");

        expect(screen.getByText("Previous")).toBeEnabled;
        expect(screen.getByText("Next")).toBeDisabled;
    });

    test("Enter page number", async () => {
        const {names, data} = await getData();
        
        await act(async () => {
            render(<Table 
                data={data}
                fieldsNames={names}
                maxPageRows={1}
                className="table"
            />);
        });

        await waitFor(() => screen.getByText(names[0]));
        act(() => {
            screen.getByText("...").click();
        });
        fireEvent.change(screen.getByTestId("pageInput"), {target: {value: "10"}});
        act(() => { fireEvent.keyDown(screen.getByTestId("pageInput"), {key: "Enter"}) });
        
        expect(screen.getByText("10")).toBeInTheDocument();
        expect(screen.getByText("10")).toHaveClass("table__navigation__numberButton_current");
        expect(screen.getAllByText("...")).toHaveLength(2);
    });


});