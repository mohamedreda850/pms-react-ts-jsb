import axios from "axios"

const baseURL = 'https://upskilling-egypt.com:3003/api/v1'
export const imageBaseURL = 'https://upskilling-egypt.com:3003'

export const axiosInstanceURL = axios.create({baseURL: baseURL})

export const axiosInstance = axios.create({baseURL: baseURL, headers: {
    Authorization: localStorage.getItem("tokenums")
}})


// User Endpoints
export const AUTH_URL = {
    LOGIN: `/Users/Login`,
    REGISTER: `/Users/Register`,
    FORGET_PASSWORD: `/Users/Reset/Request`,
    RESET_PASSWORD: `/Users/Reset`,
    CHANGE_PASSWORD: `/Users/ChangePassword`,
    VERIFY_ACCOUNT: `/Users/verify`,
}

// Project Endpoints
export const PROJECT_URL = {
    GET_PROJECTS: `/Project/`,
    GET_PROJECT: (id:number) => `/Project/${id}`,
    POST_PROJECT: `/Project`,
    PUT_PROJECT: (id:number) => `/Project/${id}`,
    DELETE_PROJECT: (id:number) => `/Project/${id}`,
    GIT_PROJECTS_FOR_MANAGER:`/Project/manager`
}