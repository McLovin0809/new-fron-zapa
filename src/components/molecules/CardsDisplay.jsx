import React from "react";
import DynamicTexts from "../molecules/DynamicTexts";
import ImageAtom from "../atoms/ImageAtom";
import '../../style/molecules/CardsDisplay.css'

function CardsDisplay({ content = [], className = "", isCardList = false }) {
  return (
    <div className={`cards ${className}`}>
      <div className={isCardList ? "cards-list" : "cards-grid"}>
        {content.map((item, index) => (
          <div
            key={index}
            className={isCardList ? "card-list" : "card"}
          >
            {item.card.map((element, idx) => {
              if (element.type === "image") {
                return (
                  <ImageAtom
                    key={idx}
                    src={element.src}
                    alt={element.alt}
                    className={isCardList ? "card-img-list" : "card-img"}
                  />
                );
              }
              if (element.type === "text") {
                return (
                  <DynamicTexts
                    key={idx}
                    Texts={[element]}
                    className="card-text"
                  />
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardsDisplay;