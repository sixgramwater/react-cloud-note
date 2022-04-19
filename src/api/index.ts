import ins from "./axios";

// const baseUrl = "localhost:4000";

export const imageUpload = (file: FormData) =>
  ins
    .post("/uploader/single", file, {
      baseURL: "http://124.220.0.95:8080/api",
    })
    .then((value) => value.data);

export const login = (username: string, password: string) =>
  ins
    .post("/auth/login", {
      username,
      password,
    })
    .then((res) => res.data);

export const register = (username: string, password: string) =>
  ins
    .post("/auth/register", {
      username,
      password,
    })
    .then((res) => res.data);

export const fetchRootEntryContent = () =>
  ins.get("/file?method=listPageByRoot").then((res) => res.data);

export const fetchRootEntry = () => ins.get('/file').then(res => res.data);


export const listPageByParentId = (entryId: string) =>
  ins.get(`/file/${entryId}?method=listPageByParentId`).then((res) => res.data);


export const fetchEntryById = (entryId: string) =>  
  ins.get(`/file/${entryId}?method=listById`).then((res) => res.data);


export const createFile = (
  name: string,
  parentId: string,
  fileId: string,
  dir: boolean
) =>
  ins
    .post("/file", {
      name,
      parentId,
      fileId,
      dir,
    })
    .then((res) => res.data);

export const syncFilePush = (fileId: string, bodyString: string) =>
  ins
    .post("/file/sync?method=push", {
      fileId,
      bodyString,
    })
    .then((res) => res.data);

export const syncFileDownload = (fileId: string) =>
  ins
    .post("/file/sync?method=download", {
      fileId,
    })
    .then((res) => res.data);
