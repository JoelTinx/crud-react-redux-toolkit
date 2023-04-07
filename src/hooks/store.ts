import type { AppDispatch, RootState } from "@/store";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const useAppDispatch = () => AppDispatch = useDispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
