import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/auth/auth.action';
import loginbg from '../assets/login-bg.svg';
import Logo from '../assets/Logo.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isAuth = useSelector((store) => store.authReducer.isAuth);
  const message = useSelector((store) => store.authReducer.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    if (isValidEmail(email) && isValidPassword(password)) {
      dispatch(login({ email, password }));
    } else {
      setEmailError(!isValidEmail(email));
      setPasswordError(!isValidPassword(password));
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 5;
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <div className="absolute bg-no-repeat w-full md:w-[calc(100%-80px)]" style={{ backgroundImage: `url(${loginbg})` }}>
      <div className="flex flex-col justify-center items-center mt-5 p-5">
        <div>
          <img src={Logo} alt="logo" />
        </div>
        <p className="text-white text-xl">Online Project Management</p>
      </div>
      <div className="w-80 bg-white p-10 pb-15 mx-auto border border-gray-300 rounded-lg shadow-lg mb-24">
        <p className="text-xl text-center p-5">Login To Get Started</p>
        <div className={`mb-4 ${emailError ? 'text-red-500' : ''}`}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full border ${emailError ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
          />
          {emailError && (
            <p className="mt-2 text-red-500 text-left">Email is required</p>
          )}
        </div>
        <div className={`mb-4 ${passwordError ? 'text-red-500' : ''}`}>
          <label>Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full border ${passwordError ? 'border-red-500' : 'border-gray-300'} p-2 rounded`}
            />
            <button
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {/* {showPassword ? <ViewOffIcon /> : <ViewIcon />} */} 
              {/* here need to install the icon */}
              {showPassword ? <p>View</p> : <p>Hide</p>}

            </button>
          </div>
          {passwordError && (
            <p className="mt-2 text-red-500 text-left">Password is required</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            className="m-4 w-48 bg-teal-600 text-white p-2 rounded-full"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <div className="flex justify-center">
          {message && (
            <p className="mt-2 text-red-500 text-left">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
