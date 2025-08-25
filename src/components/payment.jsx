import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { backendUrl } from "../App";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const PaymentButton = ({ amount, disabled }) => {
    const { getToken } = useAuth();
    const { loadRazorpay, navigate } = useContext(ShopContext);

    const handlePayment = async () => {
        const res = await loadRazorpay();
        if (!res) {
            alert("Razorpay SDK failed to load.");
            return;
        }

        const token = await getToken();
        console.log(token);

        const { data } = await axios.post(
            `${backendUrl}/create-order/`,
            { amount },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const options = {
            key: data.razorpay_key,
            amount: data.amount,
            currency: "INR",
            name: "Your Store",
            description: "Payment for order",
            order_id: data.order_id,
            handler: async function (response) {
                try {
                    const freshToken = await getToken();
                    const verifyRes = await axios.post(
                        `${backendUrl}/verify-payment/`,
                        response,
                        {
                            headers: {
                                Authorization: `Bearer ${freshToken}`,
                            },
                        }
                    );
                    toast.success("Payment Verified");
                    navigate("/orders");
                } catch (err) {
                    toast.error("Payment Verification Failed");
                }
            },
            prefill: {
                name: "John Doe",
                email: "john@example.com",
                contact: "9999999999",
            },
            theme: {
                color: "#3399cc",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <button
            disabled={disabled}
            className={`bg-black text-white w-full px-16 items-center py-3 text-sm ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-black active:bg-gray-600'}`}
            onClick={handlePayment}
        >
            Pay ₹{amount}
        </button>
    );
};

export default PaymentButton;
