import React from 'react';
import List from '../components/List';
import Card from '../components/Card';


const ProjectList = () => {
  return (
    <div className='bg-[#f3f5f7] md:h-screen md:w-screen'>
    <Card title={'< Project Listing'}/>
      <div className="md:relative md:z-20 md:ml-[74px] md:mt-[120px]  md:p-0 p-[10px] ml-[8px] md:mb-0 mb-[45px]">
      <List />
      </div>
    </div>
  );
};

export default ProjectList;
