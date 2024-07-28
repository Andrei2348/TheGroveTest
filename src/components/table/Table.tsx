import React from 'react';
import type { Row } from '../../services/tableGenerator';
import './style.css';

interface TableProps {
  columns: string[];
  rows: Row[];
  openModalHandler: (index: number, rowId: number, value: boolean) => void; 
}

const Table: React.FC<TableProps> = ({ columns, rows, openModalHandler }) => {

  return (
  <table className='table' border="1">
    <thead>
      <tr>
        {columns.map((col, index) => (
          <th className='table__column-title' key={index}>{col}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, rowIndex) => (
        <tr key={rowIndex}>
          <td className='table__row-title'>
            {row.name}
            
          </td>
          {row.cells.map((cell, cellIndex) => (
            <td
            key={cellIndex}
            style={{ backgroundColor: cell ? 'lightgreen' : 'white' }}
            onClick={() => openModalHandler(cellIndex, row.id, cell)}
            ></td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
  )
};

export default Table;
