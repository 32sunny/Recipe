
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()

  try {
    const response = await axios.post('http://localhost:2000/auth/login',{
      email,
      password
    })
      localStorage.setItem('token', response.data.token)

    alert('login successfully')
    setEmail('')
    setPassword('')
    await navigate('/')

  } catch (error) {
    alert('something wrong')
  }

  }

  return (
    <div >

      <h2>Login</h2>
      <form onSubmit={handleSubmit} className='login-form '>

          <input
          placeholder='Email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
       
       

          <input
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
      
      
        <button type="submit">Login</button>

      </form>
    </div>
  );
};

export default Login;


