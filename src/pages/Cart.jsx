import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import bin_icon from "../assets/bin_icon.png";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";
import axiosInstance from "../axios";

const cart = () => {
    const {
        products,
        currency,
        cartItems,
        updateQuantity,
        navigate,
        backendUrl,
    } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);
    const [fetchedCart, setFetchedCart] = useState([]);
    const { getToken } = useAuth();

    const fetchCartData = async () => {
        try {
            const token = await getToken();
            const response = await axiosInstance.get("/api/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Fetched Cart Response:", response.data.items);
            setFetchedCart(response.data.items);
        } catch (error) {
            toast.error("Failed to fetch cart data");
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    useEffect(() => {
        const tempData = [];
        console.log(cartItems);
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    tempData.push({
                        id: items,
                        size: item,
                        quantity: cartItems[items][item],
                    });
                }
            }
        }
        console.log(tempData);
        setCartData(tempData);
    }, [cartItems]);

    const handleStoreCart = async () => {
        try {
            const token = await getToken();
            await axiosInstance.post(
                "/api/cart/",
                { cart: cartData },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success("item added to cart!");
            navigate("/placeorder");
        } catch (err) {
            // Optionally show a toast
            toast.error("item not added");
        }
    };

    return (
        <div className="border-t pt-14">
            <div className="text-2xl mb-3">
                <Title text1={"MY"} text2={"CART"} />
            </div>

            <div>
                {fetchedCart.map((item, index) => {
                    const productData = products.find(
                        (product) =>
                            parseInt(product.id) === parseInt(item.product_id)
                    );
                    return (
                        <div
                            key={index}
                            className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                        >
                            <div className="flex items-start gap-6">
                                <img
                                    className="w-16 sm:w-20"
                                    src={`${backendUrl}${productData?.images[0].image}`}
                                    alt=""
                                />
                                <div>
                                    <p className="text-xs sm:text-lg font-medium ">
                                        {productData?.name}
                                    </p>
                                    <div className="flex items-center gap-5 mt-2">
                                        <p>
                                            {" "}
                                            {currency}
                                            {productData?.price}
                                        </p>
                                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                                            {" "}
                                            {item.size}{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <input
                                onChange={(e) =>
                                    e.target.value === "" ||
                                    e.target.value === "0"
                                        ? null
                                        : updateQuantity(
                                              item.product_id,
                                              item.size,
                                              Number(e.target.value)
                                          )
                                }
                                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                                type="number"
                                min={1}
                                defaultValue={item.quantity}
                            />
                            <img
                                onClick={() =>
                                    updateQuantity(
                                        item.product_id,
                                        item.size,
                                        0
                                    )
                                }
                                className="w-4 mr-4 sm:w-5 cursor-pointer hover:bg-gray-300"
                                src={bin_icon}
                                alt=""
                            />
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-end my-20">
                <div className="w-full sm:w-[450px]">
                    <CartTotal />
                    <div className="w-full text-end">
                        <button
                            onClick={handleStoreCart}
                            className="bg-black text-white text-sm my-8 px-8 py-3 hover:bg-gray-700"
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default cart;
