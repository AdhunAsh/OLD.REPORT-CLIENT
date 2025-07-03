import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import bin_icon from "../assets/bin_icon.png";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/clerk-react";
import axiosInstance from "../axios";

const Cart = () => {
  const {
    products,
    currency,
    updateQuantity,
    navigate,
    backendUrl,
    setCartFromBackend,
    getCartAmount,
  } = useContext(ShopContext);

  const [localQuantities, setLocalQuantities] = useState({});
  const [fetchedCart, setFetchedCart] = useState([]);
  const { getToken } = useAuth();

  const fetchCartData = async () => {
    try {
      const token = await getToken();
      const response = await axiosInstance.get("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('data :' , response.data)

      const items = response.data.items || [];

      // Build format: { [product_id]: { size: quantity } }
      const formattedCart = {};
      items.forEach((item) => {
        const { product_id, size, quantity } = item;
        if (!formattedCart[product_id]) {
          formattedCart[product_id] = {};
        }
        formattedCart[product_id][size] = quantity;
      });

      setFetchedCart(items);
      setCartFromBackend(items); // update global cart
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch cart data");
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const handleStoreCart = async () => {
    try {
      const token = await getToken();
      await axiosInstance.post("/api/cart/", { cart: fetchedCart }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Cart updated!");
      navigate("/placeorder");
    } catch (err) {
      toast.error("Failed to update cart.");
    }
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="MY" text2="CART" />
      </div>

      <div>
        {fetchedCart.map((item, index) => {
          const productData = products.find(
            (product) => parseInt(product.id) === parseInt(item.product_id)
          );

          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={`${backendUrl}${productData?.images[0].image}`}
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium ">
                    {productData?.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData?.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              <input
                onChange={(e) => {
                  const val = Number(e.target.value);
                  const key = `${item.product_id}_${item.size}`;
                  setLocalQuantities((prev) => ({
                    ...prev,
                    [key]: val,
                  }));
                }}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                value={localQuantities[`${item.product_id}_${item.size}`] ?? item.quantity}
              />

              <button
                className="text-sm text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded"
                onClick={() => {
                  const key = `${item.product_id}_${item.size}`;
                  const quantity = localQuantities[key] ?? item.quantity;
                  updateQuantity(item.product_id, item.size, quantity);
                }}
              >
                Update
              </button>

              <img
                onClick={() =>
                  updateQuantity(item.product_id, item.size, 0)
                }
                className="w-4 mr-4 sm:w-5 cursor-pointer hover:bg-gray-300"
                src={bin_icon}
                alt="Delete"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal total={getCartAmount()} />
          <div className="w-full text-end">
            <button
              onClick={handleStoreCart}
              className="bg-black text-white text-sm my-8 px-8 py-3 hover:bg-gray-700"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
