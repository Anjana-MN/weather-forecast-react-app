// components/LoginPage.js
import React , { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage({ onLoginSuccess }) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const navigate = useNavigate(); 

  // Handle input changes for username and password
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('in login page', username,password);
    // Simulate login (you can replace this with real authentication logic)
    const authToken = encodeBase64(username,password)
    try{
      const response = await fetch('http://localhost:8081/api/user/login', {
        method:'POST',
        headers: {'Authorization':authToken}
      })
      if(response.ok){
        onLoginSuccess(); // Call the success handler passed from the parent
        sessionStorage.setItem("authorization", authToken);
        console.log('session',sessionStorage)
        navigate('/weather')
      }
    }catch(error){
      console.log(error);
    }
    
  };

  const encodeBase64 = (username,password) => {
    console.log('generating token'+username+' '+password);
    return 'Basic ' + btoa(username + ':' + password);
  }

  return (
    <div className='mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit 
    shadow-xl shadow-gray-400'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>

        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
