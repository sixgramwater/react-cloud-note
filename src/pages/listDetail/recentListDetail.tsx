import React from "react";
import { Outlet } from "react-router-dom";
import RecentList from "../../components/middleList/recentList";
import StarList from "../../components/middleList/starList";
import styles from "./index.module.scss";

const RecentListDetail = ({ type }: { type: "recent" | "star" }) => {
  return (
    <div className={styles.listDetail}>
      <div className={styles.list}>
        {type === "recent" && <RecentList />}
        {type === "star" && <StarList />}
      </div>
      <div className={styles.detailContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default RecentListDetail;
