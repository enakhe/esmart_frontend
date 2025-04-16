import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

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

const getToken = () => localStorage.getItem("auth_token")

export const productKeyApiSlice = createApi({
  reducerPath: "productKeyApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://samprogramming-001-site1.atempurl.com/api/v1/ProductKeys",
    credentials: "include",
    prepareHeaders: headers => {
      const token = getToken()
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
    fetchFn: async (url, options, extraOptions) => {
      const response = await fetch(url, options)

      if (response.status === 401 || response.status === 500) {
        localStorage.removeItem("auth_token")
        window.location.href = "/"
      }

      return response
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
        method: "POST",
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
