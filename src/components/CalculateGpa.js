import React, { useState } from "react";

import CalculateGpaForm from "./CalculateGpaForm";

const CalculateGpa = () => {
  return (
    <div>
      <div className="bg-white py-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="sm:text-center">
            <h1 className="text-2xl font-semibold leading-8 text-indigo-600">
              Hoşgeldiniz
            </h1>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ortalama hesaplamanın en kolay yolu
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Bundan sonra istediğiniz gibi ortalama hesaplayabileceksiniz.
              Forma bilgilerinizi girerek hesaplamanızı yapabilirsiniz.
            </p>
          </div>
        </div>
      </div>

      <div class="max-w-xl mx-auto p-4">
        <CalculateGpaForm></CalculateGpaForm>
      </div>
    </div>
  );
};

export default CalculateGpa;
