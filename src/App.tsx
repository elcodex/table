import { useState, useEffect } from 'react';
import Table from "./components/Table/Table";

import './css/table.css';

interface TableRow {
    [name: string]: string | number
}

function App() {

    const [data, setData] = useState<TableRow[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fieldsNames = ["Title", "Rating", "Year", "Duration", "Genres"];

    useEffect(() => {
        async function getData(): Promise<void> {
            setIsLoading(true);
            
            const response = await fetch(`${process.env.PUBLIC_URL}/data/rating_records.json`);
            if (response.ok) {
                setData(await response.json());
            } else {
                console.log("Could not load data");
            }

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
                maxPageRows={50}

                textForDataLength="Records found:"
                textForFilterLabel="Filter:"
            />
        </div>
    );
}

export default App;