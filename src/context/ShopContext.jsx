import { createContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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

            const token = await getToken();
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
            toast.error(error.message);
        }
    };

    const setCartFromBackend = (cartArray) => {
        const newCart = {};
        for (const item of cartArray) {
            const id = item.product_id.toString();
            const size = item.size;
            const quantity = item.quantity;

            if (!newCart[id]) {
                newCart[id] = {};
            }
            newCart[id][size] = quantity;
        }
        setCartItems(newCart);
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

    // ---------------- To Update Cart Quantity------------------------------
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
        console.log(`product id: ${itemId} || size: ${size} || quantity: ${quantity}`)

        try {
            const token = await getToken();
            await axiosInstance.put(
                "/api/cart/",
                {
                    product_id: itemId,
                    size: size,
                    quantity: quantity,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
        } catch (error) {
            console.error("Cart update error:", error);
            toast.error("Failed to update cart on server");
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find(
                (product) => parseInt(product.id) === parseInt(items)
            );
            if (!itemInfo) continue;
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

    //------------ To Get Products Data ----------------------------
    const getProductsData = async () => {
        try {
            const res = await axiosInstance.get("/api/products/");
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

    // useEffect(() => {
    //     getProductsData();
    //     if (isSignedIn) {
    //         fetchCartData();
    //     }
    // }, [isSignedIn]);

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
        setCartFromBackend,
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
