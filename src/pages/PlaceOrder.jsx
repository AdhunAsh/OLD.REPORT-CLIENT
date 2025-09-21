import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { ShopContext } from "../context/ShopContext";
import PaymentButton from "../components/payment";
import axiosInstance from "../axios";
import { useAuth } from "@clerk/clerk-react";
import ShippingAddress from "../components/ShippingAddress";
import razorpay_logo from '../assets/Razorpay_logo.svg';
import { ArrowLeft } from "lucide-react";

const PlaceOrder = () => {
    const { getCartAmount, fetchCartData } = useContext(ShopContext);
    const { getToken } = useAuth();

    const [addressConfirmed, setAddressConfirmed] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [policyAgreements, setPolicyAgreements] = useState({
        terms: false,
        privacy: false,
        shipping: false
    });

    const allPoliciesAgreed = Object.values(policyAgreements).every(agreed => agreed);

    const handlePolicyChange = (policy) => {
        setPolicyAgreements(prev => ({
            ...prev,
            [policy]: !prev[policy]
        }));
    };

    const handleAgreeAll = () => {
        const newValue = !allPoliciesAgreed;
        setPolicyAgreements({
            terms: newValue,
            privacy: newValue,
            shipping: newValue
        });
    };
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

    const handleAddressConfirm = () => {
        setAddressConfirmed(true);
        setCurrentStep(2);
    };

    const handleBackToAddress = () => {
        setCurrentStep(1);
    };

    if (currentStep === 1) {
        // Step 1: Address Page
        return (
            <div className="pt-14 min-h-[80vh] border-t">
                <div className="text-center mb-8">
                    <Title text1={"SHIPPING"} text2={"ADDRESS"} />
                    <p className="text-gray-600 mt-2">Step 1 of 2</p>
                </div>
                <ShippingAddress onConfirm={handleAddressConfirm} />
            </div>
        );
    }

    // Step 2: Payment Page
    return (
        <div className="pt-14 min-h-[80vh] border-t">
            <div className="flex items-center mb-8">
                <button 
                    onClick={handleBackToAddress}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Address
                </button>
                <div className="flex-1 text-center">
                    <Title text1={"PAYMENT"} text2={"METHOD"} />
                    <p className="text-gray-600 mt-2">Step 2 of 2</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-8">
                {/* Order Summary */}
                <div className="lg:w-1/2">
                    <CartTotal total={getCartAmount()} />
                </div>

                {/* Payment Section */}
                <div className="lg:w-1/2">
                   

                    {/* Policy Agreement */}
                    <div className="p-6 bg-gray-50 rounded-lg mb-6">
                        {/* <h3 className="text-lg font-semibold text-gray-900 mb-4">Agreement Required</h3> */}
                        <p className="text-sm text-gray-700 mb-4">
                            Please read and agree to the following policies before proceeding:
                        </p>
                        
                        <div className="space-y-3">
                            <label className="flex items-start gap-3 cursor-pointer border-b pb-3 mb-3">
                                <input
                                    type="checkbox"
                                    checked={allPoliciesAgreed}
                                    onChange={handleAgreeAll}
                                    className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                                />
                                <span className="text-sm font-medium text-gray-900">
                                    Agree to all policies
                                </span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={policyAgreements.terms}
                                    onChange={() => handlePolicyChange('terms')}
                                    className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                                />
                                <span className="text-sm text-gray-900">
                                    I have read and agree to the{' '}
                                    <a href="/terms-conditions" target="_blank" className="text-blue-600 hover:underline font-medium">
                                        Terms & Conditions
                                    </a>
                                </span>
                            </label>
                            
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={policyAgreements.privacy}
                                    onChange={() => handlePolicyChange('privacy')}
                                    className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                                />
                                <span className="text-sm text-gray-900">
                                    I have read and agree to the{' '}
                                    <a href="/privacy-policy" target="_blank" className="text-blue-600 hover:underline font-medium">
                                        Privacy Policy
                                    </a>
                                </span>
                            </label>
                            
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={policyAgreements.shipping}
                                    onChange={() => handlePolicyChange('shipping')}
                                    className="mt-1 w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                                />
                                <span className="text-sm text-gray-900">
                                    I have read and agree to the{' '}
                                    <a href="/shipping-policy" target="_blank" className="text-blue-600 hover:underline font-medium">
                                        Shipping Policy
                                    </a>
                                </span>
                            </label>
                        </div>
                        
                        {!allPoliciesAgreed && (
                            <p className="text-xs text-red-600 mt-3">
                                Please agree to all policies to proceed with payment.
                            </p>
                        )}
                        
                    </div>
 {/* Payment method selection */}
                    <div className="flex gap-3 flex-col lg:flex-row mb-6">
                        <div className="flex items-center gap-3 border p-4 px-6 cursor-pointer rounded-lg">
                            <img className="h-6" src={razorpay_logo} alt="Razorpay" />
                            <span className="text-gray-700">Secure Payment</span>
                        </div>
                    </div>
                    {/* Payment Button */}
                    <div className="w-full">
                        <PaymentButton 
                            amount={getCartAmount()} 
                            disabled={!addressConfirmed || !allPoliciesAgreed} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
