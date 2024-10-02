import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Hotel {
  name: string
  email: string
  location: string
  dateCreated: string
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
    deleteHotel: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id: string) => ({
        url: `/delete/${id}`,
        method: "POST",
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
