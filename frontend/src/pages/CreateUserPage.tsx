import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar.tsx";
import "../styles/CreateUserPage.css";

const CreateUserPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Check if username is unique
            const response = await axios.get(`/api/users/${username}`);
            if (response.data && response.data.length > 0) {
                // Username already exists
                setError("Username already exists");
                return;
            }
            // If username is unique, create the user
            await axios.post("/api/users", {
                username,
                password,
                isAdmin
            });

            // Redirect to the users list or any other page
            navigate("/editUsers");
        } catch (error) {
            console.error("Error creating user:", error);
            setError("Error creating user. Please try again.");
        }
    };

    return (
        <>
            <Navbar />
            <div className="create-user-container">
                <h2>Create User</h2>
                <form onSubmit={handleSubmit} className="create-user-form">
                    <div className="form-field">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="isAdmin">Admin</label>
                        <input
                            type="checkbox"
                            id="isAdmin"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Create User</button>
                </form>
            </div>
        </>
    );
};

export default CreateUserPage;
