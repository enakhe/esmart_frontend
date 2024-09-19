import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Hotel {
    Name: string;
    Email: string;
    Location: string;
    DateCreated: Date;
}

interface HotelApiResponse {
    hotels: Hotel[];
}

const getToken = () => localStorage.getItem("esmart_token");

export const hotelApiSlice = createApi({
    reducerPath: "hotelApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7160/Hotels",
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = getToken();
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Hotel"],
    endpoints: (builder) => ({
        getHotels: builder.query<HotelApiResponse, {}>({
            query: () => ({
                url: "/get",
                method: "GET"
            }),
        }),
        getHotelById: builder.query<Hotel, number>({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Hotel", id }],
        }),
        createHotel: builder.mutation<Hotel, Partial<Hotel>>({
            query: (newHotel) => ({
                url: "",
                method: "POST",
                body: newHotel,
            }),
            invalidatesTags: [{ type: "Hotel", id: "LIST" }],
        }),
        updateHotel: builder.mutation<Hotel, { id: number; hotel: Partial<Hotel> }>({
            query: ({ id, hotel }) => ({
                url: `/${id}`,
                method: "PUT",
                body: hotel,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Hotel", id }],
        }),
        deleteHotel: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Hotel", id }],
        }),
    }),
});

export const {
    useGetHotelsQuery,
    useGetHotelByIdQuery,
    useCreateHotelMutation,
    useUpdateHotelMutation,
    useDeleteHotelMutation,
} = hotelApiSlice;
