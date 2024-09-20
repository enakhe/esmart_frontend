import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'flowbite/dist/flowbite.js';
import Dashboard from "./features/dashboard/Dashboard";
import ProtectedRoute from "./features/authentication/ProtectedRoute";
import { Login } from "./features/authentication/login/Login";
import Home from "./features/dashboard/components/Home";
import Hotel from "./features/hotel/Hotel";
import ProductKey from "./features/productkey/ProductKey";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }>
                        <Route path="/" element={<Home />} />
                        <Route path="/hotel" element={<Hotel />} />
                        <Route path="/keys" element={<ProductKey />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    )
}

export default App
