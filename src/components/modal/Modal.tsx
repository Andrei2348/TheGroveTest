import React from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import type { Obj } from '../../features/tableSlice';

interface CustomModalProps {
  obj: Obj;
  isOpen: boolean;
  modalCloseHandler: () => void;
  onDeleteHandler: (rowId: number) => void;
  onEditHandler: (value: boolean) => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ obj, modalCloseHandler, onDeleteHandler, onEditHandler }) => {
  const isOpen = useSelector(state => state.table.isOpen);
  const status = useSelector(state => state.table.obj.status);
  const rowId = useSelector(state => state.table.obj.rowId);
  console.log(status)
  if (!isOpen) return null;
  
  return (
    <div className='modal__overlay'>
      <div className='modal__window' >
        <h2 className='modal__title'>Заказ № {rowId + 1}</h2>
        <p className='modal__text'>Обработка {status ? 'выполнена' : 'не выполнена'}</p>
        <button className='modal__button button' onClick={() => onEditHandler(status)}>Изменить статус</button>
        <button className='modal__button button' onClick={() => onDeleteHandler(rowId)}>Удалить задание</button>
        <button className='modal__close-button' onClick={() => modalCloseHandler()}></button>
      </div>
    </div>
  );
};

export default CustomModal;
