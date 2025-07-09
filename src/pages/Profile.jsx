import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axiosInstance from "../axios";
import Title from "../components/Title";
import profile_icon from "../assets/profile.webp";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";
import Address from "../components/Address";

const Profile = () => {

    return (
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
            <div>
                <img className="w-[120px]" src={profile_icon} alt="" />
            </div>
            <div className="text-xl sm:text-2xl my-3">
                <Title text1={"MY"} text2={"PROFILE"} />
            </div>
            <Address />
        </div>
    );
};

export default Profile;
