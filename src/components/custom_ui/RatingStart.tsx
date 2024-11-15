import { useState } from "react";

function RatingStars({ rating }: { rating: number }) {
  const maxStars = 5;
  const fullStars = Math.floor(rating);
  const emptyStars = maxStars - fullStars;

  return (
    <div className="text-yellow-500 text-sm flex items-center mt-2">
      {Array(fullStars)
        .fill(null)
        .map((_, index) => (
          <span key={index}>★</span>
        ))}
      {Array(emptyStars)
        .fill(null)
        .map((_, index) => (
          <span key={index}>☆</span>
        ))}
      <span className="text-gray-500 ml-2">({rating} / 5)</span>
    </div>
  );
}



export default RatingStars;
