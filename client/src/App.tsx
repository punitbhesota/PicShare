import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Layout, message } from 'antd';
import Header from './components/Header/Header';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import ShareModal from './components/ShareModal/ShareModal';
import './App.css';
import { BASE_URL } from './config';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [favorites, setFavorites] = useState<boolean>(false);
  const [username,setUsername] = useState<string>('')

  // Login Function
  const handleSubmit = async (name:string) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username:name}),
      });
      const data = await response.json();

      if (response.ok && data.user_id) {
        localStorage.setItem('user_id', data.user_id); 
        localStorage.setItem('username',name); 
        setUsername(name)
        setIsLoggedIn(true)
        window.location.assign('/home')
      
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
    <Router>
      <Layout>
      <Header 
        onLogout={handleLogout} 
        onShareClick={handleSharePicClick} 
        onSelectTab={selectTab}
        name={username}
      />
        <Routes>
        <Route path='/' element={<Navigate to='/home' replace />} />
        <Route path='/home' element={<HomePage isFavorite={favorites} />}></Route>
        <Route path='/login' element={<LoginPage handleSubmit={handleSubmit} />}></Route>
        </Routes>
      <ShareModal visible={isModalVisible} onCancel={handleModalCancel} />
    </Layout>
    </Router>
    
  );
};

export default App;
