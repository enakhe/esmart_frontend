import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("JWT");

        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    return <>{children}</>;
};

export default ProtectedRoute;
