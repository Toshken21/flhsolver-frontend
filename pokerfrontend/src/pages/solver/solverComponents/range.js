import React from "react";
import "./range.css"

function Range() {
  const ranks = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];

  const createButton = (className, text) => {
    return (
      <button key={className} className={className}>
        {text}
      </button>
    );
  };

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < ranks.length; i++) {
      const row = [];
      for (let j = 0; j < ranks.length; j++) {
        if (i === j) {
          // Pair
          const className = ranks[i] + ranks[j];
          const text = ranks[i] + ranks[j];
          row.push(createButton(className, text));
        } else if (j > i) {
          // Suited
          const suitedClassName = ranks[i] + ranks[j] + "s";
          const suitedText = ranks[i] + ranks[j] + "s";
          row.push(createButton(suitedClassName, suitedText));
        } else {
          // Offsuit
          const offsuitClassName = ranks[j] + ranks[i] + "o";
          const offsuitText = ranks[j] + ranks[i] + "o";
          row.push(createButton(offsuitClassName, offsuitText));
        }
      }
      rows.push(
        <div key={i} className="range-row">
          {row}
        </div>
      );
    }
    return rows;
  };

  return <div className="range-holder">{renderRows()}</div>;
}

export default Range;
