
import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-5">
      <h1 className="text-4xl font-bold text-green-700 mb-4">
        Payment Successful!
      </h1>
      <p className="text-lg text-green-900 mb-6">
        Thank you for your purchase. Your order has been confirmed.
      </p>

    </div>
  );
};

export default Success;
