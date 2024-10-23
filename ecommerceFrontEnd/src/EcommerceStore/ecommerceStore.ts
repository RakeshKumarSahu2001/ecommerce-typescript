import { configureStore } from "@reduxjs/toolkit";
import { ProductSlice } from "./ProductApi";
import { ProductDetailsSlice } from "./FetchProductDetailsApi";
import { createNewUserSlice } from "./SignUpApi";
import { checkLoginUser } from "./LoginApi";
import { cartSlice } from "./CartApi";
import { userCartSlice } from "./FetchUserCartProducts";


const ecommerceStore = configureStore({
    reducer: {
        products: ProductSlice.reducer,
        productDetails: ProductDetailsSlice.reducer,
        createNewUser: createNewUserSlice.reducer,
        checkLoginUser:checkLoginUser.reducer,
        addProductsToCart:cartSlice.reducer,
        userCartProducts:userCartSlice.reducer,
    }
})

export type ecommerceStoreState = ReturnType<typeof ecommerceStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type ecommerceStoreDispatch = typeof ecommerceStore.dispatch
export type ecommerceStore = typeof ecommerceStore


export default ecommerceStore;