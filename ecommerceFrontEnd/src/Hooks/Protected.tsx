import { useEffect, useState } from 'react';
import { useECommerceStoreDispatch, useECommerceStoreSelector } from '../EcommerceStore/ecommerceStoreHooks';
import { Navigate } from 'react-router-dom';
import { authSlice } from '../EcommerceStore/LoginApi';

type childrenType={
    children:React.ReactNode
}

function Protected({ children }:childrenType) {
    const user = useECommerceStoreSelector((state) => state.authSlice.loggedInUser);
    const dispatch=useECommerceStoreDispatch();
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const userInfo=localStorage.getItem("loginUserInfo")
        console.log(userInfo)
        if(userInfo){
            dispatch(authSlice.actions.setUserFromLocalStorage(userInfo))
        }
        setLoading(false)
    },[dispatch])

    if(loading){
        return <div>Loading....</div>
    }

    return user ? <>{children}</> : <Navigate to="/shopnow/login" replace={true} />;
}

export default Protected;
