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
          <div className="md:w-[58px]">
            <Navbar />
          </div>
        )}
        <div className={`flex flex-col w-full ${isAuth ? 'md:w-[1366px] md:ml-0' : ''}`}>
          <AllRoutes />
        </div>
      </div>
    </div>
  );
}

export default App;
