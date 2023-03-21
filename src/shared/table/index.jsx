import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

function ListTable({ header, rows, handleRow }) {

    const [stateRows, setStateRows] = useState([]);

    useEffect(() => {
        console.log(rows);
        setStateRows(rows);
    }, [rows]);
    return (
        <>
            {stateRows?.length ? (
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            {header.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody >
                        {stateRows.map((row, index) => (
                            <tr key={index} style={{ color: 'var(--blue)', cursor: 'pointer' }} onClick={() => handleRow(row[index])}>
                                {row.map((cell, index) => (
                                    <td key={index}>{cell}</td>
                                ))}
                            </tr>
                        ))}

                    </tbody>
                </Table>
            ) : <span>Nenhum dado encontrado</span>}
        </>


    );
}

export default ListTable;