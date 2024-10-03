import React from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import moment from 'moment';
import './Card.css';

interface CardProps {
    id: number;
    image: string;
    title: string;
    username: string;
    date: Date;
    liked: boolean;
    onLikeClick: (id:number) => void;
}

const Card: React.FC<CardProps> = ({id, image, title, username, date, liked, onLikeClick }) => {
    return (
        <div className='card'>
            <img alt="post" className='card-image' src={image} />
            <h2>{title}</h2>
            <div className='card-info'>
                <div className='card-name-date'>
                    <div>{username}</div>
                    <div>{moment(date).format('DD/MM/YYYY')}</div>
                </div>
                <button className='card-button' onClick={() =>onLikeClick(id)}>
                    {liked ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
                </button>
            </div>

        </div>
    );
};

export default Card;