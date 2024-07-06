import React, { useState } from 'react';
import axios from 'axios';

const projectID = 'd0446872-f91c-4655-bb82-f191b52fa7ef';

const LoginForm = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const authObject = {
            'Project-ID': projectID,
            'User-Name': username,
            'User-Secret': password
        };

        try {
            await axios.get('https://api.chatengine.io/chats', { headers: authObject });
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
            handleLogin(); // Update parent component state upon successful login
            setUsername('');
            setPassword('');
        } catch (error) {
            setError('Incorrect credentials');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        setUsername(''); // Clear username state
        setPassword(''); // Clear password state
        setError(''); // Clear any error message
    };

    return (
        <div className='wrapper'>
            <div className='form'>
                <h1 className='title'>Login to the Chat Application</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className='input'
                        placeholder='Enter your username'
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='input'
                        placeholder='Enter your password'
                        required
                    />
                    <div align="center">
                        <button className='button' type="submit">
                            <span>Start Chatting</span>
                        </button>
                    </div>
                </form>
                <h2 style={{ color: 'red', textAlign: "center" }}>{error}</h2>
                {localStorage.getItem('username') && (
                    <div align="center">
                        <button className='logout-button' onClick={handleLogout}>
                            <span>Logout</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginForm;
