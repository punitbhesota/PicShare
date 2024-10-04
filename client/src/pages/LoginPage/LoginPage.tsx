import React, { useState } from 'react';
import { Form, Input, Button} from 'antd';
import './LoginPage.css';

interface LoginProps {
  handleSubmit:(name:string)=> void;
}

const LoginPage: React.FC<LoginProps> = ({handleSubmit}) => {
  const [username,setUsername] = useState<string>('')

  return (
    <div className="login-page" id='login'>
      <Form
        name="login"
        layout="vertical"
        className="login-form"
        onFinish={() => handleSubmit(username)}
      >
        <div className="logo">PicShare</div>
        <div className="login-title">Login to start sharing</div>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="username" 
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-btn" block>
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
