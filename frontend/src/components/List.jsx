
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProject, UpdateProject } from '../redux/project/project.action';
import Paginations from './Pagination';

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
    }, 2000);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [searchTerm, page, field, dispatch]);

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
    <div className="w-full lg:w-full mx-auto rounded-lg mb-12">
      <div className="p-5 flex flex-col bg-white shadow-lg rounded-lg">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 w-48 border-none border-b border-gray-500"
          />
          <div className="text-red-500 font-bold">
            {isLoading ? "....Loading" : ""}
          </div>
          <div className="flex">
            <span className="text-gray-500 mt-1">Sort By :</span>
            <select
              value={field}
              onChange={(e) => {
                setField(e.target.value);
                setPage(1); // Reset page when sorting changes
              }}
              className="border-none"
            >
              {sortlist.map((el, index) => (
                <option key={index} value={el}>{el}</option>
              ))}
            </select>
          </div>
        </div>
        {screensize >= 1024 ? (
          <table className="table-auto w-full overflow-x-auto">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-2 text-center">Project Name</th>
                <th className="p-2 text-center">Reason</th>
                <th className="p-2 text-center">Type</th>
                <th className="p-2 text-center">Division</th>
                <th className="p-2 text-center">Category</th>
                <th className="p-2 text-center">Priority</th>
                <th className="p-2 text-center">Dept</th>
                <th className="p-2 text-center">Location</th>
                <th className="p-2 text-center">Status</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 && data.map((item) => (
                <tr key={item._id} className="text-sm">
                  <td className="p-2 text-center">
                    <div className="flex flex-col">
                      <span>{item.ProjectName}</span>
                      <span className="text-xs">{item.StartDate} to {item.EndDate}</span>
                    </div>
                  </td>
                  <td className="p-2 text-center">{item.Reason}</td>
                  <td className="p-2 text-center">{item.Type}</td>
                  <td className="p-2 text-center">{item.Divison}</td>
                  <td className="p-2 text-center">{item.Category}</td>
                  <td className="p-2 text-center">{item.Priority}</td>
                  <td className="p-2 text-center">{item.Department}</td>
                  <td className="p-2 text-center">{item.Location}</td>
                  <td className="p-2 text-center">{item.Status}</td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleStart(item._id)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-full"
                    >
                      Start
                    </button>
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleClose(item._id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-full"
                    >
                      Close
                    </button>
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleCancel(item._id)}
                      className="px-3 py-1 text-sm bg-yellow-500 text-white rounded-full"
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
              <div key={item._id} className="p-4 bg-gray-100 rounded-lg">
                <div className="flex justify-between mb-2">
                  <div>
                    <span className="font-semibold">{item.ProjectName}</span>
                    <span className="text-xs"> ({item.StartDate} to {item.EndDate})</span>
                  </div>
                  <div>
                    <span className="text-sm font-bold">{item.Priority}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs">Reason: {item.Reason}</div>
                  <div className="text-xs">Type: {item.Type}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs">Division: {item.Divison}</div>
                  <div className="text-xs">Category: {item.Category}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs">Department: {item.Department}</div>
                  <div className="text-xs">Location: {item.Location}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs">Status: {item.Status}</div>
                  <div>
                    <button
                      onClick={() => handleStart(item._id)}
                      className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full"
                    >
                      Start
                    </button>
                    <button
                      onClick={() => handleClose(item._id)}
                      className="px-2 py-1 ml-2 text-xs bg-red-500 text-white rounded-full"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => handleCancel(item._id)}
                      className="px-2 py-1 ml-2 text-xs bg-yellow-500 text-white rounded-full"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <Paginations
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          page={page}
          pageCount={totalPage}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default List;
