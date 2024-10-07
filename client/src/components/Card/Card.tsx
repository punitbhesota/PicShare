import React, { useState } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Image, Modal } from 'antd';
import moment from 'moment';
import './Card.css';

interface CardProps {
    feedOpen?:boolean;
    id: number;
    image: string;
    title: string;
    username: string;
    date: Date;
    liked: boolean;
    onLikeClick: (id:number) => void;
}

const Card: React.FC<CardProps> = ({feedOpen,id, image, title, username, date, liked, onLikeClick }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleImageClick = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className='card'>
             <img alt="post" className='card-image' src={image} onClick={handleImageClick} />
            <h2>{title}</h2>
            {!feedOpen?
            <div className='card-info'>
                <div className='card-name-date'>
                    <div>{username}</div>
                    <div>{moment(date).format('DD/MM/YYYY')}</div>
                </div>
                <button className='card-button' onClick={() =>onLikeClick(id)}>
                    {liked ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
                </button>
            </div>
            :
            <div className='card-info-2'>
                <div className='card-name-date-2'>
                    <div>{username}</div>
                    <div>{moment(date).format('DD/MM/YYYY')}</div>
                </div>
            </div>}

            <Modal
                visible={isModalVisible}
                footer={null}
                onCancel={handleCancel}
                centered
                width={800}
            >
                <div style={{ position: 'relative', textAlign: 'center' }}>
                    <div style={{
                        background: 'rgba(0,0,0)',
                        padding: '3px 10px',
                        display:'flex',
                        justifyContent:"space-between",
                        color:"white",
                        marginTop:'25px'
                    }}>
                        <p>{username}</p>
                        <p>{moment(date).format('DD/MM/YYYY')}</p>
                    </div>
                    <img alt="post" style={{ width: '100%', height: 'auto' }} src={image} />
                </div>
            </Modal>
        </div>
    );
};

export default Card;