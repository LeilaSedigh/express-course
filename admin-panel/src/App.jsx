import { Layout } from 'antd';
import Sidebar from './components/general/Sidebar';
import Login from './components/auth/Login';
import useAuth from './hooks/useAuth';

const { Header, Footer, Content } = Layout;


function App() {
  const { isLoggedIn , loading } = useAuth()

  if(loading){
    return "Loading ..."
  }
  return (
    <div>
      {isLoggedIn ? (
        <Layout>
          <Header>Header</Header>
          <Layout>
            <Sidebar />
            <Content>Content</Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>)
        : (
          <Login />
        )
      }
    </div>
  )
}

export default App

