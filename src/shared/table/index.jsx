import Table from 'react-bootstrap/Table';
import { isValidHttpUrl } from '../../helpers';

function ListTable({ header, rows, handleRow }) {

    return (
        <>
            {rows?.length ? (
                <Table striped bordered hover variant="dark" >
                    <thead>
                        <tr>
                            {header.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody >
                        {rows.map((row, index) => (
                            <tr key={index} style={{ color: 'var(--blue)', cursor: 'pointer' }} onClick={() => handleRow(row)}>
                                {row.map((cell, index) => (

                                    <>
                                        {!isValidHttpUrl(cell) ? (
                                            <td key={index} style={{verticalAlign: 'top'}}>{cell}</td>
                                        ) : (
                                            <td key={index}><img src={cell} className="fluid" style={{width: '10%'}}/></td>
                                        )}
                                    </>

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