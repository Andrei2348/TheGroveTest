import React, { useState, useEffect } from 'react';
import Modal from './components/modal/Modal';
import Table from './components/table/Table';
import { generateColumns, generateRows } from './services/tableGenerator';
import type { Row } from './services/tableGenerator'

export interface Obj {
  status: boolean;
  rowId: number | null;
  selectedCol: number | null;
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [obj, setObj] = useState<Obj>({
    status: false,
    rowId: null,
    selectedCol: null
  })

  // Рендеринг таблицы
  useEffect(() => {
    const fetchData = async () => {
      const cols = await generateColumns();
      const rowsData = await generateRows(cols.length);
      setColumns(cols);
      setRows(rowsData);
      setIsLoading(false)
    };
    setIsLoading(true);
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
    setObj(obj => ({
      ...obj,
      status: false,
      rowId: null,
      selectedCol: null
    }));
  };

  // Функция открытия модального окна
  const openModalHandler = (index: number, rowId: number, value: boolean) => {
    setIsModalOpen(true);

    setObj(obj => ({
      ...obj,
      status: value,
      rowId: rowId,
      selectedCol: index
    }));
  }

  // Удаление выбранного задания
  const onDeleteHandler = (rowId: number): void => {
    setObj(obj => ({
      ...obj,
      rowId: rowId,
    }));
    const newRows = rows.filter(row => row.id !== obj.rowId);
    setRows(newRows);
    modalCloseHandler();
  }

  // Изменение статуса обработки заказа
  const onEditHandler = (value: boolean): void => {
    const newRows = [...rows];
    const rowToUpdate = newRows.find(order => order.id === obj.rowId);
    if(rowToUpdate !== undefined && obj.selectedCol !== null){
      rowToUpdate.cells[obj.selectedCol] = !obj.status;
      setObj(obj => ({
      ...obj,
      status: !value
    }));
      setRows(newRows);
    } 
  }
  if (isLoading) return null;
  return (
    <div>
      <Table 
        columns={columns} 
        rows={rows}
        openModalHandler={openModalHandler}
      />
      
      <button onClick={handleAddRow}>Add Row</button>
      <Modal
        obj={obj}
        isOpen={isModalOpen} 
        modalCloseHandler={modalCloseHandler} 
        onEditHandler={onEditHandler}
        onDeleteHandler={onDeleteHandler}
      />
    </div>
  );
};

export default App;
