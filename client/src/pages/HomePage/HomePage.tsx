import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, message } from 'antd';
import './HomePage.css';
import Card from '../../components/Card/Card';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BASE_URL } from '../../config';

interface Post {
  id: number;
  title: string;
  username: string;
  date: Date;
  url: string;
  isFavorite?: boolean
}

interface HomePageProps {
  isFavorite: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ isFavorite }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 
  const user_id = localStorage.getItem('user_id'); 
  const [openFeed,setOpenFeed] = useState(false)

  const fetchPosts = useCallback(async (pageNo: number) => {
    try {
      const headers:any = {};
      if (user_id) {
        headers['user_id'] = user_id;
      }

      const response = await fetch(
        `${BASE_URL}/photos?pageNo=${pageNo}${
        isFavorite?'&isFavorite=true':''}`,
        {
          method: 'GET',
          headers,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setPosts(data?.posts); 
        setHasMore(data.hasMore);
        setOpenFeed(data?.feedOpen)
      } else {
        message.error('Failed to fetch posts');
      }
    } catch (error) {
      message.error('Failed to fetch posts');
    }
  }, [isFavorite, user_id]);

  useEffect(() => {
    setPage(1); 
    setPosts([]);
    fetchPosts(1); 
  }, [isFavorite, fetchPosts]);

  const fetchMorePosts = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage);
  };

  const toggleFavorite = async (postId:number) => {
    try {
      const response = await fetch(`${BASE_URL}/photos/${postId}/favorite`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'user_id':user_id+''
        }
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data)
        message.success("Updated")
        fetchPosts(page);
      } else {
        message.error('Failed to fetch posts');
      }
    } catch (error) {
      message.error('Failed to update');
    }
  }

  return (
    <div className="home-page" id='home'>
      {!user_id?<div className='login-warning'><a href='/login' style={{textDecoration:"none"}}>login</a> to start sharing your favourite pictures with other !</div>:<></>}
      <InfiniteScroll
        className="infinite-scroll-container"
        dataLength={posts?.length}
        next={fetchMorePosts}
        hasMore={hasMore}
        loader={<h4>Loading more posts...</h4>}
        // endMessage={<p>No more posts to show</p>}
      >
        <Row gutter={[16, 16]}>
          {posts?.map((post) => (
            <Col key={post.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                id={post.id}
                image={post.url}
                title={post.title}
                username={post.username}
                liked={post?.isFavorite || false}
                date={new Date(post.date)}
                feedOpen={openFeed}
                onLikeClick={() => openFeed?message.error("Please login first"):toggleFavorite(post.id)}
              />
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
    </div>
  );
};

export default HomePage;
