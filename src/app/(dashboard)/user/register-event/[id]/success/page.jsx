import React from "react";

const Success = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Your registration is successful.
      </h1>
      <p className="text-gray-600 mb-4">
        You will receive an email with the event details. Please check your
        email for further instructions
      </p>
    </div>
  );
};

export default Success;
