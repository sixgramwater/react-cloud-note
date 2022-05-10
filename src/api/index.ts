import ins from "./axios";

// const baseUrl = "localhost:4000";

export const imageUpload = (file: FormData) =>
  ins
    .post("/upload", file)
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

export const fetchRootEntry = () => ins.get("/file").then((res) => res.data);

export const listPageByParentId = (entryId: string) =>
  ins.get(`/file/${entryId}?method=listPageByParentId`).then((res) => res.data);

export const fetchEntryById = (entryId: string) =>
  ins.get(`/file/${entryId}?method=listById`).then((res) => res.data);

export const fetchUserProfile = () =>
  ins.get(`/users/profile`).then((res) => res.data);

export const fetchRecent = () =>
  ins.get("/file/recent").then((res) => res.data);

export const fetchStar = () => ins.get("/file/star").then((res) => res.data);

export const deleteFile = (fileId: string) =>
  ins.delete(`/file/${fileId}`).then((res) => res.data);

export const searchFile = (keywords: string) =>
  ins.get("/file/search", { params: { keywords } }).then((res) => res.data);

type entryType = {
  type: number;
  fileId: string;
  name: string;
  parentId: string;
  dir: boolean;
};

export const createEntryItem = ({
  type,
  fileId,
  name,
  parentId,
  dir,
}: entryType) =>
  ins
    .post(`/file`, { type, fileId, name, parentId, dir })
    .then((res) => res.data);

export const updateEntryName = (fileId: String, name: string) =>
  ins
    .patch(`/file/${fileId}`, {
      name,
    })
    .then((res) => res.data);

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

export const starFile = (fileId: string, star: boolean) =>
  ins.post("/file/star", { fileId, star }).then((res) => res.data);
