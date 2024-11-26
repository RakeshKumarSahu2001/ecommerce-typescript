import { Navigate } from 'react-router-dom';

type childrenType={
    children:React.ReactNode
}

function Protected({ children }:childrenType) {
    const user=localStorage.getItem("Id");

    return user ? <>{children}</> : <Navigate to="/shopnow/login" replace={true} />;
}

export default Protected;
