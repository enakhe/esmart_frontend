import { Login } from "./features/authentication/login/Login";

const AppRoutes = [
    {
        path: '/',
        element: <Login />,
        name: 'Login',
    },
]

export default AppRoutes;