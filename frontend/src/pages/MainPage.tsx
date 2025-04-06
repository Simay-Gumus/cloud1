import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MainPage.css";
import Item from "../entities/Items.tsx";
import axios from "axios";
import Navbar from "../components/NavBar.tsx";

const MainPage = () => {
    const [items, setItems] = useState<Item[]>([]);
    const navigate = useNavigate();
    const isAdmin = sessionStorage.getItem("isAdmin") === "true"; // Check if the user is an Admin

    useEffect(() => {
        axios.get("http://localhost:4000/items")
            .then((response) => setItems(response.data))
            .catch((error) => console.error("Error fetching items:", error));
    }, []);

    const handleAddItem = () => {
        navigate("/addItem"); // Navigate to /addItem route
    };

    const handleRemoveItem = (itemId?: string) => {
        axios.delete(`http://localhost:4000/items/${itemId}`)
            .then(() => {
                setItems((prevItems) => prevItems.filter(item => item._id !== itemId));
                console.log("Item removed successfully");
            })
            .catch((error) => console.error("Error removing item:", error));
    };

    const handleEditUsers = () => {
        navigate("/editUsers"); // Navigate to the edit users page
    };

    return (
        <>
            <Navbar />
            {isAdmin && (
                <div className="admin-actions">
                    <button onClick={handleAddItem}>Add Item</button>
                    <button onClick={handleEditUsers}>Edit Users</button> {/* Edit Users button */}
                </div>
            )}
            <div className="grid-container">
                {items.map((item) => (
                    <div
                        key={item._id}
                        className="grid-item"
                        onClick={() => navigate(`/item/${item._id}`)}
                    >
                        <img src={item.image} alt={item.name} className="item-image" />
                        <h3 className="item-title">{item.name}</h3>
                        <p className="item-price">${item.price.toFixed(2)}</p>
                        {isAdmin && (
                            <button
                                className="remove-item-btn"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent triggering the grid-item click
                                    handleRemoveItem(item._id);
                                }}
                            >
                                Remove Item
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
};

export default MainPage;
