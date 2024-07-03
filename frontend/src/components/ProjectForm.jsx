import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectCreateData } from "../redux/project/project.action";

const ProjectForm = () => {
    const dispatch = useDispatch();
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

    let message = useSelector((store) => store.projectReducer.message)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInputStartDateChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            StartDate: e.target.value,
        }));
    };

    const handleInputEndDateChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            EndDate: e.target.value,
        }));
    };

    const handleSubmit = () => {
        console.log(formData)
        if (formData.ProjectName !== "" && formData.StartDate !== "" && formData.EndDate !== "") {
            dispatch(ProjectCreateData(formData))
                .then((res) => {
                    alert(res.message);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            alert("Please fill the required fields first!")
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto mb-12 rounded-lg p-6 shadow-lg">
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-3/4 mb-5">
                    <div className="mb-4">
                        <input
                            className="w-full lg:w-3/4 h-16 p-5 border border-gray-300 rounded-lg"
                            placeholder="Enter Project Name"
                            name="ProjectName"
                            type="text"
                            onChange={handleInputChange}
                        />
                        {formData.ProjectName === "" && (
                            <p className="mt-2 text-red-500">Project Name is required!</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="block mb-1 text-gray-600">Reason</label>
                            <select
                                className="w-full h-12 border border-gray-300 rounded-lg"
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
                            <label className="block mb-1 text-gray-600">Type</label>
                            <select
                                className="w-full h-12 border border-gray-300 rounded-lg"
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
                            <label className="block mb-1 text-gray-600">Divison</label>
                            <select
                                className="w-full h-12 border border-gray-300 rounded-lg"
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
                            <label className="block mb-1 text-gray-600">Category</label>
                            <select
                                className="w-full h-12 border border-gray-300 rounded-lg"
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
                            <label className="block mb-1 text-gray-600">Priority</label>
                            <select
                                className="w-full h-12 border border-gray-300 rounded-lg"
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
                            <label className="block mb-1 text-gray-600">Department</label>
                            <select
                                className="w-full h-12 border border-gray-300 rounded-lg"
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
                            <label className="block mb-1 text-gray-600">Start Date as per Project Plan</label>
                            <input
                                className="w-full h-12 border border-gray-300 rounded-lg"
                                type="date"
                                onChange={handleInputStartDateChange}
                            />
                            {formData.StartDate === "" && (
                                <p className="mt-2 text-red-500">Start Date is required!</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 text-gray-600">End Date as per Project Plan</label>
                            <input
                                className="w-full h-12 border border-gray-300 rounded-lg"
                                type="date"
                                onChange={handleInputEndDateChange}
                            />
                            {formData.EndDate === "" && (
                                <p className="mt-2 text-red-500">End Date is required!</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 text-gray-600">Location</label>
                            <select
                                className="w-full h-12 border border-gray-300 rounded-lg"
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

                    <div className="flex justify-start lg:justify-end mt-5">
                        <p className="text-gray-600">Status: </p>
                        <p className="font-semibold">Registered</p>
                    </div>
                </div>

                <div>
                    <button
                        onClick={handleSubmit}
                        className="w-44 h-12 rounded-full bg-blue-500 text-white"
                    >
                        Save Project
                    </button>
                </div>
            </div>
            {message && (
                <p className="mt-2 text-red-500">
                    {message}
                </p>
            )}
        </div>
    );
};

export default ProjectForm;
