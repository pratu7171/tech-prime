import React from 'react';
import loginbg from '../assets/Header-bg.svg';
import Logo from '../assets/Logo.svg';
import List from '../components/List';

const ProjectList = () => {
  return (
    <div className="absolute bg-no-repeat w-full md:w-[calc(100%-80px)]" style={{ backgroundImage: `url(${loginbg})` }}>
      <div className="flex flex-col min-h-screen p-20">
        <div className="flex">
          <p className="text-white text-left text-2xl font-bold">
            {'Create Project'}
          </p>
          <div className="ml-auto">
            <img src={Logo} alt="logo" className="mt-[-15px] mb-[15px]" />
          </div>
        </div>
        <List />
      </div>
    </div>
  );
};

export default ProjectList;
