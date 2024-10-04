import React from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import moment from 'moment';
import './Card.css';

interface CardProps {
    user_id?:number;
    id: number;
    image: string;
    title: string;
    username: string;
    date: Date;
    liked: boolean;
    onLikeClick: (id:number) => void;
    onImageClick: (username:string,date:Date,image:string) => void;
}

const Card: React.FC<CardProps> = ({user_id, id, image, title, username, date, liked, onLikeClick,onImageClick }) => {
    return (
        <div className='card'>
            <img alt="post" className='card-image' src={image} onClick={()=>onImageClick(username, date,image )}/>
            <h2>{title}</h2>
            {user_id ?<div className='card-info'>
                <div className='card-name-date'>
                    <div>{username}</div>
                    <div>{moment(date).format('DD/MM/YYYY')}</div>
                </div>
                <button className='card-button' onClick={() =>onLikeClick(id)}>
                    {liked ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
                </button>
            </div>:
            <div className='card-info-2'>
            <div className='card-name-date-2'>
                <div>{username}</div>
                <div>{moment(date).format('DD/MM/YYYY')}</div>
            </div>
            </div>}

        </div>
    );
};

export default Card;