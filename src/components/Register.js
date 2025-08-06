import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Example register API call
    try {
      const response = await fetch('/api/register', { 
        method: 'POST', 
        body: JSON.stringify({ username, password }), 
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        navigate('/login');  // Redirect to login after successful registration
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
