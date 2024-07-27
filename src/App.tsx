import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';
import Table from './components/Table';
import { generateColumns, generateRows } from './services/tableGenerator';
import type { Row } from './services/tableGenerator'

const App: React.FC = () => {
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'edit' | 'delete'>('');
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const cols = await generateColumns();
      const rowsData = await generateRows(cols.length);
      setColumns(cols);
      setRows(rowsData);
    };
    fetchData();
  }, []);

  const handleAddRow = () => {
    const lastObjectNumber: number = rows.slice(-1)[0].id;
    const newRow: Row = {
      id: lastObjectNumber + 1,
      name: `Заказ ${lastObjectNumber + 1}`,
      cells: Array.from({ length: columns.length }, () => Math.random() >= 0.5),
    };
    setRows([...rows, newRow]);
  };

  const handleEditRow = (index: number) => {
    setSelectedRow(index);
    setModalType('edit');
    setIsModalOpen(true);
  };

  const handleDeleteRow = (index: number) => {
    setSelectedRow(index);
    setModalType('delete');
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const handleModalConfirm = () => {
    if (modalType === 'delete') {
      const newRows = rows.filter((_, i) => i !== selectedRow!);
      setRows(newRows);
    } else if (modalType === 'edit') {
      const newRows = [...rows];
      newRows[selectedRow!].cells = Array.from({ length: columns.length }, () => Math.random() >= 0.5);
      setRows(newRows);
    }
    handleModalClose();
  };

  return (
    <div>
      <Table columns={columns} rows={rows} onEditRow={handleEditRow} onDeleteRow={handleDeleteRow} />
      <button onClick={handleAddRow}>Add Row</button>
      <Modal isOpen={isModalOpen} modalClose={handleModalClose} modalConfirm={handleModalConfirm} modalType={modalType} />
    </div>
  );
};

export default App;
