import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "./store";

// useDispatch + type
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// useSelecter + type
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector