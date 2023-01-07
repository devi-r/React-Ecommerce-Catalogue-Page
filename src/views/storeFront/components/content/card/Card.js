import styles from "./card.module.scss";
import React, { useState, useEffect } from "react";

const Card = ({ view: cardView = "grid", cardData = {}, tag = null }) => {
  const {
    product = "",
    brand = "",
    discount = 0,
    mrp = 0,
    price = 0,
    searchImage = "",
    sizes = "",
    rating = null,
    ratingCount = null,
  } = cardData;

  const discountPercentage = ((discount / mrp) * 100).toFixed(0);
  const [showWishlist, setShowWishlist] = useState(false);

  const handleMouseEnter = () => {
    setShowWishlist(true);
  };

  const handleMouseLeave = () => {
    setShowWishlist(false);
  };

  return (
    <div
      className={`${styles.container} ${styles[cardView]}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.imageWrapper}>
        {cardData?.[tag?.key] ? (
          <div className={styles.tag}>{tag?.label}</div>
        ) : null}

        <img src={searchImage} />

        {rating && ratingCount && !showWishlist ? (
          <div className={styles.ratingsContainer}>
            {`${rating.toFixed(1)} `}
            <span className={styles.star}>&#9733;</span>
            {` | ${ratingCount}`}
          </div>
        ) : null}
      </div>
      <div className={styles.metaWrapper}>
        <div className={styles.togglingMeta}>
          {(showWishlist && cardView === "grid") || cardView === "list" ? (
            <>
              {cardView !== "list" && (
                <button className={styles.wishlistButton}>WISHLIST</button>
              )}
              <div className={styles.sizes}>
                Sizes:{" "}
                <span className={styles.sizeInventoryPresent}>{sizes}</span>
              </div>
            </>
          ) : null}
          <div className={styles.textWrapper}>
            <div>
              {(!showWishlist && cardView === "grid") || cardView === "list" ? (
                <>
                  <div className={styles.brand}>{brand}</div>
                  <div className={styles.product}>{product}</div>
                </>
              ) : null}

              <div className={styles.price}>
                <span>
                  <span className={styles.discountedPrice}>Rs {price}</span>
                  <span className={styles.strikedPrice}>Rs {mrp}</span>
                </span>
                <span
                  className={styles.discountPercentage}
                >{`(${discountPercentage}% OFF)`}</span>
              </div>
            </div>

            {cardView === "list" ? (
              <button className={styles.wishlistButton}>WISHLIST</button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
