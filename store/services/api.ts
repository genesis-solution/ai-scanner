import { Platform } from "react-native";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import scanLogger from "../../utils/scanLogger";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({}),
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
    postOCR: builder.mutation({
      query: (formData) => {
        return {
          url: "https://api.ocr.space/parse/image",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useGetParseBarcodeMutation,
  useGetKeywordsMutation,
  usePostAskAIMutation,
  usePostOCRMutation,
} = api;
