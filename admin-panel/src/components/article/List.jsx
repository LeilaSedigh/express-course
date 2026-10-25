import { Table } from "antd"
import request from "../tools/request"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Link } from "react-router"

const COLUMS = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Author',
        dataIndex: 'user',
        key: 'user',
        render: (el) => el.username
    },

]

async function getArticles(page) {
    const { data } = await request("/api/article", { params: { page } })
    return data;
}

function useArticles(page) {
    return useQuery({
        queryKey: ["articles", page],
        queryFn: () => getArticles(page),
        initialData: { items: [], total: 0, page: 1, limit: 4 }
    })
}

export default function List() {
    const [page, setPage] = useState(1)
    const { data, isLoading } = useArticles(page)

    return (
        <div>
            <Link to={"/article/add"}>Create Article</Link>
            <Table
                dataSource={data?.items}
                loading={isLoading}
                columns={COLUMS}
                rowKey={"id"}
                onChange={({ current }) => setPage(current)}
                pagination={{
                    total: data.totals,
                    current: data.page,
                    pageSize: data.limit
                }}
            />
        </div>
    )
}
