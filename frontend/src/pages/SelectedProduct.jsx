import React, { useState } from "react";
import { useProductStore } from "../store/products.js";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";

const SelectedProduct = ({ product }) => {
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
      >
        <span className="sr-only">Close</span>
      </button>

      <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
        <img
          src={product.image}
          className="h-full w-max rounded-lg bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"
        />
        <div className="sm:col-span-8 lg:col-span-7">
          <h2 className="text-4xl mb-5 font-bold text-gray-900 sm:pr-12">
            {product.name}
          </h2>

          <section aria-labelledby="information-heading" className="mt-2">
            <p className="text-2xl text-gray-900">Price: {product.price}</p>
            <p className="mt-4 text-base text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet maiores aliquam ullam natus officiis quo est suscipit ipsum possimus dolore? Sequi sint ipsam, consequatur sit quaerat placeat non porro delectus!</p>
          </section>

          <button className="mt-8 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default SelectedProduct;
