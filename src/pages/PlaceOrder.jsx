import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import PaymentButton from "../components/payment";
import Address from "../components/Address";

const PlaceOrder = () => {
    const { getCartAmount, fetchCartData } = useContext(ShopContext);
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
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={"DELIVERY"} text2={"INFORMATION"} />
                </div>
                <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                    <div className="flex gap-3">
                        <input
                            name="first_name"
                            value={form.first_name}
                            readOnly
                            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                            type="text"
                            placeholder="First name"
                        />
                        <input
                            name="Last_name"
                            value={form.Last_name}
                            readOnly
                            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                            type="text"
                            placeholder="Last name"
                        />
                    </div>
                    <input
                        name="address_line1"
                        value={form.address_line1}
                        readOnly
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="Flat, House No, Building, Company, Apartment"
                    />
                    <div className="flex gap-3">
                        <input
                            name="street"
                            value={form.street}
                            readOnly
                            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                            type="text"
                            placeholder="Street"
                        />
                        <input
                            name="postal_code"
                            value={form.postal_code}
                            readOnly
                            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                            type="text"
                            placeholder="PinCode"
                        />
                    </div>
                    <div className="flex gap-3">
                        <input
                            name="city"
                            value={form.city}
                            readOnly
                            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                            type="text"
                            placeholder="City"
                        />
                        <input
                            name="state"
                            value={form.state}
                            readOnly
                            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                            type="text"
                            placeholder="State"
                        />
                    </div>
                    <input
                        name="phone_number"
                        value={form.phone_number}
                        readOnly
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="Phone"
                    />
                </div>
            </div>
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
                        <PaymentButton amount={getCartAmount()} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
