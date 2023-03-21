import Table from 'react-bootstrap/Table';

function ListTable({ header, rows, handleRow }) {

    console.log('rows', rows);

    return (
        <>
            {rows?.length ? (
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            {header.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody >
                        {rows.map((row, index) => (
                            <tr key={index} style={{ color: 'var(--blue)', cursor: 'pointer' }} onClick={() => handleRow(row[index])}>
                                {row.map((cell, index)=>(
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