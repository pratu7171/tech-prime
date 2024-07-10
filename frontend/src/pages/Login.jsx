import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/auth/auth.action';
import loginbg from '../assets/login-bg.svg';
import Logo from '../assets/Logo.svg';
import hidePassword from '../assets/hide-password.svg';
import seePassword from '../assets/show-password.svg';

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
    <div className="absolute bg-no-repeat  md:w-[1366px] md:h-full h-[350px] md:rounded-none " style={{ backgroundImage: `url(${loginbg})`,borderBottomLeftRadius: '87px' }}>
      <div className="flex flex-col justify-center items-center md:mt-[70px] md:mb-[0] mt-[120px] mb-[85px]">
        <div>
          <img src={Logo} alt="logo" />
        </div>
        <p className="text-[#ffffff] text-[16px] leading-[22px] text-left font-nunito m-[26px] font-[300]">Online Project Management</p>
      </div>
      <div className="w-[410px] h-[400px] bg-white p-[36px] mx-auto rounded-[10px] mb-24" style={{ boxShadow: '0 7px 18px 0 rgba(2, 118, 179, 0.13)' }}>
        <p className="text-[20px] text-left md:text-center font-nunito leading-[27px] pt-[14px] pb-[]">Login to get started</p>
        <form onSubmit={handleLogin}>
          <div className={`mt-[35px] mb-[25px] ${emailError ? 'text-[#FF3838]' : ''}`}>
            <p className='font-nunito text-[14px] leading-[19px] font-[300]'>Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-[337px] h-[48px] border ${emailError ? 'border-[#FF3838]' : 'border-[#979797]'} p-2 rounded-[6px]`}
            />
            {emailError && (
              <p className="mt-1 text-[#FF3838] text-left font-nunito text-[14px] leading-[19px] font-[300]">Email is required</p>
            )}
          </div>
          <div className={`mb-[25px] ${passwordError ? 'text-[#FF3838]' : ''}`}>
            <p className='font-nunito text-[14px] leading-[19px] font-[300]'>Password</p>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-[337px] h-[48px] border ${passwordError ? 'border-[#FF3838]' : 'border-[#979797]'} p-2 rounded-[6px]`}
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <img src={seePassword} alt='Show' className='opacity-50'/> : <img src={hidePassword} alt='Hide'/>}
              </button>
            </div>
            <div className={`flex ${passwordError ? 'justify-between' : 'justify-end'}`}>
                 {passwordError && (
              <p className="mt-1 text-[#FF3838] text-left font-nunito text-[14px] leading-[19px] font-[300]">Password is required</p>
                 )}
              <span className='font-nunito leading-[14px] text-[12px] text-[#025AAB] mt-2'>Forgot password?</span>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[169px] text-center h-[36px] bg-[#035FB2] text-white rounded-[18px] mt-[5px] font-nunito leading-[22px] text-[16px] font-[300]"
            >
              Login
            </button>
          </div>
          
        </form>
        <div className={`flex justify-center mt-[50px] ${emailError || passwordError ? 'mt-[5px]' : ''}`}>
            {message && !isAuth && (
              <p className="mt-2 text-[#FF3838] text-left font-nunito text-[14px] leading-[19px] font-[300]">{message}</p>
            )}
          </div>
      </div>
    </div>
  );
};

export default Login;
