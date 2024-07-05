import React, { useEffect, useState } from 'react';
import loginbg from '../assets/Header-bg.svg';
import Logo from '../assets/Logo.svg';
import { useDispatch } from 'react-redux';
import { GetProjectInfo } from '../redux/project/project.action';
import BarChart from '../components/Chart';

const Dashboard = () => {
  let [info, setInfo] = useState({});

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetProjectInfo())
    .then((res) => setInfo(res))
    .catch((e) => console.log(e));
  }, [dispatch]);

  return (
    <div className='bg-[#f3f5f7] h-screen w-screen'>
    <div
      className="absolute bg-no-repeat bg-cover md:w-[1308PX] flex flex-col p-[18px] h-[55px] md:h-[150px] md:ml-[58px] w-full"
      style={{ backgroundImage: `url(${loginbg})` }}
    >
      <div className="w-full md:w-[calc(100%-80px)] flex">
        <p className="text-white text-left font-nunito text-[22px] leading-[30px] md:mt-[21px] font-[600] ml-[12px]">Dashboard</p>
        <div className="hidden md:block m-auto">
          <img src={Logo} alt="logo" className="mt-[9px] mb-[26px]" />
        </div>
      </div>
      <div>
        <div className="flex flex-row md:grid md:grid-cols-5 gap-5 md:mt-[0] mt-[25px] overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`
            ::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="border-l-[5px] border-[#0CC9E8] bg-white p-[9px] rounded md:h-[83px] md:min-w-[238px] h-[85px] min-w-[110px]" style={{ boxShadow: '0 4px 21px 0 rgba(173,182,217,0.27)' }}>
            <p className="md:text-[15px] text-[14px] leading-[19px] font-nunito md:leading-[20px] text-left text-[#474D52] font-[400]">Total Projects</p>
            <p className="text-[40px] font-nunito leading-[54px] text-left text-[#474D52] font-[800]">{info.total}</p>
          </div>
          <div className="border-l-[5px] border-[#0CC9E8] bg-white p-[9px] rounded md:h-[83px] md:min-w-[238px] h-[85px] min-w-[110px]">
            <p className="md:text-[15px] text-[14px] leading-[19px] font-nunito md:leading-[20px] text-left text-[#474D52] font-[400]">Closed</p>
            <p className="text-[40px] font-nunito leading-[54px] text-left text-[#474D52] font-[800]">{info.closed}</p>
          </div>
          <div className="border-l-[5px] border-[#0CC9E8] bg-white p-[9px] rounded md:h-[83px] md:min-w-[238px] h-[85px] min-w-[110px]" style={{ boxShadow: '0 4px 21px 0 rgba(173,182,217,0.27)' }}>
            <p className="md:text-[15px] text-[14px] leading-[19px] font-nunito md:leading-[20px] text-left text-[#474D52] font-[400]">Running</p>
            <p className="text-[40px] font-nunito leading-[54px] text-left text-[#474D52] font-[800]">{info.running}</p>
          </div>
          <div className="border-l-[5px] border-[#0CC9E8] bg-white p-[9px] rounded md:h-[83px] md:min-w-[238px] h-[85px] min-w-[113px]" style={{ boxShadow: '0 4px 21px 0 rgba(173,182,217,0.27)' }}>
            <p className="md:text-[15px] text-[14px] leading-[19px] font-nunito md:leading-[20px] text-left text-[#474D52] font-[400]">Closure Delay</p>
            <p className="text-[40px] font-nunito leading-[54px] text-left text-[#474D52] font-[800]">{info.delayedRunning}</p>
          </div>
          <div className="border-l-[5px] border-[#0CC9E8] bg-white p-[9px] rounded md:h-[83px] md:min-w-[238px] h-[85px] min-w-[110px]" style={{ boxShadow: '0 4px 21px 0 rgba(173,182,217,0.27)' }}>
            <p className="md:text-[15px] text-[14px] leading-[19px] font-nunito md:leading-[20px] text-left text-[#474D52] font-[400]">Cancelled</p>
            <p className="text-[40px] font-nunito leading-[54px] text-left text-[#474D52] font-[800]">{info.cancel}</p>
          </div>
        </div>
        <div className="m-5">
          <BarChart />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
