import { Layout } from 'antd';
import Sidebar from './components/general/Sidebar';
import Login from './components/auth/Login';

const { Header, Footer, Content } = Layout;

function App() {
  // const [user, setUser] = useState({})
  // const [isLoggedIn, setisLoggedIn] = useState(false)
  // const [isLoggedIn, setisLoggedIn] = useState(false)
  // const [loading, setLoading] = useState(true)
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
