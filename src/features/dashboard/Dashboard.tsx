import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import SideBar from "./components/SideBar";

const Dashboard = () => {



    return (
        <>
            <Nav />
            <SideBar />
            <Outlet />
        </>
    )
}


export default Dashboard;