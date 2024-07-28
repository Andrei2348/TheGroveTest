import React from 'react';
import './style.css';
import type { Obj } from '../../App';

interface CustomModalProps {
  obj: Obj;
  isOpen: boolean;
  modalCloseHandler: () => void;
  onDeleteHandler: (rowId: number) => void;
  onEditHandler: (value: boolean) => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ obj, isOpen, modalCloseHandler, onDeleteHandler, onEditHandler }) => {
  if (!isOpen) return null;
  
  return (
    <div className='modal__overlay'>
      <div className='modal__window' >
        <h2 className='modal__title'>Заказ № {obj.rowId + 1}</h2>
        <p className='modal__text'>Обработка {obj.status ? 'выполнена' : 'не выполнена'}</p>
        <button className='modal__button' onClick={() => onEditHandler(obj.status)}>Изменить статус</button>
        <button className='modal__button' onClick={() => onDeleteHandler(obj.rowId)}>Удалить задание</button>
        <button className='modal__close-button' onClick={() => modalCloseHandler()}></button>
      </div>
    </div>
  );
};

export default CustomModal;
