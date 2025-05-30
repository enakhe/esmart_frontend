import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface LoginRequest {
  username: string
  password: string
}

interface LoginResponse {
  message: string
  token: string
  Id: string
  FullName: string
  UserName: string
  Email: string
}

export const authApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://samprogramming-001-site1.atempurl.com/api/v1",
    credentials: "include",
  }),
  reducerPath: "authApi",
  endpoints: build => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: credentials => ({
        url: "User/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          localStorage.setItem("auth_token", data.token)
        } catch (error) {
          console.error("Failed to login:", error)
        }
      },
    }),
  }),
})

export const { useLoginMutation } = authApiSlice
