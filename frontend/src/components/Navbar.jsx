import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import authlogout from '../redux/auth/auth.action';
import dashboardactive from "../assets/Dashboard-active.svg";
import dashboardicon from "../assets/Dashboard.svg";
import projectlistactive from "../assets/Project-list-active.svg";
import projectlist from "../assets/Project-list.svg";
import createProjectactive from "../assets/create-project-active.svg";
import createProject from "../assets/create-project.svg";
import logouticon from "../assets/Logout.svg";

function Navbar() {
    const location = useLocation();
    const isAuth = useSelector((store) => store.authReducer.isAuth);
    const dispatch = useDispatch();
    
    const handleLogout = () => {
        dispatch(authlogout()); // Dispatch the correct action for logout
    }

    console.log("isAuth:", isAuth); // Check the value of isAuth here

    return (
        <div className="fixed flex md:flex-col h-[50px] md:h-screen w-full md:w-20 xl:w-[58px] bg-[#ffffff] justify-center items-center shadow-lg left-0 bottom-0 md:bottom-auto mt-0 md:mt-0 xl:mt-20 z-10">
            <div className="flex md:flex-col gap-[50px] md:gap-[50px] items-center">
                <a href="/" className="mb-4">
                    <img src={location.pathname === "/" ? dashboardactive : dashboardicon} alt="Dashboard" />
                </a>
                <a href="/list" className="mb-4">
                    <img src={location.pathname === "/list" ? projectlistactive : projectlist} alt="List" />
                </a>
                <a href="/add-project" className="mb-4">
                    <img src={location.pathname === "/add-project" ? createProjectactive : createProject} alt="Add Project" />
                </a>
                {isAuth && (
                    <div className="mb-4 cursor-pointer" onClick={handleLogout}>
                        <img src={logouticon} alt="Logout" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
