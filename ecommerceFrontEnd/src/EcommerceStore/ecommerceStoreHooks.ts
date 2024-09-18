import { useDispatch, useSelector } from "react-redux";
import { ecommerceStoreDispatch,ecommerceStoreState } from "./ecommerceStore";


export const useECommerceStoreDispatch=useDispatch.withTypes<ecommerceStoreDispatch>()
export const useECommerceStoreSelector=useSelector.withTypes<ecommerceStoreState>()