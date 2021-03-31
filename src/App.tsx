import { useState, useEffect } from 'react';
import Table from "./components/Table/Table";

import { generator } from "./helpers/tableGenerator";

import './css/table.css';

interface TableRow {
    [name: string]: string | number
}

function App() {

    const [data, setData] = useState<TableRow[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fieldsNames = ["Title", "Description", "Rating", "AARD"];

    useEffect(() => {
        async function getData(): Promise<void> {
            setIsLoading(true);
            
            setData(await generator([
                {name: "Title", type: "text", length: 20},
                {name: "Description", type: "text", length: 200},
                {name: "Rating", type: "number", length: 5}
            ]));

            setIsLoading(false);
        }

        getData();
    }, []);

    if (isLoading) return <div>Loading data...</div>

    return (
        <div className="App">
            <Table 
                data={data}
                fieldsNames={fieldsNames}
                maxPageRows={10}

                textForDataLength="Records:"
                textForFromToDataRows="Rows:"
                textForPageNumber="Page:"
                textForFilterLabel="Filter:"
            />
        </div>
    );
}

export default App;