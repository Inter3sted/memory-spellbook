import React from "react";

function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled && !flipped) {
      handleChoice(card);
    }
  };

  return (
    <div
  onClick={handleClick}
  className="relative w-24 h-32 sm:w-28 sm:h-36 m-1 cursor-pointer perspective-1000"
>

      <div
        className={`w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of card (revealed) */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 overflow-hidden">
        <img
  src={card.src}
  alt="Card front"
  className="w-full h-full object-contain rounded"
/>
        </div>

        {/* Back of card (default view) */}
        <div className="absolute w-full h-full backface-hidden">
        <img
  src="/src/assets/card-back.png"
  alt="Card back"
  className="w-full h-full object-contain rounded"
/>
        </div>
      </div>
    </div>
  );
}

export default Card;
