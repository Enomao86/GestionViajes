import React from "react";

const BackgroundAnimation = () => {
  return (
    <div className="area">
      <ul className="circles">
        {[...Array(10)].map((_, index) => (
          <li key={index}></li>
        ))}
      </ul>
    </div>
  );
};

export default BackgroundAnimation;
