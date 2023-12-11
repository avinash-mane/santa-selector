import React from 'react';
import { usePDF } from 'react-to-pdf';

const TableToPDF =({obj})=> {
    const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
    const onClick = () =>{
        targetRef.current.style.visibility="visible"
        toPDF()
        targetRef.current.style.visibility="hidden"
    }

    if(obj.length == 0) return null  
    return (
        <>
        <div>
            <table ref={targetRef}>
            <thead>
                <tr>
                    <th>sr.no</th>
                    <th>employee</th>
                    <th>Santa</th>
                </tr>
            </thead>
            <tbody>
            {obj.map((i, index)=> <tr>
                    <td>{index+1}</td>
                    <td>{i.santa}</td>
                    <td>{i.user}</td>
                </tr>)}
            </tbody>
            </table>
        </div>
      <button onClick={onClick}>Download as PDF</button>
      </>
    );
}

export default TableToPDF;
