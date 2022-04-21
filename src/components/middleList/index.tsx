import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FolderList from "../folderList";
import Searchbar from "../searchbar";
import styles from "./index.module.scss";
import { Left } from "@icon-park/react";
import { useQuery } from "react-query";
import { fetchEntryById, listPageByParentId } from "../../api";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { entryItem } from "../../store/appSlice";
import EmptyFolder from "./empty";

const MiddleList = () => {
  const { entryId } = useParams();
  const rootEntryId = useAppSelector((state) => state.app.rootEntryId);
  const curEntryItem = useAppSelector(state=>state.app.curEntryItem);
  const curEntryList = useAppSelector(state=>state.app.curEntryList);
  const [list, setList] = useState([]);
  const [currentEntryItem, setCurrentEntryItem] = useState<entryItem>();
  const showBackButton = entryId !== rootEntryId;
  const navigate = useNavigate();
  // const currentEntryItem = useAppSelector(state=>state.app.entryList.find(entry=>entry.fileId === entryId))
  // const [no]
  // console.log(currentEntryItem);
  // const folderName = entryId === rootEntryId ? '我的文件夹': currentEntryItem?.name
  const folderName = entryId === rootEntryId ? '我的文件夹': curEntryItem?.name
  // const isEmpty = list.length === 0;
  const isEmpty = curEntryList.length === 0;
  const dispatch = useAppDispatch();
  const navi = useNavigate();
  useEffect(() => {
    if(!entryId) {
      if(rootEntryId)
      navigate(`/${rootEntryId}`)
    } else {
      fetchEntryById(entryId).then(value => {
        dispatch({
          type: 'app/setCurEntryItem',
          payload: value,
        })
        setCurrentEntryItem(value);
        // dispatch({
        //   type: 'app/addEntryItem',
        //   payload: value,
        // })
        // console.log(value);
      }).catch(err => {
        console.log(err);
      })
    }
  }, [entryId, rootEntryId, dispatch, navigate])
  useEffect(() => {
    if (!entryId) return;
    listPageByParentId(entryId)
      .then((value) => {
        const { count, entries } = value;
        console.log(entries);
        
        dispatch({
          type: 'app/setCurEntryList',
          payload: entries,
        })
        // setList(mappedEntries);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [entryId]);
  const handleClickBack = () => {
    // if(!currentEntryItem)  return;
    // const { parentId } = currentEntryItem;
    // if(!parentId)  return;
    // console.log(parentId);
    // navi(`/${parentId}/`);
    if(!curEntryItem)  return;
    const { parentId } = curEntryItem;
    if(!parentId)  return;
    console.log(parentId);
    navi(`/${parentId}/`);

  };
  // const [entryList, setEntryList] =
  // const { data, isLoading } = useQuery(
  //   ["entry", entryId],
  //   () => listPageByParentId(entryId!),
  //   {
  //     enabled: entryId != null,
  //   }
  // );
  // const isEmpty = data.count === 0;
  // const list = isEmpty ? [] : data.entries;
  // useQuery()
  return (
    <div className={styles.list}>
      <div className={styles.listSearch}>
        <Searchbar />
      </div>
      <div className={styles.listDetail}>
        <div className={styles.listHeader}>
          {showBackButton && (
            <i className={styles.icon} onClick={handleClickBack}>
              <Left theme="outline" size="20" fill="#232d47" />
            </i>
          )}

          <div className={styles.pathName}>{folderName ?? '文件夹'}</div>
        </div>
        <div className={styles.listView}>
          {isEmpty ? (
            <EmptyFolder />
          ) : (
            <FolderList
              list={curEntryList as any}
              // list={list}
              // list={list}
              // showBackButton={rootEntryId === entryId}
              // onBack={handleBack}
            />
          )}
        </div>
      </div>
      {/* {entryId} */}
    </div>
  );
};

export default MiddleList;
