import styles from "./content.module.scss";
import React from "react";
import Card from "./card/Card";

const Content = ({ view = "grid", data = [], tag = null }) => {
  return (
    <div
      className={`${styles.container} ${styles[view]} ${
        data?.length === 0 ? styles.zeroState : ""
      }`}
    >
      {data?.length > 0 ? (
        <>
          {data?.map((item, index) => {
            return <Card key={index} view={view} cardData={item} tag={tag} />;
          })}
          {Array(5)
            .fill(1)
            ?.map((_, index) => {
              return <div key={index} className={styles.dummyCard} />;
            })}
        </>
      ) : (
        <div className={styles.zeroStateText}>
          No Results. Try adjusting your Filters.
        </div>
      )}
    </div>
  );
};

export default Content;
