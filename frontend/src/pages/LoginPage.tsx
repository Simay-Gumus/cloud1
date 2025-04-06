import React, { useState } from 'react';
import '../styles/LoginPage.css';
import Navbar from "../components/NavBar.tsx";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username, // your email state
                password: password, // your password state
            }),
        });
        const data = await response.json();

        if (response.ok) {
            sessionStorage.setItem("username", username);
            window.location.reload();
            sessionStorage.setItem("isAdmin", data.user.isAdmin);
            alert("Login successfull");
        } else {
            alert('Login failed');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!username || !password) {
            setError('Please enter both email and password.');
            return;
        }
        // Here you would handle authentication, e.g., make an API call
        handleLogin()
    };


    return (
        <>
            <Navbar />
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="username"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
            </>
    );
};

export default LoginPage;
