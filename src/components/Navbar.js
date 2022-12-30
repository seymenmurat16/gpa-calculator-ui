import React from "react";

const Navbar = () => {
  return (
    <div>
      <div className="bg-indigo-500">
        <div className="container mx-auto">
          <div className="h-16 px-8 flex items-center">
            <div className="flex-auto">
              <p className="text-white font-bold">GPA Calculator</p>
            </div>
            <button className=" mr-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
              Sign in
            </button>
            <button className="inline-flex justify-center rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium text-indigo-600 shadow-sm hover:bg-indigo-300 hover:text-white">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
