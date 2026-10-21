import Menu from './Menu'
import { Layout } from 'antd';
const { Sider } = Layout;

export default function Sidebar() {
    return (
        <Sider width="25%">
            <Menu />
        </Sider>
    )
}
