import React from "react";
import loginbg from "../assets/Header-bg.svg";
import Logo from "../assets/Logo.svg";

const Card = ({ title }) => {
  return (
    <>
      <div
        className="fixed top-0 left-0 bg-no-repeat bg-cover md:w-[1308px] flex flex-col p-[18px] h-[55px] md:h-[150px] md:ml-[58px] w-full md:z-10"
        style={{ backgroundImage: `url(${loginbg})` }}
      >
        <div className="w-full md:w-[calc(100%-80px)] flex">
          <p className="text-white text-left font-nunito text-[22px] leading-[30px] md:mt-[21px] font-[800] ml-[12px]">
            {title}
          </p>
          <div className="hidden md:block m-auto">
            <img src={Logo} alt="logo" className="mt-[9px] mb-[26px]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
