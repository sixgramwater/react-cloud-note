import React, { useEffect, useState } from 'react';
import './App.css';
import "antd/dist/antd.css";
import '@icon-park/react/styles/index.css';
// import { Layout } from 'antd';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ListDetail from './pages/listDetail';
import Detail from './pages/detail';
import Layout from './Layout';
import { fetchUserProfile } from './api';
import { useAppDispatch, useAppSelector } from './hooks';
import Login from './pages/login';
import Fallback from './pages/fallback';
import RecentListDetail from './pages/listDetail/recentListDetail';

// const Login = () => {
//   return (
//     <div className="login">
//       login
//     </div>
//   )
// }

function App() {
  // const [isAuth, setIsAuth] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(state=>state.app.userToken);
  const isAuth = token != null;
  // const user = useAppSelector(state => state.app.user);
  // const dispatch
  // useEffect(() => {
  //   // const token = localStorage.getItem('token')
  //   if(token) {
  //     // console.log(token);
  //     dispatch({
  //       type: 'app/setToken',
  //       payload: token
  //     })
  //     // setIsAuth(true);
      
  //   } else {
  //     // setIsAuth(false);
  //     // navigate('/login')
  //   }
  // }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        
        <Route path="/" element={isAuth ? <Layout/> : <Navigate to='/login'/>}>
          {/* <Route path=":" */}
          <Route index element={<ListDetail />}></Route>
          <Route path="recent" element={<RecentListDetail/>}>
            <Route index element={<Fallback hasBorder/>}/>
            <Route path=":fileType/:fileId" element={<Detail/>} />
          </Route>
          <Route path=":entryId" element={<ListDetail/>}>
            <Route index element={<Fallback hasBorder/>}/>
            <Route path=":fileType/:fileId" element={<Detail/>} />
            {/* <Route path=":fileType/:fileId" element={<Detail/>} /> */}
          </Route>
        </Route>
      </Routes>
      {/* <div className="main-container">
        <Layout/>
      </div> */}
    </div>
  );
}

export default App;
