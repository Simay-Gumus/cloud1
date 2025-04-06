import { useState } from 'react';
import { Star } from 'lucide-react'; // Or any other icon library
import Comment from '../entities/comments';
import '../styles/CommentSection.css'
import {useParams} from "react-router-dom";
import axios from "axios";

const CommentSection = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const username = sessionStorage.getItem("username");
    const { id } = useParams<{ id: string }>();


    const handleSubmit = async () => {
        console.log("handleSubmit called");
        if (!newComment.trim() || rating === 0) return;
        const comment: Comment = {
            username: username || '',
            item: id || '',
            review: newComment,
            rating: rating,
        };
        console.log("before response");
        const response = await axios.post('/api/users/comments', {
            Comment: comment,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log("after response");
        console.log(response);
        const data = await response.data;
        console.log(data);
        alert(response);
        if (response.status === 200) {
            alert("Comment succesfully added");
        } else {
            alert('Comment addition failed');
        }

        setComments([...comments, comment]);
        setNewComment('');
        setRating(0);
    };

    return (
        <div className="comment-section">
            <h2>Leave a Review</h2>

            <form onSubmit={handleSubmit} className="comment-form">
                <div className="form-group">
                    <label>Your Rating</label>
                    <div className="rating-stars">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                            >
                                <Star size={24} />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <textarea
                        id="comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your experience..."
                        required
                    />
                </div>

                <button type="submit" className="submit-button">
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default CommentSection;