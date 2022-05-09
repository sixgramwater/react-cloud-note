import axios from "axios";
import { getAccessToken } from "../utils";

const baseURL = 'http://localhost:4000'
// const baseURL = 'http://124.220.0.95:4000'
// const baseURL = 'https://api.cloudwhite.xyz'


const ins = axios.create({
  // timeout: 3000,
  baseURL: baseURL,
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem('token')}`,
  // }
})

ins.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const expires = localStorage.getItem('token_expires');
  if(token) {
    if(expires && Number(expires) < Date.now()) {
      console.log('exp')
      // localStorage.removeItem('token');
    }
    config.headers!.Authorization = `Bearer ${token}`
  }
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

