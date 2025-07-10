import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import Address from "../components/Address";

const Shipping = () => {
    const { navigate } = useContext(ShopContext);

    return (
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={"CONFIRM"} text2={"SHIPPING ADDRESS"} />
                </div>
                <Address />
                <div>
                    <button
                        onClick={() => (navigate = "/placeorder")}
                        className="bg-black w-full text-white text-[12px] px-4 py-2 sm:text-sm my-8 sm:px-8 sm:py-3 hover:bg-gray-700"
                    >
                        CONFIRM ADDRESS
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
