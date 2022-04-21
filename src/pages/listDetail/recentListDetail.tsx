import React from "react";
import { Outlet } from "react-router-dom";
import RecentList from "../../components/middleList/recentList";
import styles from "./index.module.scss";

const RecentListDetail = () => {
  // const { pathname } = useLocation();
  // const type = pathname.split('/');
  // console.log(pathname.split('/')[1]);
  // const curPath = pathname;
  return (
    <div className={styles.listDetail}>
      <div className={styles.list}>
        <RecentList/>
        {/* <MiddleList /> */}
      </div>
      <div className={styles.detailContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default RecentListDetail;
