import React from 'react'
import request from '../tools/request'
import { removeAcssesToken, setAccessToken } from '../tools/utils'
import { useState } from 'react'

export default function AuthProvaider({ children }) {
    const [user, setUser] = useState({})
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    function login(data) {
        request.post("/api/login", data).then(({ data }) => {
            setAccessToken(data.token)
            getUser()
            setisLoggedIn(true)
        })
    }

    function getUser() {
        setLoading(true)
        request("/api/user").then(({ data }) => {
            setUser(data)
        }).finally(() => {
            setLoading(false)
        })
    }

    function logout() {
        setisLoggedIn(false)
        removeAcssesToken()

    }


    return (
        <AuthContext.Provider value={{ login, user, loading, isLoggedIn, getUser, logout, removeAcssesToken }}>{children}</AuthContext.Provider>
    )
}
