import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ItemPage.css";
import Item from "../entities/Items.tsx";
import Comment from "../entities/comments.tsx";

import Navbar from "../components/NavBar.tsx";
import CommentSection from "../components/CommentSection.tsx";

const ItemPage = () => {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<Item | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [averageRating, setAverageRating] = useState<number>(0);
    const isAdmin = sessionStorage.getItem("isAdmin") === "true";

    useEffect(() => {
        axios.get(`http://localhost:4000/items/${id}`)
            .then((response) => setItem(response.data))
            .catch((error) => console.error("Error fetching item details:", error));

        axios.get(`http://localhost:4000/items/comments/${id}`)
            .then((response) => setComments(response.data))
            .catch((error) => console.error("Error fetching comment details:", error));

        axios.get(`http://localhost:4000/items/average/${id}`)
            .then((response) => setAverageRating(response.data))
            .catch((error) => console.error("Error fetching comment details:", error));
    }, [id]);

    if (!item) return <p>Loading...</p>;
    if (!comments) return <p>No Comments Yet</p>;

    const { itemType, batteryLife, age, size, material } = item;

    const handleDeleteComment = (username: string, item: string | undefined) => {
        axios.delete(`http://localhost:4000/users/comments/${username}/${item}`)
            .then(() => {
                setComments(comments.filter(comment => comment.username !== username));
            })
            .catch(error => console.error("Error deleting comment:", error));
    };

    return (
        <>
            <Navbar />
            <div className="item-detail-container">
                <div className="item-left">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <h2 className="item-name">{item.name}</h2>
                    <div>
                        {averageRating != null ? (
                            <p className="item-average-rating">⭐ Average Rating: {averageRating.toFixed(2)}</p>
                        ) : (
                            <p className="item-average-rating no-rating">No ratings yet</p>
                        )}
                    </div>

                    <p className="item-description">{item.description}</p>
                    <p className="item-price">Price: ${item.price.toFixed(2)}</p>
                    <p className="item-seller">Seller: {item.seller}</p>

                    {itemType === "gpsSportWatches" && batteryLife && (
                        <p className="item-battery">Battery Life: {batteryLife}</p>
                    )}
                    {["antiqueFurniture", "vinyls"].includes(itemType) && age && (
                        <p className="item-age">Age: {age} years</p>
                    )}
                    {itemType === "runningShoes" && size && (
                        <p className="item-size">Size: {size}</p>
                    )}
                    {["antiqueFurniture", "runningShoes"].includes(itemType) && material && (
                        <p className="item-material">Material: {material}</p>
                    )}
                </div>

                <div className="item-mid">
                    <h3>Comments:</h3>
                    {comments.length > 0 ? (
                        <ul>
                            {comments.map((comment) => (
                                <li key={comment.username} className="comment-item">
                                    <p className="comment-username">Username: {comment.username}</p>
                                    <p className="comment-rating">({comment.rating}):</p>
                                    <p className="comment-text">{comment.review}</p>
                                    {isAdmin && (
                                        <button onClick={() => handleDeleteComment(comment.username, item?._id)} className="delete-comment-button">🗑️</button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-comments">No comments yet</p>
                    )}
                </div>

                <div className="item-right">
                    <CommentSection />
                </div>
            </div>
        </>
    );
};

export default ItemPage;