import request from '../tools/request'
import { getAccessToken, removeAcssesToken, setAccessToken } from '../tools/utils'
import { useState } from 'react'
import AuthContext from '../../contexts/AuthContext'
import { useEffect } from 'react'

export default function AuthProvaider({ children }) {
    const [user, setUser] = useState({})
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    function login(data) {
        return request.post("/api/login", data)
            .then(({ data }) => {
                setAccessToken(data.token)
                getUser()
            })
    }

    function getUser() {
        setLoading(true)
        request("/api/user")
            .then(({ data }) => {
                setUser(data)
                setisLoggedIn(true)
            }).finally(() => {
                setLoading(false)
            })
    }

    function logout() {
        setisLoggedIn(false)
        removeAcssesToken()

    }

    useEffect(() => {
        const token = getAccessToken()

        if (token) {
            getUser()
        } else {
            setLoading(false)
        }
    }, [])
    return (
        <AuthContext.Provider value={{ login, user, loading, isLoggedIn, getUser, logout, removeAcssesToken }}>{children}</AuthContext.Provider>
    )
}
