import React from 'react';
import Navbar from './components/Navbar';
import AllRoutes from './pages/Allroutes';
import { useSelector } from 'react-redux';

function App() {
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  return (
    <div className="App">
      <div className="flex flex-col md:flex-row">
        {isAuth && (
          <div className="md:w-20">
            <Navbar />
          </div>
        )}
        <div className={`flex flex-col w-full ${isAuth ? 'md:w-[calc(100%-80px)] md:ml-20' : ''}`}>
          <AllRoutes />
        </div>
      </div>
    </div>
  );
}

export default App;
