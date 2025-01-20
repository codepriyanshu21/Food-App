import React from 'react';
import { useRouteError } from 'react-router-dom';

const Error = () => {
  const err = useRouteError();
  console.log(err);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <div className="max-w-md text-center bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-5xl font-extrabold text-red-500 mb-4">Oops!!!</h1>
        <p className="text-2xl font-semibold mb-2">Something went wrong</p>
        <p className="text-gray-600 text-lg mb-6">
          {err.status} : {err.statusText}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default Error;
