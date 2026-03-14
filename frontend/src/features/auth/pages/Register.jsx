import React, { useState } from 'react'
import '../styles/form.scss';
import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';
import FormGroup from '../components/FormGroup';

const Register = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate();

    const { loading, handleRegister, notify } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!email.trim() || !password || !username) {
                notify("Please enter email, password and username", "error");
                return;
            }
            await handleRegister(username, email, password);
            navigate('/');
        } catch (err) {
            console.log(err);
            notify("Registration failed, please retry again", 'error');
        }
    }

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
                <h1>Cinema Registration</h1>

                <form onSubmit={handleSubmit} >

                    <FormGroup label="Username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />

                    <FormGroup label="Email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <FormGroup label="Password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button className='button' type='submit'>Register</button>
                </form>

                <p>Already have an account? <Link to='/login'>Login</Link></p>

            </div>
        </main>
    )
}

export default Register