import React from "react";
<<<<<<< HEAD
=======
import cardBack from "../assets/cards/card-back.png";
>>>>>>> 14512f7 (Stable build: Escape fix, autoplay levels, no border, polished UI)

function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled && !flipped) {
      handleChoice(card);
    }
  };

  return (
    <div
<<<<<<< HEAD
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
=======
      onClick={handleClick}
      className="relative w-24 h-32 sm:w-28 sm:h-36 m-1 cursor-pointer perspective-1000"
    >
      <div
        className={`w-full h-full relative transform transition-transform duration-500 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Face */}
        <div className="absolute w-full h-full backface-hidden transform rotate-y-180 z-10">
          <img
            src={card.src}
            alt="Card front"
            className="w-full h-full object-contain rounded image-rendering-pixelated"
          />
        </div>

        {/* Back Face */}
        <div className="absolute w-full h-full backface-hidden z-0">
          <img
            src={cardBack}
            alt="Card back"
            className="w-full h-full object-contain rounded image-rendering-pixelated"
          />
>>>>>>> 14512f7 (Stable build: Escape fix, autoplay levels, no border, polished UI)
        </div>
      </div>
    </div>
  );
}

export default Card;
