import React, { useState } from 'react';
import { ChatEngine } from 'react-chat-engine';
import './App.css';
import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';

const projectID = 'd0446872-f91c-4655-bb82-f191b52fa7ef';

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
