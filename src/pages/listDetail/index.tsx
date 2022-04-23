import React from "react";
import { Outlet } from "react-router-dom";
import MiddleList from "../../components/middleList";
import styles from "./index.module.scss";

const ListDetail = () => {
  // const { pathname } = useLocation();
  // const type = pathname.split('/');
  // console.log(pathname.split('/')[1]);
  // const curPath = pathname;
  return (
    <div className={styles.listDetail}>
      <div className={styles.list}>
        <MiddleList />
      </div>
      <div className={styles.detailContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default ListDetail;
