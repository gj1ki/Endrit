import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Lock } from 'lucide-react';
import { Input, Checkbox } from 'antd';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onLoginHandler = () => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    navigate('/dashboard');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#f3f4f6',
      padding: '20px'
    }}>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '32px', 
        borderRadius: '12px', 
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', 
        width: '100%', 
        maxWidth: '360px', // Slightly narrower card
        textAlign: 'center'
      }}>
        {/* Logo Icon */}
        <div style={{ 
          backgroundColor: '#eff6ff', 
          width: '44px', 
          height: '44px', 
          borderRadius: '10px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 16px',
          color: '#4f46e5'
        }}>
          <LogIn size={20} />
        </div>

        <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '2px', color: '#111827' }}>Welcome Back</h1>
        <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '24px' }}>Sign in to manage your tasks</p>
        
        {/* Gap reduced to 12px for a tighter feel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {/* Tighter Username Input */}
          <Input 
            placeholder="Username" 
            prefix={<User size={16} style={{ color: '#9ca3af', marginRight: '4px' }} />}
            style={{ borderRadius: '6px', padding: '6px 10px' }} 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Tighter Password Input */}
          <Input.Password
            placeholder="Password"
            prefix={<Lock size={16} style={{ color: '#9ca3af', marginRight: '4px' }} />}
            style={{ borderRadius: '6px', padding: '6px 10px' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', marginTop: '4px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: '#4b5563' }}>
              <Checkbox /> Remember me
            </label>
            <a href="#" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: '500' }}>Forgot password?</a>
          </div>

          <button 
            onClick={onLoginHandler}
            style={{ 
              width: '100%', 
              backgroundColor: '#4f46e5', 
              color: 'white', 
              padding: '10px', 
              borderRadius: '8px', 
              fontSize: '14px', 
              fontWeight: '600', 
              border: 'none', 
              cursor: 'pointer',
              marginTop: '8px',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4338ca'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4f46e5'}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;