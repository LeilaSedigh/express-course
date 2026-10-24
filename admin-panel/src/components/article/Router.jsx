import { Route, Routes } from 'react-router'
import List from './List'

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<List />} />
        </Routes>
    )
}
