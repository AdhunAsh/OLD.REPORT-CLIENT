import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axiosInstance from "../axios";
import Title from "../components/Title";
import profile_icon from "../assets/profile.webp";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";

const Profile = () => {
    // const { navigate } = useContext(ShopContext);
    const { getToken } = useAuth();

    const [formData, setFormData] = useState("");
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
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
                setFormData(response.data);
            }
        } catch (error) {}
    };

    useEffect(() => {
        checkProfile();
    }, []);

    const saveProfile = async () => {
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const token = await getToken();
            console.log("token:", token);
            await axiosInstance.post(`/address/`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("Profile saved successfully...");
        } catch (err) {
            console.log(err);
            toast.error("failed to save profile!");
        }
    };
    return (
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
            {/* left side */}
            {formData ? (
                <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                    <div>
                        <img className="w-[120px]" src={profile_icon} alt="" />
                    </div>
                    <div className="text-xl sm:text-2xl my-3">
                        <Title text1={"MY"} text2={"PROFILE"} />
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
                            value={form.last_name}
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
            ) : (
                <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                    <div>
                        <img className="w-[120px]" src={profile_icon} alt="" />
                    </div>
                    <div className="text-xl sm:text-2xl my-3">
                        <Title text1={"MY"} text2={"PROFILE"} />
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
                            value={form.last_name}
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
            )}
        </div>
    );
};

export default Profile;
