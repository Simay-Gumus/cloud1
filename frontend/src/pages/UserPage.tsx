import { useEffect, useState } from "react";
import '../styles/UserPage.css'; // Import the CSS for styling
import User from "../entities/Users.tsx";
import {useParams} from "react-router-dom";
import axios from "axios";
import Navbar from "../components/NavBar.tsx";

const UserPage = () => {
    const { username } = useParams<{ username: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [averageRating, setAverageRating] = useState<number>(0)

    useEffect(() => {
        axios.get(`http://localhost:4000/users/${username}`)
            .then((response) => setUser(response.data))
            .catch((error) => console.error("Error fetching item details:", error));

        axios.get(`http://localhost:4000/users/rating/${username}`).then((response) => setAverageRating(response.data))
            .catch((error) => console.error("Error fetching item details:", error));

    }, [username]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="username-section">
                    <p className="username">{user.username}</p>
                    {averageRating !== null ? (
                        <p className="average-rating">⭐ Average Rating: {averageRating.toFixed(2)}</p>
                    ) : (
                        <p className="average-rating no-rating">No ratings yet</p>
                    )}
                </div>
                <div className="item-right">
                    <h3 className="comments-heading">Comments:</h3>
                    {user.comments?.length > 0 ? (
                        <ul className="comments-list">
                            {user.comments.map((comment) => (
                                <li key={comment.item} className="comment-item">
                                    <p className="comment-rating">Rating: {comment.rating}</p>
                                    <p className="comment-text">{comment.review}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-comments">No comments yet</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserPage;
