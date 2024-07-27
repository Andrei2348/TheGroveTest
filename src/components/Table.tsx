import React from 'react';
import type { Row } from '../services/tableGenerator'

interface TableProps {
  columns: string[];
  rows: Row[];
  openModalHandler: (index: number, rowId: number, value: boolean) => void; 
}
const Table: React.FC<TableProps> = ({ columns, rows, openModalHandler }) => {

  return (
  <table border="1">
    <thead>
      <tr>
        <th></th>
        {columns.map((col, index) => (
          <th key={index}>{col}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, rowIndex) => (
        <tr key={rowIndex}>
          <td>
            {row.name}
            
          </td>
          {row.cells.map((cell, cellIndex) => (
            <td
              onClick={() => openModalHandler(cellIndex, row.id, cell)}
              key={cellIndex}
              style={{ backgroundColor: cell ? 'lightgreen' : 'white' }}
            ></td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
  )
};

export default Table;
