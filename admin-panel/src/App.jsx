import './App.css'

function App() {
  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider width="25%">
          Sider
        </Sider>
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  )
}

export default App
