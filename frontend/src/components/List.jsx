import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProject, UpdateProject } from '../redux/project/project.action';
import Paginations from './Pagination';
import Sort from "../assets/sorting.svg";
import moment from 'moment';

const sortlist = [
  "Priority", "ProjectName", "Reason", "Type", "Divison", "Category",
  "Department", "StartDate", "EndDate", "Location", "Status"
];

const List = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [field, setField] = useState('Priority');
  const [screensize, setScreensize] = useState(window.innerWidth);
  const timerRef = useRef(null);

  const dispatch = useDispatch();
  const currentdata = useSelector((store) => store.projectReducer.data);
  const totalPage = useSelector((store) => store.projectReducer.totalPage);
  const isLoading = useSelector((store) => store.projectReducer.loading);

  console.log("Current Data from Redux Store:", currentdata);

  useEffect(() => {
    dispatch(GetProject(searchTerm, page, field));
  }, [dispatch, searchTerm, page, field]);

  useEffect(() => {
    if (currentdata && currentdata.length > 0) {
      setData(currentdata);
    } else {
      setData([]);
    }
  }, [currentdata]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setPage(1);
      dispatch(GetProject(searchTerm, page, field));
    }, 20000);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [searchTerm, page, field, dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset page when search term changes
  };

  const handleClose = (id) => {
    let url = `/statusclose/${id}`;
    dispatch(UpdateProject(url)).then((res) => {
      if (res) {
        dispatch(GetProject(searchTerm, page, field));
      }
    });
  };

  const handleStart = (id) => {
    let url = `/statusrun/${id}`;
    dispatch(UpdateProject(url)).then((res) => {
      if (res) {
        dispatch(GetProject(searchTerm, page, field));
      }
    });
  };

  const handleCancel = (id) => {
    let url = `/statuscancel/${id}`;
    dispatch(UpdateProject(url)).then((res) => {
      if (res) {
        dispatch(GetProject(searchTerm, page, field));
      }
    });
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setScreensize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full md:w-[1276px] md:h-[555px] mx-auto rounded-[10px] md:pt-0 pt-[50px] mr-[16px]">
      <div className="pt-[20px] md:pt-[10px] flex flex-col md:bg-white bg-[#F3F5F7] rounded-[10px]" style={{ boxShadow: window.innerWidth >= 1024 ? '0 7px 18px 0 rgba(2, 118, 179, 0.13)' : 'none' }}>
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="mb-[16px] w-[280px] md:w-[252px] h-[30px] ml-[16px] md:ml-[20px] border-b-[1px] md:bg-white bg-[#f3f5f7] border-[#979797] font-nunito text-[18px] leading-[24px] text-[#414950]"
          />
          <div className="text-red-500 font-bold">
            {isLoading ? "....Loading" : ""}
          </div>
          <div className="flex">
            <div className="font-nunito text-[16px] leading-[22px] text-[#96A1A9] mt-1">
            {screensize>=1024 ?(
              <span>Sort By :</span>
            ):(
              <img src={Sort} alt='Sort'></img>
            ) }
            </div>
            <select
              value={field}
              onChange={(e) => {
                setField(e.target.value);
                setPage(1); // Reset page when sorting changes
              }}
              className="border-none font-nunito text-[16px] leading-[22px] md:bg-white bg-[#f3f5f7] text-[#3f3f3f] mb-[15px]"
            >
              {sortlist.map((el, index) => (
                <option key={index} value={el}>{el}</option>
              ))}
            </select>
          </div>
        </div>
        {screensize >= 1024 ? (
          <table className="table-auto w-full overflow-x-auto">
            <thead className="bg-[#EBF5FF] w-[1276px] h-[40px] text-left text-[14px] leading-[19px] text-[#3f3f3f] font-nunito font-[500]">
              <tr>
                <th className="pl-[20px] text-left">Project Name</th>
                <th className="pl-[20px] text-left">Reason</th>
                <th className="pl-[20px] text-left">Type</th>
                <th className="pl-[20px] text-left">Division</th>
                <th className="pl-[20px] text-left">Category</th>
                <th className="pl-[20px] text-left">Priority</th>
                <th className="pl-[20px] text-left">Dept</th>
                <th className="pl-[20px] text-left">Location</th>
                <th className="pl-[20px] text-left">Status</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 && data.map((item) => (
                <tr key={item._id} className='border-b border-[#E0E0E0]'>
                  <td className="p-2 text-center">
                    <div className="flex flex-col">
                      <span className='text-left pl-[14px] text-[16px] leading-[22px] text-[#414950] font-nunito font-[800] tracking-wider'>{item.ProjectName}</span>
                      {/* <span className="text-left pl-[14px] text-[14px] leading-[19px] text-[#6B6B6B] font-nunito">{item.StartDate} to {item.EndDate}</span> */}
                      <span className="text-left pl-[14px] text-[14px] leading-[19px] text-[#6B6B6B] font-nunito">
                      {moment(item.StartDate).format('MMM-DD, YYYY')} to {moment(item.EndDate).format('MMM-DD, YYYY')}
                      </span>
                    </div>
                  </td>
                  <td className="pl-[20px] text-left text-[14px] leading-[19px] font-nunito text-[#3f3f3f]">{item.Reason}</td>
                  <td className="pl-[20px] text-left text-[14px] leading-[19px] font-nunito text-[#3f3f3f]">{item.Type}</td>
                  <td className="pl-[20px] text-left text-[14px] leading-[19px] font-nunito text-[#3f3f3f]">{item.Divison}</td>
                  <td className="pl-[20px] text-left text-[14px] leading-[19px] font-nunito text-[#3f3f3f]">{item.Category}</td>
                  <td className="pl-[20px] text-left text-[14px] leading-[19px] font-nunito text-[#3f3f3f]">{item.Priority}</td>
                  <td className="pl-[20px] text-left text-[14px] leading-[19px] font-nunito text-[#3f3f3f]">{item.Department}</td>
                  <td className="pl-[20px] text-left text-[14px] leading-[19px] font-nunito text-[#3f3f3f]">{item.Location}</td>
                  <td className="pl-[20px] text-left text-[14px] leading-[19px] font-nunito text-[#3f3f3f] font-[800]">{item.Status}</td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleStart(item._id)}
                      className="px-[17px] py-[3px] text-[14px] leading-[19px] bg-[#025ABB] text-white rounded-[18px] font-nunito"
                    >
                      Start
                    </button>
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleClose(item._id)}
                      className="px-[15px] py-[3px] text-[14px] leading-[19px] text-[#025AAB] border border-[#025AAB] rounded-[18px] font-nunito"
                    >
                      Close
                    </button>
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleCancel(item._id)}
                      className="px-[11px] py-[3px] text-[14px] leading-[19px] text-[#025AAB] border border-[#025AAB] rounded-[18px] font-nunito"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {data.length > 0 && data.map((item) => (
              <div key={item._id} className="pt-[20px] pl-[17px] pr-[15px] pb-[16px] bg-white rounded-[10px] w-[328px] h-[257px] ml-3">
                <div className="flex justify-between mb-[16px]">
                  <div className='flex flex-col'>
                    <span className="leading-[22px] text-[16px] font-nunito text-[#414950] tracking-wider font-[800]">{item.ProjectName}</span>
                    <span className="text-[14px] leading-[19px] text-[#6B6B6B] font-nunito"> ({moment(item.StartDate).format('MMM-DD, YYYY')} to {moment(item.EndDate).format('MMM-DD, YYYY')})</span>
                  </div>
                  <div>
                    <span className="text-[14px] leading-[19px] text-[#00284C] font-nunito font-[600]">{item.Status}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-[14px] leading-[19px] text-[#898989] font-nunito">Reason: 
                  <span className="text-[14px] leading-[19px] text-[#3F3F3F] font-nunito ml-[2px]">{item.Reason}</span>
                  </div>
                </div>
                <div className="mt-[5px] flex">
                <div className="text-[14px] leading-[19px] text-[#898989] font-nunito">Type:
                  <span className="text-[14px] leading-[19px] text-[#3F3F3F] font-nunito ml-[2px]">{item.Type}</span>
                  </div>
                  <div className='w-[5px] h-[5px] rounded-full bg-[#96A1A9] mt-[7px] ml-[6px]'></div>
                  <div className="text-[14px] leading-[19px] text-[#898989] font-nunito ml-[6px]">Category:
                  <span className="text-[14px] leading-[19px] text-[#3F3F3F] font-nunito ml-[2px]">{item.Category}</span>
                  </div>
                </div>
                <div className="flex mt-[5px]">
                  <div className="text-[14px] leading-[19px] text-[#898989] font-nunito">Div:
                  <span className="text-[14px] leading-[19px] text-[#3F3F3F] font-nunito ml-[2px]">{item.Divison}</span>
                  </div>
                  <div className='w-[5px] h-[5px] rounded-full bg-[#96A1A9] mt-[7px] ml-[6px]'></div>
                  <div className="text-[14px] leading-[19px] text-[#898989] font-nunito ml-[6px]">Dept:
                  <span className="text-[14px] leading-[19px] text-[#3F3F3F] font-nunito ml-[2px]">{item.Department}</span>
                  </div>
                </div>
                <div className="mt-[5px]">
                  <div className="text-[14px] leading-[19px] text-[#898989] font-nunito">Location:
                  <span className="text-[14px] leading-[19px] text-[#3F3F3F] font-nunito ml-[2px]">{item.Location}</span>
                  </div>
                  </div>
                  <div className="mt-[5px]">
                  <div className="text-[14px] leading-[19px] text-[#898989] font-nunito">Priority:
                  <span className="text-[14px] leading-[19px] text-[#3F3F3F] font-nunito ml-[2px]">{item.Priority}</span>
                  </div>
                  </div>
                  <div className='mt-[10px]'>
                  <div className='gap-[16px]'>
                  <button
                      onClick={() => handleStart(item._id)}
                      className="px-[17px] w-[88px] h-[36px] py-[3px] text-[14px] leading-[19px] bg-[#025ABB] text-white rounded-[18px] font-nunito"
                    >
                      Start
                    </button>
                    
                    <button
                      onClick={() => handleClose(item._id)}
                      className="px-[15px] py-[3px] w-[88px] h-[36px] text-[14px] leading-[19px] text-[#025AAB] border border-[#025AAB] rounded-[18px] font-nunito ml-[16px]"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => handleCancel(item._id)}
                      className="px-[11px] py-[3px] w-[88px] h-[36px] text-[14px] leading-[19px] text-[#025AAB] border border-[#025AAB] rounded-[18px] font-nunito ml-[16px]"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Paginations
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        page={page}
        pageCount={totalPage}
        setPage={setPage}
      />
    </div>
  );
};

export default List;
