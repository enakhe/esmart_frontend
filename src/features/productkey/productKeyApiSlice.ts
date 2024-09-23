import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

interface ProductKey {
  HotelId: string
  ActiveDays: number
}

interface ProductKeyApiResponse {
  Id: string
  Key: string
  HotelId: string
  HotelName: string
  ExpirationDate: string
  IsActive: boolean
  DateCreated: string
}

const getToken = () => Cookies.get("JWT")

export const productKeyApiSlice = createApi({
  reducerPath: "productKeyApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.eitiltech.com/ProductKeys",
    credentials: "include",
    prepareHeaders: headers => {
      const token = getToken()
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["ProductKey"],
  endpoints: builder => ({
    getProductKeys: builder.query<ProductKeyApiResponse, {}>({
      query: () => ({
        url: "/get",
        method: "GET",
      }),
    }),
    getProductKeyById: builder.query<ProductKey, string>({
      query: id => `/get/${id}`,
    }),
    createProductKey: builder.mutation<ProductKey, Partial<ProductKey>>({
      query: newKey => ({
        url: "/create",
        method: "POST",
        body: newKey,
      }),
    }),
    updateProductKey: builder.mutation<
      ProductKey,
      { id: number; hotel: Partial<ProductKey> }
    >({
      query: ({ id, hotel }) => ({
        url: `/${id}`,
        method: "PUT",
        body: hotel,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "ProductKey", id }],
    }),
    deleteProductKey: builder.mutation<
      { success: boolean; id: number },
      number
    >({
      query: id => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useGetProductKeysQuery,
  useGetProductKeyByIdQuery,
  useCreateProductKeyMutation,
  useUpdateProductKeyMutation,
  useDeleteProductKeyMutation,
} = productKeyApiSlice
