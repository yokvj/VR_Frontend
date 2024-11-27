


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addRole } from "../assets/objects.js"; // Import the addRole function from object.js

let roles = []; // This will act as your data source for roles

const RoleManagement = () => {
  const location = useLocation();
  const user = location.state?.user || {};
  const [newRole, setNewRole] = useState({ name: "", permissions: [], employeeId: user.id || "" });
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [secKey, setSecKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const { name, id } = user;
  const roleOptions = [
    "Software Engineer", "QA Engineer", "DevOps Engineer", "System Administrator", "Frontend Developer", "Backend Developer", 
    "Full Stack Developer", "Database Administrator", "Project Manager", "Product Owner", "UI/UX Designer", "Technical Writer"
  ];

  const handleSecKeySubmit = () => {
    const storedSecKey = import.meta.env.VITE_SEC_KEY;
    if (secKey === storedSecKey) {
      setAuthenticated(true);
      toast.success("Authenticated successfully!");
    } else {
      toast.error("Incorrect SEC Key. Please try again.");
    }
  };

  const handleCancel = () => {
    // Clear the SEC Key input and navigate back to the previous page
    setSecKey("");
    navigate("/listUser"); // You can navigate to a different route if necessary
  };

  useEffect(() => {
    if (authenticated && !user.id) {
      toast.error("No employee found! Redirecting to the User List.");
      setTimeout(() => {
        navigate("/listUser");
      }, 3000);
    }
  }, [authenticated, user.id, navigate]);

  if (!authenticated) {
    return (
      <div className="flex justify-center items-start min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-96 sm:h-52 md:h-52 lg:h-auto mt-16">
          <h2 className="text-lg font-semibold mb-4">Enter Passcode</h2>
          <input
            type="password"
            placeholder="Enter SEC Key"
            value={secKey}
            onChange={(e) => setSecKey(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSecKeySubmit}
              className="px-4 py-2 bg-black text-white rounded-md"
            >
              Submit
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-black rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddRole = () => {
    if (!newRole.name || !newRole.employeeId) {
      toast.error("Role name and Employee ID cannot be empty.");
      return;
    }

    const newRoleData = { ...newRole, permissions: selectedPermissions };
    try {
      addRole(newRoleData); // Add the role using the imported function
      toast.success("Role added successfully!");
      navigate("/roles"); // Navigate to Roles Page
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePermissionChange = (permission) => {
    setSelectedPermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((p) => p !== permission)
        : [...prevPermissions, permission]
    );
  };

  return (
    <div className="w-full px-4 py-6">
      <h2 className="mb-4 text-xl font-semibold text-center">Role Management</h2>

      <div className="mb-6 p-4 border rounded-lg shadow-md bg-white">
        <h3 className="text-lg font-semibold mb-4">
          Assign Role for {name} (ID: {id})
        </h3>

        <div className="mb-4">
          <label className="block font-medium mb-2">Role Name:</label>
          <select
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Role</option>
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Employee ID:</label>
          <input
            type="text"
            value={newRole.employeeId}
            onChange={(e) => setNewRole({ ...newRole, employeeId: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Permissions:</label>
          <div className="flex flex-wrap">
            {["View Code", "Commit Code", "Push Code", "Merge Code", "Deploy"].map((permission) => (
              <label key={permission} className="mr-4">
                <input
                  type="checkbox"
                  checked={selectedPermissions.includes(permission)}
                  onChange={() => handlePermissionChange(permission)}
                  className="mr-2"
                />
                {permission}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleAddRole}
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            Assign Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;
