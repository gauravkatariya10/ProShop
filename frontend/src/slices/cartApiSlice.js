import { apiSlice } from "./apiSlices";
import { CART_URL } from "../constants";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveCart: builder.mutation({
      query: (cartItems) => ({
        url: CART_URL,
        method: "PUT",
        body: cartItems,
      }),
    }),
    getCart: builder.query({
      query: (userId) => ({
        url: `${CART_URL}/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useSaveCartMutation, useGetCartQuery } = cartApiSlice;
