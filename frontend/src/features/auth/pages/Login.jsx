import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import '../styles/form.scss';
import { useAuth } from '../hooks/useAuth';
import FormGroup from '../components/FormGroup';

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { loading, handleLogin, notify } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      notify("Please enter email and password", "error");
      return;
    }

    try {
      await handleLogin(email, password);
      navigate('/');
    } catch (err) {
      notify("Email or password is incorrect", "error");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <main className="form-wrapper">
        <h1>Loading....</h1>
      </main>
    )
  }

  return (
    <main className="form-wrapper">
      <div className="form-container">
        <h1>Cinema Login</h1>

        <form onSubmit={handleSubmit} >
          
          <FormGroup label="Email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />   
         
          <FormGroup label="Password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button className='button' type='submit'>Login</button>
          
        </form>
        <p>Don't have an account? <Link to='/register'>Register</Link></p>
      </div>
    </main>
  )
}

export default Login