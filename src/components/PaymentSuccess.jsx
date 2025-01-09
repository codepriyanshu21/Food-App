import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = ({ transactionDetails }) => {
  if (!transactionDetails) {
    return (
      <div className="text-center  p-6 bg-white shadow-md rounded-md max-w-md mx-auto mt-[300px]">
        <h1 className="text-2xl font-bold text-red-600">Payment Failed!</h1>
        <p className="text-gray-700 mt-4">There was an issue with your payment. Please try again.</p>
        <Link to="/" className="mt-6 inline-block px-6 py-2 text-white bg-blue-500 rounded-md shadow hover:bg-blue-600">
          Go to Homepage
        </Link>
      </div>
    );
  }

  const { id, payer } = transactionDetails || {};

  return (
    <div className="text-center p-6 bg-white shadow-md rounded-md max-w-md mx-auto mt-[200px]">
      <h1 className="text-2xl font-bold text-green-600">Payment Successful!</h1>
      <p className="text-gray-700 mt-4">
        Thank you for your purchase. Your transaction has been successfully completed.
      </p>
      {payer && (
        <div className="mt-6 text-left bg-gray-100 p-4 rounded-md shadow">
          <h2 className="text-lg font-semibold">Transaction Details:</h2>
          <p className="text-sm text-gray-600">
            <strong>Transaction ID:</strong> {id}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Payer Name:</strong> {payer.name?.given_name} {payer.name?.surname}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Email:</strong> {payer.email_address}
          </p>
        </div>
      )}
      <Link to="/" className="mt-6 inline-block px-6 py-2 text-white bg-blue-500 rounded-md shadow hover:bg-blue-600">
        Go to Homepage
      </Link>
    </div>
  );
};

export default PaymentSuccess;
