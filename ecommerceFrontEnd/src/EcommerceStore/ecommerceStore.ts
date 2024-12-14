import { configureStore } from "@reduxjs/toolkit";
import { ProductSlice } from "./productsOpt/ProductApi";
import { ProductDetailsSlice } from "./productsOpt/FetchProductDetailsApi";
import { createNewUserSlice } from "./authOpt/SignUpApi";
import { loginSlice } from "./authOpt/LoginApi";
import { useraddToCartSlice } from "./cartOpt/FetchUserCartProducts";
import { createNewAddProductSlice } from "./productsOpt/AddNewProductApi";
import { FetchUserProfInfoSlice } from "./userProf/FetchUserProfInfoApi";
import { addToCartSlice } from "./cartOpt/AddToCartApi";
import { manageUserProfInfoSlice } from "./userProf/AddEditUserProfInfoApi";
import { deleteProductSlice } from "./productsOpt/DeleteSpecificProductById";
import { EditSpecificProductSlice } from "./productsOpt/EditSpecificProduct";
import { deleteCartProductSlice } from "./cartOpt/DeleteCartProduct";
import { EmailValidationSlice } from "./authOpt/EmailValidationApi";

const ecommerceStore = configureStore({
    reducer: {
        //product
        products: ProductSlice.reducer,
        productDetails: ProductDetailsSlice.reducer,

        //login & signup
        createNewUser: createNewUserSlice.reducer,
        loginSlice: loginSlice.reducer,
        EmailValidationSlice:EmailValidationSlice.reducer,
        //cart
        addProductsToCart: addToCartSlice.reducer,
        userCartProducts: useraddToCartSlice.reducer,
        deleteCartProductSlice:deleteCartProductSlice.reducer,

        //admin
        addNewProductsInTheWeb: createNewAddProductSlice.reducer,
        deleteProductSlice:deleteProductSlice.reducer,
        EditSpecificProductSlice:EditSpecificProductSlice.reducer,

        //user
        FetchUserProfInfoSlice:FetchUserProfInfoSlice.reducer,
        manageUserProfInfoSlice:manageUserProfInfoSlice.reducer
    }
});

export type ecommerceStoreState = ReturnType<typeof ecommerceStore.getState>;
export type ecommerceStoreDispatch = typeof ecommerceStore.dispatch;
export default ecommerceStore;
