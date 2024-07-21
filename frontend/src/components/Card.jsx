import React from "react";
import loginbg from "../assets/Header-bg.svg";
import Logo from "../assets/Logo.svg";
import logouticon from "../assets/Logout.svg";
import authlogout from "../redux/auth/auth.action";
import { useDispatch, useSelector } from "react-redux";


const Card = ({ title }) => {
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authlogout());
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 bg-no-repeat bg-cover md:w-[1308px] flex md:flex-col p-[18px] h-[55px] md:h-[150px] md:ml-[58px] w-full md:z-10"
        style={{ backgroundImage: `url(${loginbg})` }}
      >
        <div className="w-full md:w-[calc(100%-80px)] flex">
          <p className="text-white text-left font-nunito text-[20px] leading-[30px] md:mt-[21px] font-[800] ml-[12px]">
            {title}
          </p>
          <div className="hidden md:block m-auto">
            <img src={Logo} alt="logo" className="mt-[9px] mb-[26px]" />
          </div>
        </div>
        {isAuth && (
        <div className="flex flex-row cursor-pointer"
        onClick={handleLogout}>
        <img src={logouticon} alt="Logout" className="h-[20px] w-[20px]"/>
        </div>
        )}
      </div>
    </>
  );
};

export default Card;
