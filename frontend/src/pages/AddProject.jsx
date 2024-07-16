import React from "react";
import ProjectForm from "../components/ProjectForm";
import Card from "../components/Card";

const AddProject = () => {
  return (
    <div className="bg-[#f3f5f7] md:h-screen md:w-screen">
      <Card title={"< Create Project"} />
      <div className="md:relative md:z-20 md:ml-[74px] mt-[120px] mr-[20px]">
        <ProjectForm />
      </div>
    </div>
  );
};

export default AddProject;
