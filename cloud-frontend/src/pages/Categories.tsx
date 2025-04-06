import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import "../styles/MainPage.css";
import Item from "../entities/Items.tsx";
import axios from "axios";
import Navbar from "../components/NavBar.tsx";

const CategoryPage = () => {
    const {category} = useParams();
    const [items, setItems] = useState<Item[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setItems([]);
        axios.get(`http://localhost:4000/items/type/${category}`)
            .then((response) => setItems(response.data))
            .catch((error) => console.error("Error fetching items:", error));
    }, [category]);


    return (
        <>
            <Navbar/>
            <div className="grid-container">
                {items.map((item) => (
                    <div
                        key={item._id}
                        className="grid-item"
                        onClick={() => navigate(`../item/${item._id}`)}
                    >
                        <img src={item.image} alt={item.name} className="item-image" />
                        <h3 className="item-title">{item.name}</h3>
                        <p className="item-price">${item.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default CategoryPage;
