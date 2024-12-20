import { Navigate } from 'react-router-dom';

type childrenType={
    children:React.ReactNode
}

function Protected({ children }:childrenType) {
    const user=sessionStorage.getItem("Id");

    return user ? <>{children}</> : <Navigate to="/auth/login" replace={true} />;
}

export default Protected;
