import { createContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios";
import { useAuth } from "@clerk/clerk-react";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "₹";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { getToken, isSignedIn } = useAuth();

    const addToCart = async (itemId, size) => {
        if (!isSignedIn) {
            toast.error("You need to log in first");
            navigate("/login");
            return;
        }

        let cartData = structuredClone(cartItems);
        if (!size) {
            toast.error("Select Product Size");
            return;
        }

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        try {
            const formData = new FormData();
            formData.append("product_id", itemId);
            formData.append("size", size);
            formData.append("quantity", "1");

            formData.forEach((value, key) => {
                console.log(`${key}:`, value);
            });

            const token = await getToken();
            console.log(token);
            const response = await axiosInstance.post("/api/cart/", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data) {
                toast.success("product added to cart");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {}
            }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        console.log(quantity);
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        console.log("items:",cartItems)
        for (const items in cartItems) {
            let itemInfo = products.find(
                (product) => parseInt(product.id) === parseInt(items)
            );
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {}
            }
        }
        return totalAmount;
    };

    const getProductsData = async () => {
        try {
            console.log("calling API:", backendUrl + "/api/products/");
            const res = await axiosInstance.get("/api/products/");
            console.log(res);
            if (res.data) {
                setProducts(res.data);
            } else {
                toast.error(res.data);
            }
        } catch (error) {
            toast.error(
                error.res?.data?.message || "Failed to fetch product list"
            );
        }
    };

    useEffect(() => {
        getProductsData();
    }, []);

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
    };
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
