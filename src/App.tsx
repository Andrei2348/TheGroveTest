import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';
import Table from './components/Table';
import { generateColumns, generateRows } from './services/tableGenerator';
import type { Row } from './services/tableGenerator'

const App: React.FC = () => {
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [status, setStatus] = useState<boolean>(false);
  const [selectedCol, setSelectedCol] = useState<number | null>(null);

  // Рендеринг таблицы
  useEffect(() => {
    const fetchData = async () => {
      const cols = await generateColumns();
      const rowsData = await generateRows(cols.length);
      setColumns(cols);
      setRows(rowsData);
    };
    fetchData();
  }, []);

  // Функция добавления задания
  const handleAddRow = () => {
    const lastObjectNumber: number = rows.slice(-1)[0].id;
    const newRow: Row = {
      id: lastObjectNumber + 1,
      name: `Заказ ${lastObjectNumber + 2}`,
      cells: Array.from({ length: columns.length }, () => Math.random() >= 0.5),
    };
    setRows([...rows, newRow]);
  };

  // Функция закрытия модального окна
  const modalCloseHandler = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  // Функция открытия модального окна
  const openModalHandler = (index: number, rowId: number, value: boolean) => {
    setIsModalOpen(true);
    setSelectedRow(rowId);
    setSelectedCol(index);
    setStatus(value);
  }

  // Удаление выбранного задания
  const onDeleteHandler = (rowId: number): void => {
    setSelectedRow(rowId);
    const newRows = rows.filter(row => row.id !== selectedRow);
    setRows(newRows);
    modalCloseHandler();
  }

  // Изменение статуса обработки заказа
  const onEditHandler = (value: boolean): void => {
    const newRows = [...rows];
    const rowToUpdate = newRows.find(order => order.id === selectedRow);
    if(rowToUpdate !== undefined && selectedCol !== null){
      rowToUpdate.cells[selectedCol] = !status;
      setStatus(!value);
      setRows(newRows);
    } 
  }


  return (
    <div>
      <Table 
        columns={columns} 
        rows={rows}
        openModalHandler={openModalHandler}
      />
      
      <button onClick={handleAddRow}>Add Row</button>
      <Modal
        value={status}
        rowId={selectedRow}
        isOpen={isModalOpen} 
        modalCloseHandler={modalCloseHandler} 
        onEditHandler={onEditHandler}
        onDeleteHandler={onDeleteHandler}
      />
    </div>
  );
};

export default App;
