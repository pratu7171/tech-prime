import React from 'react';
import {Routes,Route} from "react-router-dom";
import Dashboard from './Dashboard';
import Login from './Login';
import ProjectList from './ProjectList';
import AddProject from './AddProject';
import PrivateRoute from './PrivateRoute';

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<PrivateRoute><Dashboard/></PrivateRoute>} />
        <Route path='/list' element={<ProjectList/>} />
        <Route path='/add-project' element={<AddProject/>} />
        <Route path='/login' element={<Login/>} />
    </Routes>
  )
}

export default AllRoutes;