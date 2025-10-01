import React from "react";
import CardSkeleton from "./CardSkeleton";
import contentStyles from "../content/content.module.scss";
import { PAGE_SIZE } from "../../Constants";

const ContentSkeleton = ({ count = PAGE_SIZE, className = "" }) => {
  return (
    <div
      className={`${contentStyles.container} ${contentStyles.grid} ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ContentSkeleton;
