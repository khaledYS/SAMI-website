import { useContext, useEffect } from "react";
import { Outlet, Route, useNavigate } from "react-router";
import { AuthContext } from "../Auth/Auth";

function PrivateRoute() {
    const {currentUser} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if(!currentUser){
            navigate("/login")
            return null;
        }
        
    }, [currentUser]);

    return currentUser && <Outlet />
}

export default PrivateRoute;