import React from 'react';
import type { Row } from '../services/tableGenerator'

interface TableProps {
  columns: string[];
  rows: Row[];
  onEditRow: (index: number) => void;
  onDeleteRow: (index: number) => void;
}

const Table: React.FC<TableProps> = ({ columns, rows, onEditRow, onDeleteRow }) => (
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
            <button onClick={() => onEditRow(rowIndex)}>Редактировать</button>
            <button onClick={() => onDeleteRow(rowIndex)}>Удалить</button>
          </td>
          {row.cells.map((cell, cellIndex) => (
            <td
              key={cellIndex}
              style={{ backgroundColor: cell ? 'lightgreen' : 'white' }}
            ></td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
