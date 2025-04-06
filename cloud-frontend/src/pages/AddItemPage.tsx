import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AddItemPage.css";
import Navbar from "../components/NavBar.tsx";
import Item from "../entities/Items.tsx"

const AddItemPage = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [seller, setSeller] = useState("");
    const [batteryLife, setBatteryLife] = useState("");
    const [age, setAge] = useState(0);
    const [size, setSize] = useState("");
    const [material, setMaterial] = useState("");
    const [imageUrl, setImageUrl] = useState(""); // State for image URL
    const [itemType, setItemType] = useState(""); // State for item type
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !description || !price || !seller || !imageUrl || !itemType) {
            setErrorMessage("Please fill out all required fields.");
            return;
        }
        const item: Item = {
            itemType,
            name,
            description,
            price,
            seller,
            image: imageUrl, // Adjusting the property name to match the interface
            batteryLife: itemType === "gpsSportWatches" ? batteryLife : undefined,
            age: (itemType === "antiqueFurniture" || itemType === "vinyls") ? age : undefined,
            size: itemType === "runningShoes" ? Number(size) : undefined,  // Convert size to a number
            material: (itemType === "antiqueFurniture" || itemType === "runningShoes") ? material : undefined,
        };

        try {
            await axios.post("http://localhost:4000/items", {item});
            navigate("/"); // Navigate to home or item listing page after successful addition
        } catch (error) {
            setErrorMessage("Error adding item. Please try again later.");
            console.error("Error adding item:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="add-item-container">
                <h2>Add a New Item</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Item Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemType">Item Type:</label>
                        <select
                            id="itemType"
                            value={itemType}
                            onChange={(e) => setItemType(e.target.value)}
                            required
                        >
                            <option value="">Select Item Type</option>
                            <option value="gpsSportWatches">GPS sport watches</option>
                            <option value="vinyls">Vinyl</option>
                            <option value="antiqueFurniture">Antique Furniture</option>
                            <option value="runningShoes">Running Shoes</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value))}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="seller">Seller:</label>
                        <input
                            type="text"
                            id="seller"
                            value={seller}
                            onChange={(e) => setSeller(e.target.value)}
                            required
                        />
                    </div>

                    {/* Conditional Rendering for Battery Life */}
                    {itemType === "gpsSportWatches" && (
                        <div className="form-group">
                            <label htmlFor="batteryLife">Battery Life:</label>
                            <input
                                type="text"
                                id="batteryLife"
                                value={batteryLife}
                                onChange={(e) => setBatteryLife(e.target.value)}
                            />
                        </div>
                    )}

                    {/* Conditional Rendering for Age */}
                    {(itemType === "antiqueFurniture" || itemType === "vinyls") && (
                        <div className="form-group">
                            <label htmlFor="age">Age (in years):</label>
                            <input
                                type="number"
                                id="age"
                                value={age}
                                onChange={(e) => setAge(parseInt(e.target.value))}
                            />
                        </div>
                    )}

                    {/* Conditional Rendering for Size */}
                    {itemType === "runningShoes" && (
                        <div className="form-group">
                            <label htmlFor="size">Size:</label>
                            <input
                                type="text"
                                id="size"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                            />
                        </div>
                    )}

                    {/* Conditional Rendering for Material */}
                    {(itemType === "antiqueFurniture" || itemType === "runningShoes") && (
                        <div className="form-group">
                            <label htmlFor="material">Material:</label>
                            <input
                                type="text"
                                id="material"
                                value={material}
                                onChange={(e) => setMaterial(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input
                            type="url"
                            id="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Add Item</button>
                </form>
            </div>
        </>
    );
};

export default AddItemPage;