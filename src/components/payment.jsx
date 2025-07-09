import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { backendUrl } from "../App";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const PaymentButton = ({ amount }) => {
    const { getToken } = useAuth();
    const { loadRazorpay } = useContext(ShopContext);

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
                    const verifyRes = await axios.post(`${backendUrl}/verify-payment/`, response, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    alert("Payment Verified");
                } catch (err) {
                    alert("Payment Verification Failed");
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

    return <button className='bg-black text-white px-16 items-center py-3 text-sm active:bg-gray-600' onClick={handlePayment}>Pay ₹{amount}</button>;
};

export default PaymentButton;
