import { Table } from "antd"
import request from "../tools/request"
import { useQuery } from "@tanstack/react-query"

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

]

async function getArticles() {
    const { data } = await request("/api/article")
    return data;
}

export default function List() {
    const { data, isLoading } = useQuery({
        queryKey: ["articles"],
        queryFn: getArticles,
    })

    return (
        <div>
            <Table
                dataSource={data?.items}
                loading={isLoading}
                columns={COLUMS}
            />
        </div>
    )
}
