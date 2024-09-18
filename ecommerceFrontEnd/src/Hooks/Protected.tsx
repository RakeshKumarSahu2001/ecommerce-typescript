import { useECommerceStoreSelector } from '../EcommerceStore/ecommerceStoreHooks';
import { Navigate } from 'react-router-dom';

type childrenType={
    children:React.ReactNode
}

function Protected({ children }:childrenType) {
    const user = useECommerceStoreSelector((state) => state.checkLoginUser.loggedInUser);

    return user ? <>{children}</> : <Navigate to="/shopnow/login" replace={true} />;
}

export default Protected;
