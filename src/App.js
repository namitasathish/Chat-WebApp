import React, { useState } from 'react';
import { ChatEngine } from 'react-chat-engine';
import './App.css';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';

const projectID = '0310f747-a1e4-4edb-8555-7827f2d52b93';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('username'));

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        setLoggedIn(false); // Update state to trigger re-render or redirect
    };

    if (!loggedIn) return <LoginForm handleLogin={() => setLoggedIn(true)} />;

    return (
        <div className="app-container">
            <div className="logout-container">
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <ChatEngine
                height="100vh"
                projectID={projectID}
                userName={localStorage.getItem('username')}
                userSecret={localStorage.getItem('password')}
                renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
            />
        </div>
    );
};

export default App;
