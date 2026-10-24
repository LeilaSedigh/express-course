import { ConfigProvider } from 'antd'
import AuthProvaider from './AuthProvaider'
import { BrowserRouter as Router } from 'react-router'
import QueryProvider from './QueryProvider'

export default function AppProvaider({ children }) {
    return (
        <ConfigProvider>
            <Router>
                <QueryProvider>
                    <AuthProvaider>{children}</AuthProvaider>
                </QueryProvider>
            </Router>
        </ConfigProvider>
    )
}