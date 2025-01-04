import { useGetKeywordsMutation } from "@/store/services/api";
import { setKeywords } from "@/store/slices/scanSlice";
import scanLogger from "@/utils/scanLogger";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function useKeywords() {
  const [getKeywords, { isLoading, error }] = useGetKeywordsMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllKeywords = async () => {
      try {
        const allKeywords = await getKeywords({}).unwrap();
        dispatch(setKeywords(allKeywords));
        scanLogger.log(`keywords: `, allKeywords);
      } catch (error) {
        scanLogger.error(
          `Getting All Keywords Error: ${
            (error as Error).message || "An unexpected error"
          }`
        );
      }
    };

    getAllKeywords();
  }, [getKeywords, dispatch]);

  return [!isLoading, error];
}
