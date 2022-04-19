import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { fetchRootEntry } from "../api";
import Sidebar from "../components/sidebar";
import { useAppDispatch } from "../hooks";
import styles from "./index.module.scss";

const Layout = () => {
  const dispatch = useAppDispatch();
  // const disptach = useDispatch();
  useEffect(() => {
    fetchRootEntry().then((value) => {
      dispatch({
        type: 'app/addEntryItem',
        payload: value,
      })
      dispatch({
        type:'app/setRootEntryId',
        payload: value.fileId
      })
    });
  }, []);
  return (
    <div className={styles.layout}>
      <div className={styles.leftSidebar}>
        <Sidebar />
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
