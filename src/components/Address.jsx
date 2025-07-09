import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

const Address = () => {
    const { getToken } = useAuth();

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
        setForm({ ...form, [e.target.name]: e.target.value });
    };

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
        console.log("Updated form:", form);
    }, [form]);

    const saveProfile = async () => {
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const token = await getToken();
            await axiosInstance.post(`/address/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Profile saved successfully...");
        } catch (err) {
            console.log(err);
            toast.error("Failed to save profile!");
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
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
                    onChange={handleChange}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="number"
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
                onChange={handleChange}
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                type="number"
                placeholder="Phone"
            />

            <button
                onClick={saveProfile}
                className="bg-slate-600 text-white border border-gray-300 rounded py-2 px-3.5 w-full active:bg-slate-500"
            >
                Update
            </button>
        </div>
    );
};

export default Address;
