import { ReactNode } from 'react';
import IsAdmin from './isAdmin';

type ChildrenType = {
    children: ReactNode;
};

function AdminOnly({ children }: ChildrenType) {
    const isAdminObj = new IsAdmin();
    
    return isAdminObj.access ? <>{children}</> : <div>Admin Only</div>;
}

export default AdminOnly;
