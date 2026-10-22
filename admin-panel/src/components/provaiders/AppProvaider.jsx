import { ConfigProvider } from 'antd'
import AuthProvaider from './AuthProvaider'

export default function AppProvaider({ children }) {
    return (
        <ConfigProvider>
            <AuthProvaider>
                {children}
            </AuthProvaider>
        </ConfigProvider>
    )
}