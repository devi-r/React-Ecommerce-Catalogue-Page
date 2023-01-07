import React from "react";
import styles from "./radioInput.module.scss";

const RadioInput = ({
  id = null,
  label = "",
  name = "",
  value = "",
  disabled = false,
  checked = false,
  addClass = "",
  handleClick = () => {},
}) => {
  return (
    <div
      onClick={handleClick}
      className={`${styles.container} ${addClass ? addClass : ""}`}
    >
      <input
        type="radio"
        className={styles.inputRadio}
        value={value}
        name={name}
        id={id}
        disabled={disabled}
        checked={checked ? "checked" : false}
      />

      <label htmlFor={id} className={styles.inputLabel}>
        {label}
      </label>
    </div>
  );
};

export default RadioInput;
