// src/components/Card.jsx
import React from "react";
import cardBack from "../assets/cards/card-back.png";

function Card({ card, handleChoice, flipped, disabled }) {
  const onClick = () => {
    if (!disabled) handleChoice(card);
  };

  return (
    <div
      onClick={onClick}
      style={{ perspective: "1000px" }}
      className="relative w-24 h-32 sm:w-28 sm:h-36 m-1 cursor-pointer"
    >
      <div
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.5s ease",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
        className="relative w-full h-full"
      >
        {/* Front Face */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={card.src}
            alt="Card front"
            className="w-full h-full object-contain rounded"
          />
        </div>

        {/* Back Face */}
        <div
          style={{
            backfaceVisibility: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={cardBack}
            alt="Card back"
            className="w-full h-full object-contain rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
