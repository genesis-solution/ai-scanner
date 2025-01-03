import { Platform } from "react-native";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import scanLogger from "../../utils/scanLogger";

const customBaseQuery = fetchBaseQuery({
  prepareHeaders: (headers, { getState }) => {
    try {
      headers.set("Accept", "application/json");
      return headers;
    } catch (error) {
      if (error instanceof Error) {
        scanLogger.log("prepareHeaders error:", error?.message);
      } else {
        scanLogger.log("prepareHeaders error:", "An unexpected error occurred");
      }
      return headers;
    }
  },
  responseHandler: (res) => res.text(),
});

export const api = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOpts) => {
    try {
      const result = await customBaseQuery(args, api, extraOpts);
      try {
        //-- try parsing response as JSON
        result.data = JSON.parse(result.data as string);
      } catch {
        //-- silence is gold
      }
      return result;
    } catch (err) {
      if (err instanceof Error) {
        scanLogger.log(
          "baseQuery error:",
          err.message ?? "An unexpected error occurred"
        );
      } else {
        scanLogger.log("baseQuery error:", "An unexpected error occurred");
      }
      return {
        error: {
          status: "FETCH_ERROR",
          message: (err as Error)?.message || "An unexpected error occurred",
        },
      };
    }
  },
  endpoints: (builder) => ({
    getParseBarcode: builder.mutation({
      query: (barcode) => {
        scanLogger.log("call api - parse-barcode:", barcode);
        return {
          url: `https://us.openfoodfacts.org/api/v0/product/${barcode}`,
          method: "GET",
          headers: {
            "User-Agent": `FoodScanner - ${Platform.OS} - Version 1.0`,
          },
        };
      },
    }),
    getKeywords: builder.mutation({
      query: (_) => {
        scanLogger.log("call api - get-all-keywords:");
        return {
          url: `http://18.227.81.189:3000/api/keywords`,
          method: "GET",
        };
      },
    }),
    postAskAI: builder.mutation({
      query: (prompt) => {
        scanLogger.log("call api - ask-AI:", prompt);
        return {
          url: "api/v1/ask_ai",
          method: "POST",
          body: prompt,
        };
      },
    }),
  }),
});

export const {
  useGetParseBarcodeMutation,
  useGetKeywordsMutation,
  usePostAskAIMutation,
} = api;
