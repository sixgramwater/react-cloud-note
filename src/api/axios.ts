import axios from "axios";
import { getAccessToken } from "../utils";

const baseURL = 'http://localhost:4000'

const ins = axios.create({
  // timeout: 3000,
  baseURL: baseURL,
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem('token')}`,
  // }
})

ins.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
})
// ins.interceptors.response.use((res) => {
  
// }, (err) => {
//   if(err.response) {
//     switch(err.response.status) {
//       case 401:
//         console.log('401')
//         localStorage.removeItem('token')
//     }
//   }
  
// })

export default ins;

