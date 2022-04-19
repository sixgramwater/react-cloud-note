import ins from "./axios";

const baseUrl = "";

export const imageUpload = (file: FormData) =>
  ins
    .post("http://124.220.0.95:8080/api/uploader/single", file)
    .then((value) => value.data);

