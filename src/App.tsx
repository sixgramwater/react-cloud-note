import React from 'react';
import './App.css';
import "antd/dist/antd.css";
import '@icon-park/react/styles/index.css';
// import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import ListDetail from './pages/listDetail';
import Detail from './pages/detail';
import Layout from './Layout';

const Login = () => {
  return (
    <div className="login">
      login
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<Layout/>}>
          {/* <Route path=":" */}
          <Route path=":entryId" element={<ListDetail/>}>
            <Route path=":fileId" element={<Detail/>} />
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
