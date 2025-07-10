import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import PaymentButton from "../components/payment";
import axiosInstance from "../axios";
import { useAuth } from "@clerk/clerk-react";
import ShippingAddress from "../components/ShippingAddress";

const PlaceOrder = () => {
    const { getCartAmount, fetchCartData } = useContext(ShopContext);
    const { getToken } = useAuth();

    const [addressConfirmed, setAddressConfirmed] = useState(false);
    const [form, setForm] = useState({
        first_name: "",
        Last_name: "",
        address_line1: "",
        street: "",
        postal_code: "",
        city: "",
        state: "",
        phone_number: "",
    });

    const checkProfile = async () => {
        try {
            const token = await getToken();
            const response = await axiosInstance.get("/address/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            if (response.data) {
                const {
                    first_name,
                    Last_name,
                    address_line1,
                    street,
                    postal_code,
                    city,
                    state,
                    phone_number,
                } = response.data;

                console.log(response.data);
                setForm({
                    first_name: first_name || "",
                    Last_name: Last_name || "",
                    address_line1: address_line1 || "",
                    street: street || "",
                    postal_code: postal_code || "",
                    city: city || "",
                    state: state || "",
                    phone_number: phone_number || "",
                });
            }
        } catch (error) {
            console.log("Error fetching profile:", error);
        }
    };

    useEffect(() => {
        checkProfile();
    }, []);

    useEffect(() => {
        fetchCartData();
    }, []);

    return (
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
            {/* left side */}

            <ShippingAddress onConfirm={() => setAddressConfirmed(true)} />

            {/* right side */}
            <div className="mt-8">
                <div className="mt-8 min-w-80">
                    <CartTotal total={getCartAmount()} />
                </div>
                <div className="mt-12">
                    <Title text1={"PAYMENT"} text2={"METHOD"} />
                    {/* Payment method selection */}
                    <div className="flex gap-3 flex-col lg:flex-row">
                        <div className="flex items-center gap-33 border p-2 px-3 cursor-pointer">
                            <p
                                className={`min-w-3.5 h-3.5 border rounded-full`}
                            ></p>
                            <img className="h-5 mx-4" src="logo" alt="" />
                        </div>
                    </div>

                    <div className="w-full text-end mt-8">
                        <PaymentButton amount={getCartAmount()} disabled={!addressConfirmed} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
