import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useAuth } from "@clerk/clerk-react";
import axiosInstance from "../axios";
import { toast } from "react-toastify";
import CartLoader from "../components/loaders/CartLoader";

const Orders = () => {
    const { products, currency } = useContext(ShopContext);
    const { getToken } = useAuth();
    const [orders, setorders] = useState([]);
    const [loading, setLoading] = useState(true);

    const orderData = async () => {
        try {
            const token = await getToken();
            const response = await axiosInstance.get("/order-list/", {
                headers: {
                    Authorization: `bearer ${token}`,
                },
            });
            if (response.data) {
                console.log(response.data);
                setorders(response.data);
            }
        } catch (error) {
            console.log(error);
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        orderData();
    }, []);

    return (
        <div className="border-t border-b pt-16 px-4 sm:px-10">
            <div className="text-2xl mb-4">
                <Title text1={"MY"} text2={"ORDERS"} />
            </div>

            <div className="min-h-[200px]">
                {loading ? (
                    <CartLoader />
                ) : orders.length === 0 ? (
                    <p className="text-center text-gray-500 mt-10 mb-10">
                        No orders found.
                    </p>
                ) : (
                    orders.map((order) =>
                        order.items.map((item, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-start sm:flex-row justify-between sm:items-center gap-4 py-4 border-t"
                            >
                                {/* Product info */}
                                <div className="flex items-start gap-4 text-sm">
                                    {/* Image if available */}
                                    <img
                                        src={item.image || "/placeholder.jpg"}
                                        alt={item.product}
                                        className="w-16 sm:w-20 object-cover rounded"
                                    />
                                    <div>
                                        <p className="font-semibold text-base">
                                            {item.product}
                                        </p>
                                        <div className="flex gap-4 mt-1 text-sm text-gray-600">
                                            <span>
                                                Quantity: {item.quantity}
                                            </span>
                                            <span>Size: {item.size}</span>
                                        </div>
                                        <p className="text-gray-500 text-sm mt-1">
                                            Date:{" "}
                                            {new Date(
                                                order.created_at
                                            ).toLocaleDateString("en-US", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {/* Delivery status */}
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                    <span className="text-gray-700 capitalize">
                                        {order.delivery_status}
                                    </span>
                                </div>

                                {/* price */}
                                <div className="flex flex-col sm:items-end gap-2 sm:text-right text-sm">
                                    <span className="text-base font-semibold text-black">
                                        {currency}
                                        {(order.total_amount / 100).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        ))
                    )
                )}
            </div>
        </div>
    );
};

export default Orders;
