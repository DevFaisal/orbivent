import React from "react";

const InputField = ({ label, name, type, placeholder, register, error }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-semibold text-gray-700 transition-colors duration-200 ease-in-out hover:text-gray-900"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          {...register}
          className={`
            w-full px-4 py-2 text-gray-700 bg-white border rounded-lg
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
            }
            hover:border-gray-400
          `}
        />
        {error && (
          <p className="mt-1 text-xs text-red-500 transition-all duration-200 ease-in-out">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default InputField;
