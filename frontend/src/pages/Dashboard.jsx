import React, { useEffect, useState } from 'react';
import loginbg from '../assets/Header-bg.svg';
import Logo from '../assets/Logo.svg';
import { useDispatch } from 'react-redux';
import { GetProjectInfo } from '../redux/project/project.action';
import Chart from '../components/Chart';

const Dashboard = () => {
  let [info, setInfo] = useState({});

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetProjectInfo())
    .then((res) => setInfo(res))
    .catch((e) => console.log(e));
  }, [dispatch]);

  return (
    <div
      className="absolute bg-no-repeat bg-cover w-full md:w-[calc(100%-80px)] flex flex-col min-h-screen p-5"
      style={{ backgroundImage: `url(${loginbg})` }}
    >
      <div className="w-full md:w-[calc(100%-80px)] flex">
        <p className="text-white text-left text-lg font-bold">Dashboard</p>
        <div className="m-auto">
          <img src={Logo} alt="logo" className="-mt-4 mb-4" />
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 overflow-auto scrollbar-hide">
          <div className="border-l-4 border-aqua bg-white p-4 rounded shadow-md">
            <p className="text-sm text-gray-500">Total Projects</p>
            <p className="font-bold text-xl">{info.total}</p>
          </div>
          <div className="border-l-4 border-aqua bg-white p-4 rounded shadow-md">
            <p className="text-sm text-gray-500">Closed</p>
            <p className="font-bold text-xl">{info.closed}</p>
          </div>
          <div className="border-l-4 border-aqua bg-white p-4 rounded shadow-md">
            <p className="text-sm text-gray-500">Running</p>
            <p className="font-bold text-xl">{info.running}</p>
          </div>
          <div className="border-l-4 border-aqua bg-white p-4 rounded shadow-md">
            <p className="text-sm text-gray-500">Closure Delay</p>
            <p className="font-bold text-xl">{info.delayedRunning}</p>
          </div>
          <div className="border-l-4 border-aqua bg-white p-4 rounded shadow-md">
            <p className="text-sm text-gray-500">Canceled</p>
            <p className="font-bold text-xl">{info.cancel}</p>
          </div>
        </div>
        <div className="m-5">
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
