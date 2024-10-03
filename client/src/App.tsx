import React, { useEffect, useState } from 'react';
import { Layout, message } from 'antd';
import Header from './components/Header/Header';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import ShareModal from './components/ShareModal/ShareModal';
import './App.css';

const { Content } = Layout;

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [favorites, setFavorites] = useState<boolean>(false);
  const [username,setUsername] = useState<string>('')

  // Login Function
  const handleSubmit = async (name:string) => {
    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name}),
      });
      const data = await response.json();

      if (response.ok && data.user_id) {
        localStorage.setItem('user_id', data.user_id); 
        localStorage.setItem('username',name); 
        setUsername(name)
        setIsLoggedIn(true)

        message.success('Logged in successfully!');
      } else {
        message.error('Login failed');
      }
    } catch (error) {
      message.error('Login request failed');
    }
  };

  // Logout function
  const handleLogout = async () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    message.success('Logged out successfully');
  };

  const handleSharePicClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const selectTab = (favorite: boolean) => {
    setFavorites(favorite);
  };

  useEffect(()=>{
    const id = localStorage.getItem('user_id'); 
    const name = localStorage.getItem('username');
    if(id && name){
      setUsername(name)
      setIsLoggedIn(true)
    }
  },[])

  return (
    <Layout>
      <Header 
        onLogout={handleLogout} 
        onShareClick={handleSharePicClick} 
        onSelectTab={selectTab}
        name={username}
      />
      <Content className="content">
        {isLoggedIn ? (
          favorites ? (
            <HomePage isFavorite={true} /> 
          ) : (
            <HomePage isFavorite={false} /> 
          )
        ) : (
          <LoginPage handleSubmit={handleSubmit} />
        )}
      </Content>
      <ShareModal visible={isModalVisible} onCancel={handleModalCancel} />
    </Layout>
  );
};

export default App;
