import React from 'react'
import axios from 'axios'

const checkIdToken = () => {

    let user = JSON.parse(localStorage.getItem("user"));
    const baseUrl = "http://localhost:8000/api"

    const api = axios.create({
        baseUrl,
        headers:{Authorization: `Bearer ${user.accessToken}`}
    })

    return api
}

export default checkIdToken



