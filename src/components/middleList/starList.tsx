import React, { useEffect, useState } from "react";
import { fetchStar } from "../../api";
import FolderList from "../folderList";
import Searchbar from "../searchbar";
import EmptyFolder from "./empty";
import styles from "./index.module.scss";

const StarList = () => {
  const [list, setList] = useState([]);
  const isEmpty = list.length === 0;
  useEffect(() => {
    fetchStar().then((data) => {
      setList(data);
    });
  }, []);
  return (
    <div className={styles.list}>
      <div className={styles.listSearch}>
        <Searchbar />
      </div>
      <div className={styles.listDetail}>
        <div className={styles.listView}>
          {isEmpty ? (
            <EmptyFolder />
          ) : (
            <FolderList
              list={list as any}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StarList;