import { Layout } from 'antd';
import Sidebar from './components/general/Sidebar';
import Login from './components/auth/Login';
import request from './components/tools/request';
import { setAccessToken } from './components/tools/utils';
import AuthContext from './contexts/AuthContext';
import { useState } from 'react';

const { Header, Footer, Content } = Layout;


function App() {
  return <Login />
  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sidebar />
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  )
}

export default App

