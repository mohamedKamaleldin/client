import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import axios from 'axios';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post('/register', {
        name,
        email,
        password,
      });
      alert('Registration successful. Now you can log in');
    } catch (e) {
      alert('Registration failed. Please try again later');
    }
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-32'>
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        <form className='max-w-md max-auto' onSubmit={registerUser}>
          <input type='text' placeholder='Mohamed'  value={name} onChange={(ev) => setName(ev.target.value)}
          />
          <input type='email'  placeholder='Your@email.com' value={email} onChange={(ev) => setEmail(ev.target.value)}
          />
          <input type='password' placeholder='password' value={password} onChange={(ev) => setPassword(ev.target.value)}
          />
          <button type='submit' className='primary'> Register </button>
          <div className='text-center py-2 text-gray-500'>  Already a member?{' '} <Link className='hover:underline text-black' to={'/login'}> Login now </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
