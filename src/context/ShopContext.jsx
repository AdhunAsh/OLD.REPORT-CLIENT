import { createContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios";
import { useAuth } from "@clerk/clerk-react";

export const ShopContext = createContext();

const payemntScript = import.meta.env.VITE_PAYMENT_SCRIPT;

const ShopContextProvider = (props) => {
    const currency = "₹";
    const delivery_fee = 0;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [fetchedCart, setFetchedCart] = useState([]);
    const [bestSeller, setBestSeller] = useState([]);
    const navigate = useNavigate();
    const { getToken, isSignedIn } = useAuth();

    // To Add Products To Cart...
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

    // To Get Cart Data
    const fetchCartData = async () => {
        try {
            const token = await getToken();
            const response = await axiosInstance.get("/api/cart/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const items = response.data.items || [];
            setFetchedCart(items);
            setCartFromBackend(items);
        } catch (error) {
            if (process.env.NODE_ENV === 'development') {
                console.error('Cart fetch error:', error);
            }
            toast.error("Failed to fetch cart data");
        }
    };

    // useEffect(() => {
    //     if (isSignedIn) {
    //         fetchCartData();
    //     }
    // }, [isSignedIn]);

    // this is used to create a formatted data , which will be easier to use for fn's like getCartCount() and updateQuantity
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

    //-------------------- to get cart icons count ---------------------------------------
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

    useEffect(() => {
        getCartCount();
    }, [cartItems]);

    // ---------------- To Update Cart Quantity not cart count ----------------------
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        try {
            const token = await getToken();
            const res = await axiosInstance.put(
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
            if (res.data) {
                toast.success("Cart updated");
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                toast(err.response.data.error);
            }
        }
    };

    // ---------------------- To Get Cart Total Amount --------------------------
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
                console.log(res.data)
                const filteredProducts = res.data.filter(
                    (product) =>
                        Array.isArray(product.stock_details) &&
                        product.stock_details.some(
                            (stock) => stock.quantity > 0
                        )
                );
                setProducts(filteredProducts);
            } else {
                toast.error(res.data);
            }
        } catch (error) {
            toast.error(
                error.res?.data?.message || "Failed to fetch product list"
            );
        }
    };

    const getBestSeller = async () => {
        try {
            const res = await axiosInstance.get("/api/products/");
            if (res.data) {
                const filteredData = res.data.filter(product => product.bestseller);
                setBestSeller(filteredData);
                
            }
        } catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        getProductsData();
        getBestSeller();
    }, []);

    useEffect(() => {
        console.log(bestSeller);
    },[bestSeller]);

    // useEffect(() => {
    //     getProductsData();
    //     if (isSignedIn) {
    //         fetchCartData();
    //     }
    // }, [isSignedIn]);

    //--------------------- payment ------------------

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = payemntScript;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

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
        fetchedCart,
        setCartFromBackend,
        navigate,
        backendUrl,
        fetchCartData,
        loadRazorpay,
        bestSeller,
    };
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
