import React, { useState, useRef, useEffect } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSummaryClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    handleSort(option);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.container} ${className}`} ref={dropdownRef}>
      <details open={isOpen} className={styles.details}>
        <summary className={styles.summary} onClick={handleSummaryClick}>
          <span className={styles.title}>{title}: </span>
          <span className={styles.defaultOption}>{defaultOption.value}</span>
          <span className={styles.caret}></span>
        </summary>

        {isOpen && (
          <details-menu>
            <div className={styles.menuList}>
              <div className={styles.menuModal}>
                <div className={styles.list}>
                  {options?.map((option, index) => {
                    return (
                      <div
                        className={styles.menuItem}
                        key={index}
                        onClick={() => handleOptionClick(option)}
                      >
                        <label>
                          <input
                            type="radio"
                            name={name}
                            id={option.key}
                            defaultValue={option.value}
                            onChange={() => {}}
                            checked={
                              defaultOption.value === option.value
                                ? true
                                : false
                            }
                            hidden="hidden"
                          />
                          <span className={styles.menuText}>
                            {option.value}
                          </span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </details-menu>
        )}
      </details>
    </div>
  );
};

export default Sort;
