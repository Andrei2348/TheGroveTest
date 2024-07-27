import React from 'react';

interface CustomModalProps {
  isOpen: boolean;
  modalConfirm: () => void;
  modalClose: () => void;
  modalType: 'редактировать' | 'удалить';
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, modalConfirm, modalClose, modalType }) => {
  if (!isOpen) return null;

  const handleModalConfirm = () => modalConfirm();
  const handleModalClose = () => modalClose();

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
        <h2 style={{color: 'black',}}>{modalType === 'delete' ? 'Удалить задание' : 'Редактировать задание'}</h2>
        <p style={{color: 'black',}}>Вы действительно хотите {modalType} это задание?</p>
        <button onClick={handleModalConfirm}>Да</button>
        <button onClick={handleModalClose}>Нет</button>
      </div>
    </div>
  );
};

export default CustomModal;
