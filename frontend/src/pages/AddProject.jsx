import React from 'react';
import ProjectForm from '../components/ProjectForm';
import loginbg from '../assets/Header-bg.svg';
import Logo from '../assets/Logo.svg';

const AddProject = () => {
  return (
    <div
      className="absolute bg-no-repeat bg-cover w-full md:w-[calc(100%-80px)] flex flex-col min-h-screen p-5 md:p-10"
      style={{ backgroundImage: `url(${loginbg})` }}
    >
      <div className="w-full md:w-[calc(100%-80px)] flex">
        <p className="text-white text-left text-lg font-bold">
          {'Create Project'}
        </p>
        <div className="m-auto">
          <img src={Logo} alt="logo" className="-mt-4 mb-4" />
        </div>
      </div>
      <ProjectForm />
    </div>
  );
};

export default AddProject;
