import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ totalAmount, onSuccess }) => {
  const [paymentDetails, setPaymentDetails] = useState(null);

  const handleApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      setPaymentDetails(details);
      if (details.status === "COMPLETED") {
        onSuccess(details); // Pass success details
      } else {
        console.error("Payment failed", details);
        alert("Payment not completed. Please try again.");
        onSuccess(null); // Notify parent about failure
      }
    });
  };

  return (
    <div className="w-full mt-4">
      <PayPalScriptProvider
        options={{
          "client-id": "AZgJohz-6KBcBUP3s4ublbhwwT2sc0nMXlbMGsG_Lqq9egC17-7R7TmFK8sn0QWWKUNvBm49qkEOSwEx", // Replace with valid Sandbox client ID
          debug: true,
          currency: "USD", // Ensure this matches supported currency
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            const amount = totalAmount && !isNaN(totalAmount) ? parseFloat(totalAmount).toFixed(2) : "0.00";
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: amount, // Dynamic total amount
                  },
                },
              ],
            });
          }}
          onApprove={handleApprove}
          onCancel={() => {
            console.warn("Payment process was canceled by the user.");
            alert("You canceled the payment process.");
          }}
          onError={(err) => {
            console.error("Payment Error: ", err);
            alert("An error occurred during payment. Please try again later.");
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalButton;
