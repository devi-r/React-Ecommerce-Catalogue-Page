import styles from "./toggleView.module.scss";
import React, { useState } from "react";
import { CARD_VIEWS } from "../../Constants";

const ToggleView = ({ handleToggle = () => {} }) => {
  const [active, setActive] = useState(0);

  const handleClick = (selectedIndex) => {
    setActive(selectedIndex);
    handleToggle(CARD_VIEWS[selectedIndex]?.toLowerCase());
  };

  return (
    <div className={styles.wrapper}>
      {CARD_VIEWS?.map((item, index) => {
        return (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`${styles.button} ${
              active === index ? styles.active : ""
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default ToggleView;
