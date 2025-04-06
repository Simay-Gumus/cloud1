import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar.tsx";
import User from "../entities/Users.tsx";
import "../styles/editUsersPage.css";

const EditUsersPage = () => {
    const [users, setUsers] = useState<User[]>([]); // Users data
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/users")
            .then((response) => setUsers(response.data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    const handleRemoveUser = (userId: string) => {
        axios.delete(`/api/users/${userId}`)
            .then(() => {
                setUsers((prevUsers) => prevUsers.filter(user => user._id !== userId));
                console.log("User removed successfully");
            })
            .catch((error) => console.error("Error removing user:", error));
    };

    const handleCreateUser = () => {
        navigate("/createUser"); // Navigate to the create user page
    };

    return (
        <>
            <Navbar />
            <div className="admin-actions">
                <button onClick={handleCreateUser}>Create User</button>
            </div>
            <div className="grid-container">
                {users.map((user) => (
                    <div key={user._id} className="grid-item">
                        <h3 className="username">{user.username}</h3>
                        <p className="password">{user.password}</p>
                        <div className="user-actions">
                            {user.isAdmin ? (
                                <p className="admin-warning">You cannot delete an admin</p>
                            ) : (
                                <button
                                    className="remove-user-btn"
                                    onClick={() => handleRemoveUser(user._id)}
                                >
                                    Remove User
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default EditUsersPage;
