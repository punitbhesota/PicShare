import React, { useState, useEffect } from 'react';
import { Modal, Image } from 'antd';

interface PictureModalProps {
  visible: boolean;
  onClose: () => void;
  selectedPhoto: {
    url: string;
    title: string;
    username: string;
    date: string;
  } | null;
}

const PictureModal: React.FC<PictureModalProps> = ({ visible, onClose, selectedPhoto }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedPhoto) {
      setIsLoading(true);
      // Load the image here (e.g., using a library like axios)
      // setIsLoading(false);
    }
  }, [selectedPhoto]);

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Image src={selectedPhoto?.url} alt={selectedPhoto?.title} style={{ width: '100%' }} />
          <div className="modal-footer">
            <p>{selectedPhoto?.title}</p>
            <p>{selectedPhoto?.username}</p>
            <p>{selectedPhoto?.date}</p>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PictureModal;