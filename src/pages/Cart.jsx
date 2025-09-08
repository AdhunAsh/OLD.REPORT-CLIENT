import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import bin_icon from "../assets/bin_icon.png";
import empty_cart from "../assets/delete.png";
import CartLoader from "../components/loaders/CartLoader";
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

    const { getToken } = useAuth();

    // Store quantity, modal, and custom input per item
    const [quantities, setQuantities] = useState({});
    const [showModals, setShowModals] = useState({});
    const [customQuantities, setCustomQuantities] = useState({});
    const [loading, setLoading] = useState(true);

    // Create unique key for each item (product ID + size)
    const getKey = (item) => `${item.product_id}_${item.size}`;

    console.log("fetchcart: ",fetchedCart)

    // Delete item from cart
    const deleteCart = async (itemId, size) => {
        const token = await getToken();
        try {
            await axiosInstance.delete("/api/cart/", {
                data: { item_id: itemId, size },
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Product deleted.");
            await fetchCartData();
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to delete product"
            );
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500); // simulate loading
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="border-t pt-14">
            <div className="text-2xl mb-3">
                <Title text1="MY" text2="CART" />
            </div>

            <div className="min-h-[200px]">
                {loading ? (
                    <CartLoader />
                ) : fetchedCart.length === 0 ? (
                    <div className="flex flex-row items-center gap-2 justify-center">
                        <img className="w-16" src={empty_cart} alt="" />
                        <p className="text-lg text-center text-gray-500 mt-10 mb-10">
                            No products in cart.
                        </p>
                    </div>
                ) : (
                    <div>
                        {fetchedCart.map((item, index) => {
                            const productData = products.find(
                                (product) =>
                                    parseInt(product.id) ===
                                    parseInt(item.product_id)
                            );
                            const key = getKey(item);
                            const quantityValue =
                                quantities[key] ?? item.quantity;

                            return (
                                <div
                                    key={index}
                                    className="py-4 border-t border-b text-gray-700 flex flex-row items-center justify-between gap-4 flex-wrap sm:flex-nowrap"
                                >
                                    {/* Product Info */}
                                    <div className="flex items-left gap-6">
                                        <img
                                            className="w-16 sm:w-20"
                                            src={`${productData?.images[0].image}`}
                                            alt=""
                                        />
                                        <div>
                                            <p className="text-xs sm:text-lg font-medium">
                                                {productData?.name}
                                            </p>
                                            <div className="flex flex-col items-start gap-2 text-sm mt-1">
                                                <p>
                                                    {currency}
                                                    {productData?.price}
                                                </p>
                                                <p className="px-2 border bg-slate-50">
                                                    {item.size}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quantity Selector */}
                                    <div className="flex flex-col items-center gap-2">
                                        <p className="text-sm">Qty</p>
                                        <select
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (val === "more") {
                                                    setShowModals((prev) => ({
                                                        ...prev,
                                                        [key]: true,
                                                    }));
                                                } else {
                                                    const qty = parseInt(val);
                                                    setQuantities((prev) => ({
                                                        ...prev,
                                                        [key]: qty,
                                                    }));
                                                    updateQuantity(
                                                        item.product_id,
                                                        item.size,
                                                        qty
                                                    );
                                                    fetchCartData();
                                                }
                                            }}
                                            value={
                                                quantityValue > 3
                                                    ? quantityValue
                                                    : String(quantityValue)
                                            }
                                            className="border bg-slate-100 px-[5px] py-[2px] rounded"
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            {quantityValue > 3 && (
                                                <option value={quantityValue}>
                                                    {quantityValue}
                                                </option>
                                            )}
                                            <option value="more">more</option>
                                        </select>

                                        {/* Modal */}
                                        {showModals[key] && (
                                            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                                                <div className="bg-white p-6 rounded-lg w-[90%] max-w-sm">
                                                    <h2 className="text-lg font-semibold mb-4">
                                                        Enter Quantity
                                                    </h2>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        value={
                                                            customQuantities[
                                                                key
                                                            ] || ""
                                                        }
                                                        onChange={(e) =>
                                                            setCustomQuantities(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [key]: e
                                                                        .target
                                                                        .value,
                                                                })
                                                            )
                                                        }
                                                        className="w-full border px-3 py-2 rounded mb-4"
                                                        placeholder="Quantity"
                                                    />
                                                    <div className="flex justify-between">
                                                        <button
                                                            className="text-gray-700 font-medium"
                                                            onClick={() => {
                                                                setShowModals(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        [key]: false,
                                                                    })
                                                                );
                                                                setCustomQuantities(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        [key]: "",
                                                                    })
                                                                );
                                                            }}
                                                        >
                                                            CANCEL
                                                        </button>
                                                        <button
                                                            className="text-blue-600 font-medium"
                                                            onClick={() => {
                                                                const val =
                                                                    parseInt(
                                                                        customQuantities[
                                                                            key
                                                                        ]
                                                                    );
                                                                if (
                                                                    !isNaN(
                                                                        val
                                                                    ) &&
                                                                    val > 0
                                                                ) {
                                                                    setQuantities(
                                                                        (
                                                                            prev
                                                                        ) => ({
                                                                            ...prev,
                                                                            [key]: val,
                                                                        })
                                                                    );
                                                                    updateQuantity(
                                                                        item.product_id,
                                                                        item.size,
                                                                        val
                                                                    );
                                                                    fetchCartData();
                                                                    setShowModals(
                                                                        (
                                                                            prev
                                                                        ) => ({
                                                                            ...prev,
                                                                            [key]: false,
                                                                        })
                                                                    );
                                                                    setCustomQuantities(
                                                                        (
                                                                            prev
                                                                        ) => ({
                                                                            ...prev,
                                                                            [key]: "",
                                                                        })
                                                                    );
                                                                }
                                                            }}
                                                        >
                                                            APPLY
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Delete Button */}
                                    <div className="flex justify-end">
                                        <img
                                            onClick={() =>
                                                deleteCart(item.id, item.size)
                                            }
                                            className="w-5 cursor-pointer hover:bg-gray-200"
                                            src={bin_icon}
                                            alt="Delete"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Cart Total & Checkout */}
            <div className="flex justify-end my-5">
                <div className="w-full sm:w-[450px]">
                    <CartTotal total={getCartAmount()} />
                    <div className="w-full text-end">
                        <button
                            onClick={() => {
                                if (fetchedCart.length > 0) {
                                    navigate("/placeorder");
                                } else {
                                    toast.warning("Your cart is empty");
                                }
                            }}
                            // disabled={fetchedCart.length === 0}
                            className={`bg-black text-white text-[12px] px-4 py-2 sm:text-sm my-8 sm:px-8 sm:py-3 hover:bg-gray-700 ${
                                fetchedCart.length === 0
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-black hover:bg-gray-700"
                            }`}
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
