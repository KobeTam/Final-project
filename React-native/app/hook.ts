import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { IRootState, AppDispatch } from "../store/store";


// export const useAppDispatch: ()=> AppDispatch = useDispatch
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector