// Login.js
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Signup
  const navigate = useNavigate();

  // Handle Login
  const onLoginFinish = async (values) => {
    const { username, email, password } = values;

    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      const user = response.data.find(
        (user) => user.username === username && user.email === email && user.password === password
      );

      if (user) {
        message.success('White person entered the hood!');
        navigate(`/dashboard`, { state: { username: user.username } });
      } else {
        message.error('Nigga get your ass out of here!');
      }
    } catch (error) {
      console.error('Error during login:', error);
      message.error('An error occurred while logging in.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Signup
  const onSignupFinish = async (values) => {
    const { username, email, password } = values;

    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      const userExists = response.data.some(user => user.username === username);

      if (userExists) {
        message.error('Username already exists! Please choose another.');
      } else {
        await axios.post('http://localhost:5000/api/users', { username, email, password });
        message.success('User created successfully! Switching to login.');
        setIsLogin(true); // Switch to login form
      }
    } catch (error) {
      console.error('Error during signup:', error);
      message.error('An error occurred while signing up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Form
        name={isLogin ? "login" : "signup"}
        layout="vertical"
        onFinish={isLogin ? onLoginFinish : onSignupFinish}
        style={{ width: 300, padding: '2rem', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}
      >
        <h2 style={{ textAlign: 'center' }}>{isLogin ? 'Login' : 'Signup'}</h2>

        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please enter your username!' }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {isLogin ? 'Login' : 'Signup'}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Create an account' : 'Already have an account? Login'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
