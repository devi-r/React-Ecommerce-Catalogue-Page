import React, { useState, useEffect } from "react";
import styles from "./checkbox.module.scss";
import { usePrevious } from "../../../hooks/usePrevious";

const CheckBox = ({
  checkedItems = [],
  list = [],
  handleMultiSelectDisplay = () => {},
  addClass = "",
  name = "",
}) => {
  const [state, setState] = useState({
    multiSelect: checkedItems,
  });

  const prevList = usePrevious(list);
  useEffect(() => {
    if (JSON.stringify(prevList) !== JSON.stringify(list)) {
      setState({
        multiSelect: [],
      });
    }
  }, [list]);

  const handleMultiClick = (item) => {
    let index = state.multiSelect.indexOf(item);
    let multiSelectArray = [...state.multiSelect];

    if (index > -1) {
      multiSelectArray.splice(index, 1);
    } else {
      multiSelectArray.push(item);
    }
    setState({
      multiSelect: multiSelectArray,
    });
    handleMultiSelectDisplay(multiSelectArray);
  };

  return (
    <>
      <div className={`${styles.container} ${addClass} `}>
        {list &&
          list?.map((item, index) => (
            <div
              className={`${styles.listItem}  
              ${checkedItems?.indexOf(item.id) >= 0 ? styles.itemChecked : ""}`}
              key={index}
              onClick={() => handleMultiClick(item.id)}
            >
              <input
                className={styles.inputCheckbox}
                type="checkbox"
                id={`${item.value}_${index}_${name}`}
                checked={checkedItems?.indexOf(item.id) >= 0}
              />

              <label
                className={`${styles.checkboxLabel} ${
                  checkedItems?.indexOf(item.id) >= 0
                    ? styles.checkboxLabelChecked
                    : ""
                } `}
                htmlFor={item.value}
              >
                {item.meta ? (
                  <span
                    className={styles.meta}
                    style={{ backgroundColor: `#${item.meta}` }}
                  ></span>
                ) : null}
                <span className={styles.value}>{item.value}</span>
              </label>
            </div>
          ))}
      </div>
    </>
  );
};

export default CheckBox;
