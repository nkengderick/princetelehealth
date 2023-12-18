import './auth.css';
import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import { useLogin } from '../../hooks/useLogin'

const Login = () => {
  const { login, isLoading, error } = useLogin();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.username, formData.password)
    console.log(error)
  };

  return (
    <div className="Auth">
      <h1>Login to TeleHealth</h1>
      <form className={isLoading ? 'blur' : ''} onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        <button type="submit" disabled={isLoading}>Login</button>
      </form>
      <p>New to TeleHealth? <Link to='sign-up'>SignUp</Link></p>
      {isLoading && <ClipLoader className="cliploader" color="var(--color-primary)" />}
    </div>
  );
};

export default Login;
