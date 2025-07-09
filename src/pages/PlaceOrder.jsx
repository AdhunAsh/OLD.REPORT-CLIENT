import React, { useContext } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import { useState } from "react";
import PaymentButton from "../components/payment";
import { toast } from "react-toastify";
import Address from "../components/Address";


const PlaceOrder = () => {
    const { navigate, getCartAmount } = useContext(ShopContext);

    return (
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
            {/* left side */}
            <Address />

            {/* right side */}
            <div className="mt-8">
                <div className="mt-8 min-w-80">
                    <CartTotal />
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
