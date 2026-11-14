import { Button, Form, Input, Space } from "antd";
import useAuth from "../../hooks/useAuth";
import { useState, useRef, useEffect } from "react";
import { useLayoutEffect } from "react";
import request from "../tools/request";

export default function Chat({ socket, channel }) {
    const [form] = Form.useForm();
    const { user } = useAuth();
    const [messages, setMessage] = useState([])
    const listRef = useRef()
    const wrapperListRef = useRef()

    useLayoutEffect(() => {
        listRef.current.scrollIntoView()
    }, [messages[messages.length - 1]])

    useEffect(() => {
        loadMessages()
        socket.on("message", data => setMessage((s) => [...s, data]))
    }, [])

    function handleSubmit({ message }) {
        socket.emit("message", {
            message,
            from: user.id,
            to: channel.id,
        });

        form.resetFields();
    }

    function loadMessages() {
        const pervScrollHeight = wrapperListRef.current.scrollHeight

        request("/api/message", { params: { user, channel: channel.id, lastMessage: messages[0]?.id } })
            .then(({ data }) => {
                console.log(data)
                setMessage(s => [...data.reverse(), ...s])
                setTimeout(() => {
                    wrapperListRef.current.scrollTop = wrapperListRef.current.scrollHeight - pervScrollHeight

                }, 50)
            })
    }


    function handelScroll(e) {
        if (e.target.scrollTop === 0) {
            loadMessages()
        }
    }
    return (
        <div className="chat-box">
            <div ref={wrapperListRef} className="message-wrapper" onScroll={handelScroll}>
                <ul className="message-list">
                    {messages.map((message) => (
                        <li
                            key={message.id}
                            className={`message ${message.from === user.id ? "owner" : ""}`}>
                            <div className="text">{message.message}</div>
                            <div className="time">{message.createdAt}</div>
                        </li>
                    ))}
                    <li ref={listRef}></li>
                </ul>
            </div>
            <Form onFinish={handleSubmit} form={form}>
                <Space.Compact className="chat-form">
                    <Form.Item name="message" className="chat-input">
                        <Input autoFocus />
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            Send
                        </Button>
                    </Form.Item>
                </Space.Compact>
            </Form>
        </div>
    );
}
