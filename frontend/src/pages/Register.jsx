import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [referalCode, setReferalCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const reponse = await axios.post('http://localhost:5000/api/user/register', {
        name,
        email,
        password,
        dob,
        phoneNumber,
        referalCode
      });
      console.log(reponse);
      navigate('/login');
      alert('Registration successful!');
    } catch (error) {
      console.error(error);
      alert('Error during registration');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
         <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
        type='date'
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder='Date of Birth'
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        required
        />
        
        <input
        type='text'
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder='phone number'
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required

        />
        <input 
        type='text'
        className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
        placeholder='Referal Code'
        value={referalCode}
        onChange={(e) => setReferalCode(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition"
        >
          Register
        </button>
        <p>Already have an account ? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;