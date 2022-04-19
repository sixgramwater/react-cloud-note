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
}

const initialState: AppState = {
  entryList: [],
  user: undefined,
  path: [],
  rootEntryId: undefined,
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
    }
  }
})

export default appSlice.reducer;
