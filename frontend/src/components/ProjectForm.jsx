import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProjectCreateData } from "../redux/project/project.action";
import { useNavigate } from "react-router-dom";

const ProjectForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    StartDate: "",
    EndDate: "",
    Reason: "For Business",
    Type: "Internal",
    Divison: "Filters",
    Category: "Quality A",
    Priority: "High",
    Department: "Strategy",
    Location: "Pune",
    ProjectName: "",
  });

  const [errors, setErrors] = useState({
    ProjectName: false,
    StartDate: false,
    EndDate: false,
  });

  let message = useSelector((store) => store.projectReducer.message);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleInputStartDateChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      StartDate: e.target.value,
    }));
    setErrors((prev) => ({ ...prev, StartDate: false }));
  };

  const handleInputEndDateChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      EndDate: e.target.value,
    }));
    setErrors((prev) => ({ ...prev, EndDate: false }));
  };

  const handleSubmit = () => {
    const newErrors = {
      ProjectName: formData.ProjectName === "",
      StartDate: formData.StartDate === "",
      EndDate: formData.EndDate === "" || formData.EndDate < formData.StartDate,
    };
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      dispatch(ProjectCreateData(formData))
        .then((res) => {
          console.log(res.message);
          navigate("/list");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Please fill the required fields correctly!");
    }
  };

  return (
    <div
      className="w-full max-w-[1268px] mx-auto md:ml-0 ml-[10px] mb-12 mt-[-50px] md:mt-0 rounded-[10px] p-[18px] pt-[22px] shadow-lg bg-[#ffffff]"
      style={{ boxShadow: "0 7px 18px 0 rgba(2,118,179,0.13)" }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-3/4 mb-5">
          <div className="mb-[44px]">
            <input
              className={`box-border w-full md:w-[714px] md:h-[70px] h-16 p-5 font-nunito border-[1px] ${
                errors.ProjectName ? "border-red-500" : "border-[#979797]"
              } rounded-[6px] `}
              placeholder="Enter Project Name"
              name="ProjectName"
              type="text"
              onChange={handleInputChange}
            />
            {errors.ProjectName && (
              <p className="mt-2 text-red-500">Project Name is required!</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 text-[#767676] text-[14px] leading-[19px] font-nunito">
                Reason
              </label>
              <select
                className="w-full h-[48px] box-border border border-[#979797] rounded-[6px] text-[#3f3f3f] text-[16px] leading-[22px] font-[400] pl-[16px]"
                onChange={handleInputChange}
                name="Reason"
                value={formData.Reason}
              >
                <option value="For Business">For Business</option>
                <option value="Dealership">Dealership</option>
                <option value="Transport">Transport</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-[#767676] text-[14px] leading-[19px] font-nunito">
                Type
              </label>
              <select
                className="w-full h-[48px] box-border border border-[#979797] rounded-[6px] text-[#3f3f3f] text-[16px] leading-[22px] font-[400] pl-[16px]"
                onChange={handleInputChange}
                name="Type"
                value={formData.Type}
              >
                <option value="Internal">Internal</option>
                <option value="External">External</option>
                <option value="Vendor">Vendor</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-[#767676] text-[14px] leading-[19px] font-nunito">
                Divison
              </label>
              <select
                className="w-full h-[48px] box-border border border-[#979797] rounded-[6px] text-[#3f3f3f] text-[16px] leading-[22px] font-[400] pl-[16px]"
                onChange={handleInputChange}
                name="Divison"
                value={formData.Divison}
              >
                <option value="Filters">Filters</option>
                <option value="Compressor">Compressor</option>
                <option value="Pumps">Pumps</option>
                <option value="Glass">Glass</option>
                <option value="Water Heater">Water Heater</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-[#767676] text-[14px] leading-[19px] font-nunito">
                Category
              </label>
              <select
                className="w-full h-[48px] box-border border border-[#979797] rounded-[6px] text-[#3f3f3f] text-[16px] leading-[22px] font-[400] pl-[16px]"
                onChange={handleInputChange}
                name="Category"
                value={formData.Category}
              >
                <option value="Quality A">Quality A</option>
                <option value="Quality B">Quality B</option>
                <option value="Quality C">Quality C</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-[#767676] text-[14px] leading-[19px] font-nunito">
                Priority
              </label>
              <select
                className="w-full h-[48px] box-border border border-[#979797] rounded-[6px] text-[#3f3f3f] text-[16px] leading-[22px] font-[400] pl-[16px]"
                onChange={handleInputChange}
                name="Priority"
                value={formData.Priority}
              >
                <option value="High">High</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-[#767676] text-[14px] leading-[19px] font-nunito">
                Department
              </label>
              <select
                className="w-full h-[48px] box-border border border-[#979797] rounded-[6px] text-[#3f3f3f] text-[16px] leading-[22px] font-[400] pl-[16px]"
                onChange={handleInputChange}
                name="Department"
                value={formData.Department}
              >
                <option value="Strategy">Strategy</option>
                <option value="Finance">Finance</option>
                <option value="Quality">Quality</option>
                <option value="Stores">Stores</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-[#767676] text-[14px] leading-[19px] font-nunito">
                Start Date as per Project Plan
              </label>
              <input
                className={`w-full h-[48px] box-border border ${
                  errors.StartDate ? "border-red-500" : "border-[#979797]"
                } rounded-[6px] text-[#3f3f3f] text-[16px] leading-[22px] font-[400] pl-[16px]`}
                type="date"
                onChange={handleInputStartDateChange}
              />
              {errors.StartDate && (
                <p className="mt-2 text-red-500">Start Date is required!</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-[#767676] text-[14px] leading-[19px] font-nunito">
                End Date as per Project Plan
              </label>
              <input
                className={`w-full h-[48px] box-border border ${
                  errors.EndDate ||
                  (formData.EndDate && formData.EndDate < formData.StartDate)
                    ? "border-red-500"
                    : "border-[#979797]"
                } rounded-[6px] text-[#3f3f3f] text-[16px] leading-[22px] font-[400] pl-[16px]`}
                type="date"
                onChange={handleInputEndDateChange}
              />
              {(() => {
                if (errors.EndDate) {
                  return (
                    <p className="mt-2 text-red-500">End Date is required!</p>
                  );
                } else if (
                  formData.EndDate &&
                  formData.EndDate < formData.StartDate
                ) {
                  return (
                    <p className="mt-2 text-red-500">
                      End date is smaller than the start date
                    </p>
                  );
                }
                return null;
              })()}
            </div>

            <div>
              <label className="block mb-1 text-[#767676] text-[14px] leading-[19px] font-nunito">
                Location
              </label>
              <select
                className="w-full h-[48px] box-border border border-[#979797] rounded-[6px] text-[#3f3f3f] text-[16px] leading-[22px] font-[400] pl-[16px]"
                onChange={handleInputChange}
                name="Location"
                value={formData.Location}
              >
                <option value="Pune">Pune</option>
                <option value="Delhi">Delhi</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>
          </div>

          <div className="flex justify-start md:justify-end mt-5 mr-[175px] ">
            <p className="text-[#3f3f3f] text-[15px] leading-[22px] font-[300]">
              Status:{" "}
            </p>
            <p className="text-[#3f3f3f] text-[16px] leading-[22px] font-[600]">
              Registered
            </p>
          </div>
        </div>

        <div flex>
          <button
            onClick={handleSubmit}
            className="w-[153px] h-[36px] rounded-[18px] bg-[#025AAB] text-white font-nunito leading-[22px] ml-[150px]"
          >
            Save Project
          </button>
        </div>
      </div>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
};

export default ProjectForm;
