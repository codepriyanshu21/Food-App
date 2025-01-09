import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, clearCart } from "../utils/cartSlice.jsx";
import { CDN_URL, COOKING_IMAGE } from "../utils/constants.jsx";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import PayPalButton from "../utils/paypalButton.jsx";
import PaymentSuccess from "../components/PaymentSuccess.jsx";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeItem({ id }));
    toast.error("Removed from cart");
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity === 0) {
      dispatch(removeItem({ id }));
    }
    const currentItem = cartItems.find((item) => item.id === id);
    const currentQuantity = currentItem ? currentItem.quantity : 0;

    dispatch(updateQuantity({ id, quantity }));

    if (quantity > currentQuantity) {
      toast.success("Item added to cart!");
    } else if (quantity < currentQuantity) {
      toast.error("Item removed from cart!");
    }
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.error("Cart is cleared");
  };

  const handlePaymentSuccess = (details) => {
    setTransactionDetails(details);
    setPaymentSuccess(true);
    toast.success("Payment successful!");
    dispatch(clearCart()); // Clear cart on successful payment
    console.log("Transaction details: ", details);
  };

  if (paymentSuccess) {
    return <PaymentSuccess transactionDetails={transactionDetails} />;
  }

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ) / 100; // Convert to dollars if necessary

  if (cartItems.length === 0) {
    return (
      <div className="text-center  flex flex-col items-center justify-center">
        <h1 className="text-2xl mt-20 lg:mt-10 font-bold text-gray-800">Your Cart is Empty</h1>
        <img src={COOKING_IMAGE} className="mt-4 border rounded-2xl w-80 h-80 mx-auto" />
        <p className="text-gray-600 mt-4">Add items to see them here!</p>
        <Link to="/">
          <button className="border-2 p-4 px-10 mt-4 rounded-lg hover:bg-blue-700 text-white text-xl font-semibold bg-blue-500">
            Add Items
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl text-center font-bold mb-6">Your Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-start gap-4 sm:gap-6 w-full sm:w-auto">
              {item.imageId && (
                <img
                  src={`${CDN_URL}${item.imageId}`}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-lg mr-4"
                />
              )}
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.description.slice(0, 100)}...</p>
                <p className="text-md font-medium text-gray-700 mt-2">
                  ₹{item.price / 100}
                </p>
                <div className="mt-2">
                  <button
                    className="px-3 py-1 bg-red-500 hidden lg:block text-white text-sm font-semibold rounded-md shadow hover:bg-red-600"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center ml-10 lg:ml-0 -mt-2 lg:mt-0">
              <div className="flex items-center mt-2 sm:mt-0 border-2 rounded-md border-orange-300">
                <button
                  className="px-2 text-black text-xl rounded-md"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="px-2 text-black text-xl rounded-md"
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4">
          <button
            className="px-8 py-2 bg-blue-500 text-md text-white rounded-md shadow hover:bg-blue-600"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
          <h2 className="text-xl flex font-bold text-gray-800">
            Total: ₹
            <div className="font-semibold">
              {totalAmount.toFixed(2)}
            </div>
          </h2>
        </div>
        {/* PayPal Button Integration */}
        <PayPalButton totalAmount={totalAmount} onSuccess={handlePaymentSuccess} />
      </div>
    </div>
  );
};

export default Cart;
