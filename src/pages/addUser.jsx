

// import React, { useState } from "react";
// import { AddUser } from "../assets/objects.js"; // Import the AddUser function
// import { toast } from "react-toastify";

// const addUser = () => {
//   const [formData, setFormData] = useState({
//     id: "",
//     name: "",
//     email: "",
//     contactNumber: "",
//     role: "User",
//     status: "Active",
//   });

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const onSubmitHandler = (e) => {
//     e.preventDefault();

//     if (!formData.id || !formData.name || !formData.email) {
//       toast.error("Please fill all required fields");
//       return;
//     }

//     try {
//       AddUser(formData); // Try to add user
//       toast.success("User added successfully!");

//       // Reset the form
//       setFormData({
//         id: "",
//         name: "",
//         email: "",
//         contactNumber: "",
//         role: "User",
//         status: "Active",
//       });
//     } catch (error) {
//       toast.error(error.message); // Display error message if user already exists
//     }
//   };

//   return (
//     <form onSubmit={onSubmitHandler} className="p-4">
//       <h2 className="text-xl font-semibold mb-4">Add User</h2>
//       <div className="mb-3">
//         <label className="block mb-1">User ID</label>
//         <input
//           name="id"
//           value={formData.id}
//           onChange={handleInputChange}
//           className="w-3/4 border px-3 py-2"
//           placeholder="Enter User ID"
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <label className="block mb-1">Name</label>
//         <input
//           name="name"
//           value={formData.name}
//           onChange={handleInputChange}
//           className="w-3/4 border px-3 py-2"
//           placeholder="Enter Name"
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <label className="block mb-1">Email</label>
//         <input
//           name="email"
//           value={formData.email}
//           onChange={handleInputChange}
//           className="w-3/4 border px-3 py-2"
//           placeholder="Enter Email"
//           required
//         />
//       </div>
//       <div className="mb-3">
//         <label className="block mb-1">Contact Number</label>
//         <input
//           name="contactNumber"
//           value={formData.contactNumber}
//           onChange={handleInputChange}
//           className="w-3/4 border px-3 py-2"
//           placeholder="Enter Contact Number"
//         />
//       </div>
//       <div className="mb-3">
//         <label className="block mb-1">Role</label>
//         <select
//           name="role"
//           value={formData.role}
//           onChange={handleInputChange}
//           className="w-3/4 border px-3 py-2"
//         >
//           <option value="User">User</option>
//           <option value="Admin">Admin</option>
//         </select>
//       </div>
//       <div className="mb-3">
//         <label className="block mb-1">Status</label>
//         <select
//           name="status"
//           value={formData.status}
//           onChange={handleInputChange}
//           className="w-3/4 border px-3 py-2"
//         >
//           <option value="Active">Active</option>
//           <option value="Inactive">Inactive</option>
//         </select>
//       </div>
//       <button
//         type="submit"
//         className="bg-black text-white px-4 py-2 rounded"
//       >
//         Add User
//       </button>
//     </form>
//   );
// };

// export default addUser;

import React, { useState } from "react";
import { AddUser } from "../assets/objects.js"; // Import the AddUser function
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const addUser = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    contactNumber: "",
    role: "User",
    status: "Active",
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!formData.id || !formData.name || !formData.email) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      AddUser(formData); // Try to add user
      toast.success("User added successfully!");

      // Reset the form
      setFormData({
        id: "",
        name: "",
        email: "",
        contactNumber: "",
        role: "User",
        status: "Active",
      });

      // Redirect to the list of users (ListUser.jsx)
      navigate("/listUser"); // Adjust the route path according to your routing setup
    } catch (error) {
      toast.error(error.message); // Display error message if user already exists
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="p-4">
      <h2 className="text-xl font-semibold mb-4">Add User</h2>
      <div className="mb-3">
        <label className="block mb-1">User ID</label>
        <input
          name="id"
          value={formData.id}
          onChange={handleInputChange}
          className="w-3/4 border px-3 py-2"
          placeholder="Enter User ID"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-3/4 border px-3 py-2"
          placeholder="Enter Name"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Email</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-3/4 border px-3 py-2"
          placeholder="Enter Email"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Contact Number</label>
        <input
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleInputChange}
          className="w-3/4 border px-3 py-2"
          placeholder="Enter Contact Number"
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="w-3/4 border px-3 py-2"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="block mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="w-3/4 border px-3 py-2"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded"
      >
        Add User
      </button>
    </form>
  );
};

export default addUser;
