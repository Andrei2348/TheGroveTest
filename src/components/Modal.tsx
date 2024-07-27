import React from 'react';

interface CustomModalProps {
  isOpen: boolean;
  rowId: number;
  value: boolean
  modalCloseHandler: () => void;
  onDeleteHandler: (rowId: number) => void;
  onEditHandler: (value: boolean) => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, rowId, value, modalCloseHandler, onDeleteHandler, onEditHandler }) => {
  if (!isOpen) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}>
        <h2 style={{color: 'black',}}>Заказ № {rowId + 1}</h2>
        <p style={{color: 'black',}}>Обработка {value ? 'выполнена' : 'не выполнена'}</p>
        <button onClick={() => onEditHandler(value)}>Изменить</button>
        <button onClick={() => onDeleteHandler(rowId)}>Удалить задание</button>
        <button onClick={() => modalCloseHandler()}>Закрыть</button>
      </div>
    </div>
  );
};

export default CustomModal;
