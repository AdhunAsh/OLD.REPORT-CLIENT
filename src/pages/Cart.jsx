import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import bin_icon from "../assets/bin_icon.png";
import CartTotal from "../components/CartTotal";
import { useAuth } from "@clerk/clerk-react";
import axiosInstance from "../axios";
import { toast } from "react-toastify";

const Cart = () => {
    const {
        products,
        currency,
        updateQuantity,
        navigate,
        backendUrl,
        fetchedCart,
        fetchCartData,
        getCartAmount,
    } = useContext(ShopContext);

    const [localQuantities, setLocalQuantities] = useState({});
    const { getToken } = useAuth();

    const deleteCart = async (itemId, size) => {
        const token = await getToken();
        try {
            const res = await axiosInstance.delete("/api/cart/", {
                data: {
                    item_id: itemId,
                    size: size,
                },
                headers: {
                    Authorization: `bearer ${token}`,
                },
            });
            console.log("yeeeaaa");
            toast.success("product deleted..");
            await fetchCartData();
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.message || "Failed to delete product"
            );
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    return (
        <div className="border-t pt-14">
            <div className="text-2xl mb-3">
                <Title text1="MY" text2="CART" />
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
                            className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
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
                                            {currency}
                                            {productData?.price}
                                        </p>
                                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                                            {item.size}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <input
                                onChange={(e) => {
                                    let val = Number(e.target.value);

                                    // Prevent typing less than 1 manually
                                    if (val < 1) val = 1;

                                    const key = `${item.product_id}_${item.size}`;
                                    setLocalQuantities((prev) => ({
                                        ...prev,
                                        [key]: val,
                                    }));
                                }}
                                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                                type="number"
                                min={1}
                                value={
                                    localQuantities[
                                        `${item.product_id}_${item.size}`
                                    ] ?? item.quantity
                                }
                            />

                            <button
                                className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded"
                                onClick={async () => {
                                    const key = `${item.product_id}_${item.size}`;
                                    const quantity =
                                        localQuantities[key] ?? item.quantity;
                                    updateQuantity(
                                        item.product_id,
                                        item.size,
                                        quantity
                                    );
                                    await fetchCartData();
                                }}
                            >
                                Update
                            </button>

                            <img
                                onClick={() => {
                                    deleteCart(item.id, item.size);
                                }}
                                className="w-4 mr-4 sm:w-5 cursor-pointer hover:bg-gray-300"
                                src={bin_icon}
                                alt="Delete"
                            />
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-end my-20">
                <div className="w-full sm:w-[450px]">
                    <CartTotal total={getCartAmount()} />
                    <div className="w-full text-end">
                        <button
                            onClick={() => navigate("/placeorder")}
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

export default Cart;
