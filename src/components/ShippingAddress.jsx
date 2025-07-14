import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { useAuth } from "@clerk/clerk-react";
import axiosInstance from "../axios";
import { toast } from "react-toastify";

const ShippingAddress = ({ onConfirm }) => {
    const { navigate } = useContext(ShopContext);
    const { getToken } = useAuth();
    const [isDirty, setIsDirty] = useState(false);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setIsDirty(true);
    };

    const checkProfile = async () => {
        try {
            const token = await getToken();
            const response = await axiosInstance.get("/address/", {
                headers: { Authorization: `Bearer ${token}` },
            });

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
            } else {
                toast.error("fill delivery information");
            }
        } catch (error) {
            console.log("Error fetching profile:", error);
        }
    };

    useEffect(() => {
        checkProfile();
    }, []);

    const validateForm = () => {
        for (const [key, value] of Object.entries(form)) {
            if (!value.trim()) {
                const label = key.replace("_", " ");
                toast.error(`Please fill in ${label}`);
                return false;
            }
        }

        if (!/^\d{6}$/.test(form.postal_code)) {
            toast.error("Postal code must be 6 digits");
            return false;
        }

        if (!/^\d{10}$/.test(form.phone_number)) {
            toast.error("Phone number must be 10 digits");
            return false;
        }

        return true;
    };

    const saveProfile = async () => {
        if (!validateForm()) return;

        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const token = await getToken();
            await axiosInstance.post(`/address/`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("profile saved successfully...");
            setIsDirty(false);
            onConfirm?.();
        } catch (err) {
            if (err) {
                navigate("/login");
                toast.error("Login required");
            } else {
                toast.error("Failed to save profile!");
            }
        }
    };

    return (
        <div className="flex flex-col sm:flex-row justify-center gap-4 min-h-[80vh]">
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={"DELIVERY"} text2={"INFORMATION"} />
                </div>
                <div className="flex gap-3">
                    <input
                        name="first_name"
                        value={form.first_name}
                        onChange={handleChange}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="First name"
                    />
                    <input
                        name="Last_name"
                        value={form.Last_name}
                        onChange={handleChange}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="Last name"
                    />
                </div>
                <input
                    name="address_line1"
                    value={form.address_line1}
                    onChange={handleChange}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="text"
                    placeholder="Flat, House No, Building, Company, Apartment"
                />
                <div className="flex gap-3">
                    <input
                        name="street"
                        value={form.street}
                        onChange={handleChange}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="Street"
                    />
                    <input
                        name="postal_code"
                        value={form.postal_code}
                        onChange={(e) => {
                            const input = e.target.value;
                            if (/^\d{0,6}$/.test(input)) {
                                setForm({ ...form, postal_code: input });
                                setIsDirty(true);
                            }
                        }}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="PinCode"
                    />
                </div>
                <div className="flex gap-3">
                    <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="City"
                    />
                    <input
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="State"
                    />
                </div>
                <input
                    name="phone_number"
                    value={form.phone_number}
                    onChange={(e) => {
                        const input = e.target.value;
                        if (/^\d{0,10}$/.test(input)) {
                            setForm({ ...form, phone_number: input });
                            setIsDirty(true);
                        }
                    }}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="text"
                    placeholder="Phone"
                />

                <button
                    onClick={saveProfile}
                    className="bg-black w-full text-white text-[12px] px-4 py-2 sm:text-sm my-8 sm:px-8 sm:py-3 hover:bg-gray-700"
                >
                    CONFIRM ADDRESS
                </button>
            </div>
        </div>
    );
};

export default ShippingAddress;
