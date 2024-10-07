import React, { useState } from 'react';
import { Modal, Input, Form, Button,message } from 'antd';
import { BASE_URL } from '../../config';

interface ShareModalProps {
  visible: boolean;
  onCancel: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ visible, onCancel }) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [loading,setLoading] = useState(false);

  // Share Photo function
  const handleShare = async () => {
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
      message.error('Please log in to share a photo');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/photos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user_id':user_id
        },
        body: JSON.stringify({ url, title,user_id}),
      });

      if (response.ok) {
        message.success('Photo shared successfully!');
        onCancel();
        window.location.reload()
      } else {
        message.error('Failed to share photo');
      }
    } catch (error) {
      message.error('Request failed');
    } finally {
      setTitle('')
      setUrl('')
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Share A New Picture"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="share" type="primary" onClick={handleShare}>
          {loading?'Loading':'Share'}
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <Form.Item label="New picture URL">
          <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="New picture URL" />
        </Form.Item>
        <Form.Item label="Title">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ShareModal;
