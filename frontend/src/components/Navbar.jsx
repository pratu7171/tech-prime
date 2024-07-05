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
        <div className="fixed flex md:flex-col h-[56px] md:h-[768px] w-full md:w-[58px] gap-[50px] bottom-0 md:bottom-auto bg-[#ffffff] justify-center items-center shadow-lg left-0 z-10 md:rounded-none rounded-tl-3xl rounded-tr-3xl">
            <div className="flex md:flex-col items-center md:mt-[40px] gap-[40px] md:gap-[0px] md:mb-[-13px] ml-[65px] md:ml-0">
                <a href="/" className="md:mt-[60px] md:mr-[0px] mb-4 mr-[30px]">
                    <img src={location.pathname === "/" ? dashboardactive : dashboardicon} alt="Dashboard" />
                </a>
                <a href="/list" className="md:mt-[39px] mb-4">
                    <img src={location.pathname === "/list" ? projectlistactive : projectlist} alt="List" />
                </a>
                <div className="md:h-[1px] md:w-[33px] bg-[#979797] md:mt-[28.5px]"></div>
                <a href="/add-project" className="md:mt-[28.5px] mb-4">
                    <img src={location.pathname === "/add-project" ? createProjectactive : createProject} alt="Add Project" />
                </a>
            </div>
            {isAuth && (
                <div className="md:mt-[170px] md:mb-0 md:mr-0 mr-7 mb-[1565px] cursor-pointer" onClick={handleLogout}>
                    <img src={logouticon} alt="Logout" />
                </div>
            )}
        </div>
    );
}

export default Navbar;
