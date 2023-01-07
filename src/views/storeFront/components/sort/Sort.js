import React from "react";
import styles from "./sort.module.scss";

const Sort = ({
  className = "",
  defaultOpen = "",
  title = "",
  defaultOption = "",
  options = [],
  name = "",
  handleSort = () => {},
}) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <details open={defaultOpen} className={styles.details}>
        <summary className={styles.summary}>
          <span className={styles.title}>{title}: </span>
          <span className={styles.defaultOption}>{defaultOption.value}</span>
          <span className={styles.caret}></span>
        </summary>

        <details-menu>
          <div className={styles.menuList}>
            <div className={styles.menuModal}>
              <div className={styles.list}>
                {options?.map((option, index) => {
                  return (
                    <div
                      className={styles.menuItem}
                      key={index}
                      onClick={() => handleSort(option)}
                    >
                      <label>
                        <input
                          type="radio"
                          name={name}
                          id={option.key}
                          defaultValue={option.value}
                          onChange={() => {}}
                          checked={
                            defaultOption.value === option.value ? true : false
                          }
                          hidden="hidden"
                        />
                        <span className={styles.menuText}>{option.value}</span>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </details-menu>
      </details>
    </div>
  );
};

export default Sort;
