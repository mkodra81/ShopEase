import React, { useState } from "react";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useProductStore } from "../store/products.js";

const HeartIcon = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  let likedProducts = useProductStore((state) => state.likedProducts);

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
    toggleFavourite();
  };

  const toggleFavourite = () => {
    if (!isLiked) {
      let checkForDoubleCount = 0;

      likedProducts.forEach((likedProduct, _index) => {
        if (likedProduct.name._id !== props.name._id) {
          checkForDoubleCount += 1;
        }
      });

      if (checkForDoubleCount === likedProducts.length) {
        likedProducts.push(props);
      }

    } else {
      let dislikedIndex;

      likedProducts.forEach((likedProduct, index) => {
        if (likedProduct.name._id === props.name._id) {
          dislikedIndex = index;
          likedProducts.splice(dislikedIndex, 1);
        }
      });
    }
  };

  return (
    <button onClick={toggleLike}>
      {isLiked ? (
        <SolidHeartIcon className="h-7 w-7 text-indigo-500 transition duration-200" />
      ) : (
        <OutlineHeartIcon className="h-7 w-7 text-gray-400 hover:text-indigo-500 transition duration-200" />
      )}
    </button>
  );
};

export default HeartIcon;
