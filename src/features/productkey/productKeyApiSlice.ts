import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie';

interface ProductKey {
    HotelId: string;
    ActiveDays: number;
}

interface ProductKeyApiResponse {
    key: string,
    expirationDate: Date
}

const getToken = () => Cookies.get("JWT");

export const productKeyApiSlice = createApi({
    reducerPath: "hotelApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7160/ProductKeys",
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = getToken();
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["ProductKey"],
    endpoints: (builder) => ({
        getHotels: builder.query<ProductKeyApiResponse, {}>({
            query: () => ({
                url: "/get",
                method: "GET"
            }),
        }),
        getHotelById: builder.query<ProductKey, number>({
            query: (id) => `/${id}`
        }),
        createHotel: builder.mutation<ProductKey, Partial<ProductKey>>({
            query: (newKey) => ({
                url: "/create",
                method: "POST",
                body: newKey,
            }),
        }),
        updateHotel: builder.mutation<ProductKey, { id: number; hotel: Partial<ProductKey> }>({
            query: ({ id, hotel }) => ({
                url: `/${id}`,
                method: "PUT",
                body: hotel,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "ProductKey", id }],
        }),
        deleteHotel: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            })
        }),
    }),
});

export const {
    useGetProductKeysQuery,
    useGetProductKeyByIdQuery,
    useCreateProductKeyMutation,
    useUpdateProductKeyMutation,
    useDeleteProductKeyMutation,
} = productKeyApiSlice;