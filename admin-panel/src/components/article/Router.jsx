import { Route, Routes } from 'react-router'
import List from './List'
import Add from './Add'

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<List />} />
            <Route path="/add" element={<Add />} />
        </Routes>
    )
}
