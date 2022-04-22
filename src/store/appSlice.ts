import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface entryItem {
  fileId: string;
  name: string;
  userId: string;
  parentId: string | null;
  updated: number;
  created: number;
  dir: boolean;
}

export interface userType {
  username: string;
  userId: string;
  avatarUrl?: string;

}

export interface AppState {
  entryList: entryItem[],
  user: userType | undefined;
  path: String[];
  rootEntryId: string | undefined;
  userToken: string | null;
  curEntryItem: entryItem | undefined;
  curEntryList: entryItem[];
}

const initialState: AppState = {
  entryList: [],
  user: undefined,
  path: [],
  rootEntryId: undefined,
  userToken: localStorage.getItem('token'),
  curEntryItem: undefined,
  curEntryList: [],
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addEntryItem(state, action) {
      const {fileId} = action.payload;
      const entryIndex = state.entryList.findIndex(entryItem => entryItem.fileId === fileId);
      if(entryIndex === -1) {
        state.entryList.push(action.payload);
      } else {
        state.entryList[entryIndex] = action.payload;
      }
    },
    removeEntryItem(state, action) {
      const {fileId} = action.payload;
      const entryIndex = state.entryList.findIndex(entryItem => entryItem.fileId === fileId);
      state.entryList.splice(entryIndex, 1);
    },
    upadateEntryItem(state, action) {
      const {fileId} = action.payload;
      const entryIndex = state.entryList.findIndex(entryItem => entryItem.fileId === fileId);
      if(entryIndex !== -1) {
        state.entryList[entryIndex] = action.payload;
      } 
    },
    setRootEntryId(state, action) {
      const rootEntryId = action.payload;
      state.rootEntryId = rootEntryId;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.userToken = action.payload;
    },
    removeToken(state, action) {
      state.userToken = null;
      localStorage.removeItem('token');
    },
    setCurEntryItem(state, action) {
      state.curEntryItem = action.payload;
    },
    setCurEntryList(state, action) {
      state.curEntryList = action.payload;
    },
    addCurEntryList(state, action) {
      state.curEntryList.push(action.payload);
    },
    updateCurEntryList(state, action) {
      const { fileId } = action.payload;
      const entryItemIndex = state.curEntryList.findIndex(item => item.fileId === fileId);
      if(entryItemIndex === -1) {
        return;
      } else {
        const item = state.curEntryList[entryItemIndex];
        state.curEntryList[entryItemIndex] = {
          ...item,
          ...action.payload,
        }
      }
    }
  }
})

export default appSlice.reducer;
