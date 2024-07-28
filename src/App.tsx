import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { setColumnsAndRows, addRow, deleteRow, updateRowStatus, openModal, closeModal, setLoading } from './features/tableSlice';
import Modal from './components/modal/Modal';
import Table from './components/table/Table';
import { generateColumns, generateRows } from './services/tableGenerator';


const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { columns, rows, obj, isLoading } = useSelector((state: RootState) => state.table);
  
  useEffect(() => {
    const fetchData = async () => {
      const cols = await generateColumns();
      const rowsData = await generateRows(cols.length);
      dispatch(setColumnsAndRows({ columns: cols, rows: rowsData }));
      dispatch(setLoading(false));
    };
    dispatch(setLoading(true));
    fetchData();
  }, [dispatch]);

  const handleAddRow = () => dispatch(addRow());
  const modalCloseHandler = () => dispatch(closeModal());
  const openModalHandler = (index: number, rowId: number, value: boolean) =>
    dispatch(openModal({ index, rowId, value }));

  if(isLoading) return null;
  return (
    <div className='main'>
      <Table
        columns={columns}
        rows={rows}
        openModalHandler={openModalHandler}
      />
      <button className='add__task-button button' onClick={handleAddRow}>Добавить заказ</button>
      <Modal
        obj={obj}
        modalCloseHandler={modalCloseHandler}
        onDeleteHandler={() => dispatch(deleteRow(obj.rowId))}
        onEditHandler={() =>
          dispatch(updateRowStatus({ status: obj.status, rowId: obj.rowId, selectedCol: obj.selectedCol }))
        }
      />
    </div>
  );
};

export default App;
