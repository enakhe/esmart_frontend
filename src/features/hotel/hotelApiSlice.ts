import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

interface Hotel {
  Name: string
  Email: string
  Location: string
  DateCreated: string
}

interface HotelApiResponse {
  hotels: Hotel[]
}

const getToken = () => localStorage.getItem("auth_token")

export const hotelApiSlice = createApi({
  reducerPath: "hotelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.esmartadmin.com/api/v1/Hotels",
    credentials: "include",
    prepareHeaders: headers => {
      const token = getToken()
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["Hotel"],
  endpoints: builder => ({
    getHotels: builder.query<HotelApiResponse, {}>({
      query: () => ({
        url: "/get",
        method: "GET",
      }),
    }),
    getHotelById: builder.query<Hotel, number>({
      query: id => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Hotel", id }],
    }),
    createHotel: builder.mutation<Hotel, Partial<Hotel>>({
      query: newHotel => ({
        url: "/create",
        method: "POST",
        body: newHotel,
      }),
    }),
    updateHotel: builder.mutation<Hotel, { id: number; hotel: Partial<Hotel> }>(
      {
        query: ({ id, hotel }) => ({
          url: `/${id}`,
          method: "PUT",
          body: hotel,
        }),
        invalidatesTags: (result, error, { id }) => [{ type: "Hotel", id }],
      },
    ),
    deleteHotel: builder.mutation<{ success: boolean; id: number }, number>({
      query: id => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Hotel", id }],
    }),
  }),
})

export const {
  useGetHotelsQuery,
  useGetHotelByIdQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
} = hotelApiSlice
