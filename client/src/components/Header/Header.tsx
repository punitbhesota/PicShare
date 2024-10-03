import React, { useState, useEffect } from 'react';
import { Menu, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import './Header.css';

interface HeaderProps {
  name: string;
  onLogout: () => void;
  onShareClick: () => void;
  onSelectTab: (favorite: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({name, onLogout, onShareClick, onSelectTab }) => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(name);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const userId = localStorage.getItem('user_id');

    if ((storedUsername && userId)|| name) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
      setUsername(null);
    }
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onLogOff = () => {
    setIsLoggedIn(false)
    onLogout()
  }

  return (
    <header className="app-header">
      <div className="logo">PicShare</div>
      {isMobile ? (
        <Button className="mobile-menu-button" onClick={showDrawer} icon={<MenuOutlined />} />
      ) : (
        <div className="desktop-menu">
          {isLoggedIn ? (
            <div className="desktop-menu-buttons">
              <Menu mode="horizontal" defaultSelectedKeys={['1']} className="menu" onClick={(e) => {
                // Check the selected key and pass whether it's Favorite to the parent component
                onSelectTab(e.key === '2');
              }}>
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2">Favorite</Menu.Item>
              </Menu>
              <div className="user-actions">
                <Button type="primary" onClick={onShareClick}>Share Pic</Button>
                <span className="user-name">Hi {username}</span>
                <Button type="default" onClick={onLogout}>Log out</Button>
              </div>
            </div>
          ) : (
            <div className="login-actions">
              <Button type="primary" className="login-btn">Log In</Button>
            </div>
          )}
        </div>
      )}

      {/* Drawer for Mobile View */}
      <Drawer title="Menu" placement="right" onClose={onClose} open={visible}>
        {isLoggedIn ? (
          <div className="mobile-menu-buttons">
            <Menu mode="inline" defaultSelectedKeys={['1']} className="drawer-menu" onClick={(e) => {
              onSelectTab(e.key === '2');
            }}>
              <Menu.Item key="1">Home</Menu.Item>
              <Menu.Item key="2">Favorite</Menu.Item>
            </Menu>
            <Button type="primary" className="share-btn" onClick={onShareClick}>Share Pic</Button>
            <Button type="default" onClick={onLogOff}>Log out</Button>
          </div>
        ) : (
          <div className="login-actions">
            <Button type="primary" className="login-btn">Log In</Button>
          </div>
        )}
      </Drawer>
    </header>
  );
};

export default Header;
