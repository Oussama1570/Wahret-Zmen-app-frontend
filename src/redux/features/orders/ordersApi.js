import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl().replace(/\/$/, "")}/api/orders`,
    credentials: "include",
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    // ✅ Create a new order
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/",
        method: "POST",
        body: newOrder,
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),

    // ✅ Get all orders (for Admin)
    getAllOrders: builder.query({
      query: () => "/",
      providesTags: ["Orders"],
    }),

    // ✅ Get order by ID
    getOrderById: builder.query({
      query: (id) => ({
        url: `/${id}`,
      }),
      providesTags: ["Orders"],
    }),

    // ✅ Get orders by user email
    getOrderByEmail: builder.query({
      query: (email) => ({
        url: `/email/${email}`,
      }),
      providesTags: ["Orders"],
    }),

    // ✅ Update an order
    updateOrder: builder.mutation({
      query: ({ orderId, isPaid, isDelivered, completionPercentage }) => ({
        url: `/${orderId}`,
        method: "PATCH",
        body: { isPaid, isDelivered, completionPercentage },
        credentials: "include",
      }),
      invalidatesTags: ["Orders"],
    }),

    // ✅ Delete an order
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useGetOrderByEmailQuery, // ✅ Ensure this is exported
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;

export default ordersApi;
