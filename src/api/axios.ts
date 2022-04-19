import axios from "axios";
import { getAccessToken } from "../utils";

const baseURL = 'http://localhost:4000'

const ins = axios.create({
  // timeout: 3000,
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  }
})

export default ins;

