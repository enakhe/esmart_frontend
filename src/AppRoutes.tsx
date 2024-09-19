import { Login } from "./features/authentication/login/Login";

const AppRoutes = [
    {
        path: '/login',
        element: <Login />,
        name: 'Login',
    },
]

export default AppRoutes;