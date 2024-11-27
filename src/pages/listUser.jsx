


// import React, { useState, useEffect } from "react";
// import { getUsers, deleteUser, editUser } from "../assets/objects";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const ListUser = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editableUser, setEditableUser] = useState(null);
//   const [formData, setFormData] = useState({ name: "", email: "", role: "", status: "" });
//   const [secKey, setSecKey] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [searchName, setSearchName] = useState("");
//   const [searchId, setSearchId] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");
//   const [filterRole, setFilterRole] = useState("");
//   const [userToDelete, setUserToDelete] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const fetchedUsers = await getUsers();
//         if (fetchedUsers && fetchedUsers.length > 0) {
//           setUsers(fetchedUsers);
//         } else {
//           toast.info("No users found.");
//         }
//       } catch (error) {
//         setError(error);
//         toast.error("Failed to fetch users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Filtering logic
//   const filteredUsers = users.filter((user) => {
//     const matchesName = user.name.toLowerCase().includes(searchName.toLowerCase());
//     const matchesId = user.id.toString().includes(searchId);
//     const matchesStatus = filterStatus ? user.status === filterStatus : true;
//     const matchesRole = filterRole ? user.role === filterRole : true;
//     return matchesName && matchesId && matchesStatus && matchesRole;
//   });

//   const handleStatusChange = (userId, newStatus) => {
//     setUsers((prevUsers) =>
//       prevUsers.map((user) =>
//         user.id === userId ? { ...user, status: newStatus } : user
//       )
//     );
//     toast.success("User status updated successfully");
//   };

//   const handleEdit = (user) => {
//     setEditableUser(user);
//     setFormData({ ...user });
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSaveEdit = () => {
//     const updatedUser = { ...editableUser, ...formData };
//     const result = editUser(updatedUser);
//     if (result) {
//       setUsers((prevUsers) =>
//         prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
//       );
//       toast.success("User updated successfully");
//       setEditableUser(null);
//     } else {
//       toast.error("Failed to update user.");
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditableUser(null);
//   };

//   const handleDelete = (userId) => {
//     setUserToDelete(userId);
//     setShowModal(true);
//   };

//   const handleSecKeySubmit = () => {
//     const storedSecKey = import.meta.env.VITE_SEC_KEY;
//     if (secKey === storedSecKey) {
//       const result = deleteUser(userToDelete);
//       if (result) {
//         setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete));
//         toast.success("User deleted successfully");
//       } else {
//         toast.error("User not found.");
//       }
//       setShowModal(false);
//     } else {
//       toast.error("Incorrect SEC key.");
//     }
//   };

//   const getStatusClass = (status) => {
//     if (status === "Active") {
//       return "bg-green-500 text-white";
//     } else if (status === "Inactive") {
//       return "bg-red-500 text-white";
//     } else {
//       return "bg-gray-500 text-white";
//     }
//   };

//   const handleAssignRole = (user) => {
//     navigate("/RoleManagement", { state: { user: { name: user.name, id: user.id } } });
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error loading users. Please try again later.</div>;

//   return (
//     <div className="w-full px-4 py-6">
//       <h2 className="mb-4 text-xl font-semibold text-center">User List</h2>
//       <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search by name"
//           value={searchName}
//           onChange={(e) => setSearchName(e.target.value)}
//           className="p-2 border rounded w-full"
//         />
//         <input
//           type="text"
//           placeholder="Search by ID"
//           value={searchId}
//           onChange={(e) => setSearchId(e.target.value)}
//           className="p-2 border rounded w-full"
//         />
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="p-2 border rounded w-full"
//         >
//           <option value="">Filter by Status</option>
//           <option value="Active">Active</option>
//           <option value="Inactive">Inactive</option>
//           <option value="Suspended">Suspended</option>
//         </select>
//         <select
//           value={filterRole}
//           onChange={(e) => setFilterRole(e.target.value)}
//           className="p-2 border rounded w-full"
//         >
//           <option value="">Filter by Role</option>
//           <option value="Admin">Admin</option>
//           <option value="User">User</option>
//           <option value="Manager">Manager</option>
//         </select>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full table-auto border-collapse border border-gray-300">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-4 py-2 border">ID</th>
//               <th className="px-4 py-2 border">Name</th>
//               <th className="px-4 py-2 border">Email</th>
//               <th className="px-4 py-2 border">Contact Number</th>
//               <th className="px-4 py-2 border">Role</th>
//               <th className="px-4 py-2 border">Status</th>
//               <th className="px-4 py-2 border">Action</th>
//               <th className="px-4 py-2 border">Assign Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.length > 0 ? (
//               filteredUsers.map((user) => (
//                 <tr key={user.id} className="hover:bg-gray-100">
//                   <td className="px-4 py-2 border">{user.id}</td>
//                   <td className="px-4 py-2 border">{user.name}</td>
//                   <td className="px-4 py-2 border">{user.email}</td>
//                   <td className="px-4 py-2 border">{user.contactNumber}</td>
//                   <td className="px-4 py-2 border">{user.role}</td>
//                   <td className="px-4 py-2 border">
//                     <select
//                       value={user.status}
//                       onChange={(e) => handleStatusChange(user.id, e.target.value)}
//                       className={`px-2 py-1 border rounded-md ${getStatusClass(user.status)}`}
//                     >
//                       <option value="Active">Active</option>
//                       <option value="Inactive">Inactive</option>
//                       <option value="Suspended">Suspended</option>
//                     </select>
//                   </td>
//                   <td className="px-4 py-2 border flex space-x-2">
//   <button
//     onClick={() => handleEdit(user)}
//     className="px-1 py-0 bg-blue-500 text-white rounded-md"
//   >
//     Edit
//   </button>
//   <button
//     onClick={() => handleDelete(user.id)}
//     className="px-1 py-0 bg-red-500 text-white rounded-md"
//   >
//     Delete
//   </button>
// </td>
//                   <td className="px-4 py-2 border">
//                     <button
//                       onClick={() => handleAssignRole(user)}
//                       className="w-full lg:w-auto px-2 py-1 bg-black text-white rounded-md"
//                     >
//                       Assign Role
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8" className="px-4 py-2 border text-center">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-4 rounded shadow-md w-96">
//             <h2 className="text-lg font-semibold mb-4">Enter SEC Key</h2>
//             <input
//               type="password"
//               value={secKey}
//               onChange={(e) => setSecKey(e.target.value)}
//               placeholder="Enter SEC key"
//               className="w-full p-2 border border-gray-300 rounded-md mb-4"
//             />
//             <div className="flex justify-end">
//               <button
//                 onClick={handleSecKeySubmit}
//                 className="px-4 py-2 bg-black text-white rounded-md mr-2"
//               >
//                 Submit
//               </button>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListUser;




// import React, { useState, useEffect } from "react";
// import { getUsers, deleteUser, editUser } from "../assets/objects"; // Import user management functions
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const ListUser = () => {
//   const [users, setUsers] = useState([]); // State to store the list of users
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [editableUser, setEditableUser] = useState(null); // State to store the user being edited
//   const [formData, setFormData] = useState({ name: "", email: "", role: "", status: "" }); // Form data for editing
//   const [secKey, setSecKey] = useState(""); // Security key for delete action
//   const [showModal, setShowModal] = useState(false); // Modal visibility for delete confirmation
//   const [searchName, setSearchName] = useState(""); // Search filter by name
//   const [searchId, setSearchId] = useState(""); // Search filter by ID
//   const [filterStatus, setFilterStatus] = useState(""); // Filter by status
//   const [filterRole, setFilterRole] = useState(""); // Filter by role
//   const [userToDelete, setUserToDelete] = useState(null); // State to track the user to delete
//   const navigate = useNavigate();

//   // Fetch users when the component mounts
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const fetchedUsers = await getUsers(); // Fetch users from the backend
//         if (fetchedUsers && fetchedUsers.length > 0) {
//           setUsers(fetchedUsers); // Set users to state
//         } else {
//           toast.info("No users found.");
//         }
//       } catch (error) {
//         setError(error); // Set error if fetching fails
//         toast.error("Failed to fetch users");
//       } finally {
//         setLoading(false); // Set loading to false after the fetch completes
//       }
//     };

//     fetchUsers();
//   }, []); // Empty dependency array to run once on mount

//   // Filtering logic
//   const filteredUsers = users.filter((user) => {
//     const matchesName = user.name.toLowerCase().includes(searchName.toLowerCase());
//     const matchesId = user.id.toString().includes(searchId);
//     const matchesStatus = filterStatus ? user.status === filterStatus : true;
//     const matchesRole = filterRole ? user.role === filterRole : true;
//     return matchesName && matchesId && matchesStatus && matchesRole;
//   });

//   // Handle status change for a user
//   const handleStatusChange = (userId, newStatus) => {
//     setUsers((prevUsers) =>
//       prevUsers.map((user) =>
//         user.id === userId ? { ...user, status: newStatus } : user
//       )
//     );
//     toast.success("User status updated successfully");
//   };

//   // Handle user editing
//   const handleEdit = (user) => {
//     setEditableUser(user);
//     setFormData({ ...user }); // Set the form data to the selected user's current values
//   };

//   // Handle form field changes
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle save after editing
//   const handleSaveEdit = () => {
//     const updatedUser = { ...editableUser, ...formData };
//     const result = editUser(updatedUser); // Update the user data
//     if (result) {
//       setUsers((prevUsers) =>
//         prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
//       );
//       toast.success("User updated successfully");
//       setEditableUser(null); // Reset editable user
//     } else {
//       toast.error("Failed to update user.");
//     }
//   };

//   // Handle cancel edit action
//   const handleCancelEdit = () => {
//     setEditableUser(null); // Reset editable user
//   };

//   // Handle user delete action
//   const handleDelete = (userId) => {
//     setUserToDelete(userId); // Store the user to delete
//     setShowModal(true); // Show delete confirmation modal
//   };

//   // Handle security key submission for delete action
//   const handleSecKeySubmit = () => {
//     const storedSecKey = import.meta.env.VITE_SEC_KEY; // Get stored SEC key
//     if (secKey === storedSecKey) {
//       const result = deleteUser(userToDelete); // Delete the user
//       if (result) {
//         setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete));
//         toast.success("User deleted successfully");
//       } else {
//         toast.error("User not found.");
//       }
//       setShowModal(false); // Close the modal
//     } else {
//       toast.error("Incorrect SEC key.");
//     }
//   };

//   // Get status class based on user status
//   const getStatusClass = (status) => {
//     if (status === "Active") {
//       return "bg-green-500 text-white";
//     } else if (status === "Inactive") {
//       return "bg-red-500 text-white";
//     } else {
//       return "bg-gray-500 text-white";
//     }
//   };

//   // Navigate to role management page
//   const handleAssignRole = (user) => {
//     navigate("/RoleManagement", { state: { user: { name: user.name, id: user.id } } });
//   };

//   // Loading and error handling
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error loading users. Please try again later.</div>;

//   return (
//     <div className="w-full px-4 py-6">
//       <h2 className="mb-4 text-xl font-semibold text-center">User List</h2>

//       {/* Filter Controls */}
//       <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search by name"
//           value={searchName}
//           onChange={(e) => setSearchName(e.target.value)}
//           className="p-2 border rounded w-full"
//         />
//         <input
//           type="text"
//           placeholder="Search by ID"
//           value={searchId}
//           onChange={(e) => setSearchId(e.target.value)}
//           className="p-2 border rounded w-full"
//         />
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="p-2 border rounded w-full"
//         >
//           <option value="">Filter by Status</option>
//           <option value="Active">Active</option>
//           <option value="Inactive">Inactive</option>
//           <option value="Suspended">Suspended</option>
//         </select>
//         <select
//           value={filterRole}
//           onChange={(e) => setFilterRole(e.target.value)}
//           className="p-2 border rounded w-full"
//         >
//           <option value="">Filter by Role</option>
//           <option value="Admin">Admin</option>
//           <option value="User">User</option>
//           <option value="Manager">Manager</option>
//         </select>
//       </div>

//       {/* Users Table */}
//       <table className="table-auto w-full">
//         <thead>
//           <tr>
//             <th className="px-4 py-2">ID</th>
//             <th className="px-4 py-2">Name</th>
//             <th className="px-4 py-2">Email</th>
//             <th className="px-4 py-2">Role</th>
//             <th className="px-4 py-2">Status</th>
//             <th className="px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredUsers.map((user) => (
//             <tr key={user.id}>
//               <td className="px-4 py-2">{user.id}</td>
//               <td className="px-4 py-2">{user.name}</td>
//               <td className="px-4 py-2">{user.email}</td>
//               <td className="px-4 py-2">{user.role}</td>
//               <td className="px-4 py-2">
//                 <span className={`px-2 py-1 rounded-full ${getStatusClass(user.status)}`}>
//                   {user.status}
//                 </span>
//               </td>
//               <td className="px-4 py-2">
//                 <button onClick={() => handleEdit(user)} className="text-blue-500">
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(user.id)}
//                   className="ml-4 text-red-500"
//                 >
//                   Delete
//                 </button>
//                 <button
//                   onClick={() => handleAssignRole(user)}
//                   className="ml-4 text-yellow-500"
//                 >
//                   Assign Role
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Edit User Modal */}
//       {editableUser && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded shadow-lg w-1/3">
//             <h3 className="mb-4 text-xl">Edit User</h3>
//             <form>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleFormChange}
//                 placeholder="Name"
//                 className="p-2 border rounded w-full mb-4"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleFormChange}
//                 placeholder="Email"
//                 className="p-2 border rounded w-full mb-4"
//               />
//               <input
//                 type="text"
//                 name="role"
//                 value={formData.role}
//                 onChange={handleFormChange}
//                 placeholder="Role"
//                 className="p-2 border rounded w-full mb-4"
//               />
//               <input
//                 type="text"
//                 name="status"
//                 value={formData.status}
//                 onChange={handleFormChange}
//                 placeholder="Status"
//                 className="p-2 border rounded w-full mb-4"
//               />
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={handleSaveEdit}
//                   className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
//                 >
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleCancelEdit}
//                   className="px-4 py-2 bg-gray-500 text-white rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded shadow-lg w-1/3">
//             <h3 className="text-xl mb-4">Delete User</h3>
//             <input
//               type="password"
//               value={secKey}
//               onChange={(e) => setSecKey(e.target.value)}
//               placeholder="Enter Security Key"
//               className="p-2 border rounded w-full mb-4"
//             />
//             <div className="flex justify-end">
//               <button
//                 onClick={handleSecKeySubmit}
//                 className="px-4 py-2 bg-red-500 text-white rounded mr-2"
//               >
//                 Delete
//               </button>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 bg-gray-500 text-white rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListUser;


// import React, { useState, useEffect } from "react";
// import { getUsers, deleteUser, editUser } from "../assets/objects"; // Import user management functions
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const ListUser = () => {
//   const [users, setUsers] = useState([]); // State to store the list of users
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [editableUser, setEditableUser] = useState(null); // State to store the user being edited
//   const [formData, setFormData] = useState({ name: "", email: "", role: "", status: "" }); // Form data for editing
//   const [secKey, setSecKey] = useState(""); // Security key for delete action
//   const [showModal, setShowModal] = useState(false); // Modal visibility for delete confirmation
//   const [searchName, setSearchName] = useState(""); // Search filter by name
//   const [searchId, setSearchId] = useState(""); // Search filter by ID
//   const [filterStatus, setFilterStatus] = useState(""); // Filter by status
//   const [filterRole, setFilterRole] = useState(""); // Filter by role
//   const [userToDelete, setUserToDelete] = useState(null); // State to track the user to delete
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const fetchedUsers = await getUsers();
//         if (fetchedUsers && fetchedUsers.length > 0) {
//           setUsers(fetchedUsers);
//         } else {
//           toast.info("No users found.");
//         }
//       } catch (error) {
//         setError(error);
//         toast.error("Failed to fetch users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Filtering logic
//   const filteredUsers = users.filter((user) => {
//     const matchesName = user.name.toLowerCase().includes(searchName.toLowerCase());
//     const matchesId = user.id.toString().includes(searchId);
//     const matchesStatus = filterStatus ? user.status === filterStatus : true;
//     const matchesRole = filterRole ? user.role === filterRole : true;
//     return matchesName && matchesId && matchesStatus && matchesRole;
//   });

//   const handleStatusChange = (userId, newStatus) => {
//     setUsers((prevUsers) =>
//       prevUsers.map((user) =>
//         user.id === userId ? { ...user, status: newStatus } : user
//       )
//     );
//     toast.success("User status updated successfully");
//   };

//   const handleEdit = (user) => {
//     setEditableUser(user);
//     setFormData({ ...user });
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSaveEdit = () => {
//     const updatedUser = { ...editableUser, ...formData };
//     const result = editUser(updatedUser);
//     if (result) {
//       setUsers((prevUsers) =>
//         prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
//       );
//       toast.success("User updated successfully");
//       setEditableUser(null);
//     } else {
//       toast.error("Failed to update user.");
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditableUser(null);
//   };

//   const handleDelete = (userId) => {
//     setUserToDelete(userId);
//     setShowModal(true);
//   };

//   const handleSecKeySubmit = () => {
//     const storedSecKey = import.meta.env.VITE_SEC_KEY;
//     if (secKey === storedSecKey) {
//       const result = deleteUser(userToDelete);
//       if (result) {
//         setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete));
//         toast.success("User deleted successfully");
//       } else {
//         toast.error("User not found.");
//       }
//       setShowModal(false);
//     } else {
//       toast.error("Incorrect SEC key.");
//     }
//   };

//   const getStatusClass = (status) => {
//     if (status === "Active") {
//       return "bg-green-500 text-white";
//     } else if (status === "Inactive") {
//       return "bg-red-500 text-white";
//     } else {
//       return "bg-gray-500 text-white";
//     }
//   };

//   const handleAssignRole = (user) => {
//     navigate("/RoleManagement", { state: { user: { name: user.name, id: user.id } } });
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error loading users. Please try again later.</div>;

//   return (
//     <div className="w-full px-4 py-6">
//       <h2 className="mb-4 text-xl font-semibold text-center">User List</h2>
//       <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search by name"
//           value={searchName}
//           onChange={(e) => setSearchName(e.target.value)}
//           className="p-2 border rounded w-full"
//         />
//         <input
//           type="text"
//           placeholder="Search by ID"
//           value={searchId}
//           onChange={(e) => setSearchId(e.target.value)}
//           className="p-2 border rounded w-full"
//         />
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="p-2 border rounded w-full"
//         >
//           <option value="">Filter by Status</option>
//           <option value="Active">Active</option>
//           <option value="Inactive">Inactive</option>
//           <option value="Suspended">Suspended</option>
//         </select>
//         <select
//           value={filterRole}
//           onChange={(e) => setFilterRole(e.target.value)}
//           className="p-2 border rounded w-full"
//         >
//           <option value="">Filter by Role</option>
//           <option value="Admin">Admin</option>
//           <option value="User">User</option>
//           <option value="Manager">Manager</option>
//         </select>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full table-auto border-collapse border border-gray-300">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-4 py-2 border">ID</th>
//               <th className="px-4 py-2 border">Name</th>
//               <th className="px-4 py-2 border">Email</th>
//               <th className="px-4 py-2 border">Role</th>
//               <th className="px-4 py-2 border">Status</th>
//               <th className="px-4 py-2 border">Action</th>
//               <th className="px-4 py-2 border">Assign Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.length > 0 ? (
//               filteredUsers.map((user) => (
//                 <tr key={user.id} className="hover:bg-gray-100">
//                   <td className="px-4 py-2 border">{user.id}</td>
//                   <td className="px-4 py-2 border">{user.name}</td>
//                   <td className="px-4 py-2 border">{user.email}</td>
//                   <td className="px-4 py-2 border">{user.role}</td>
//                   <td className="px-4 py-2 border">
//                     <select
//                       value={user.status}
//                       onChange={(e) => handleStatusChange(user.id, e.target.value)}
//                       className={`px-2 py-1 border rounded-md ${getStatusClass(user.status)}`}
//                     >
//                       <option value="Active">Active</option>
//                       <option value="Inactive">Inactive</option>
//                       <option value="Suspended">Suspended</option>
//                     </select>
//                   </td>
//                   <td className="px-4 py-2 border flex space-x-2">
//                     <button
//                       onClick={() =>      onClick={handleSaveEdit}}
//                       className="px-1 py-0 bg-blue-500 text-white rounded-md"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(user.id)}
//                       className="px-1 py-0 bg-red-500 text-white rounded-md"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <button
//                       onClick={() => handleAssignRole(user)}
//                       className="px-2 py-1 bg-indigo-500 text-white rounded"
//                     >
//                       Assign Role
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center py-4">No users found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal for delete confirmation */}
//       {showModal && (
//         <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50">
//           <div className="bg-white p-6 rounded-md shadow-lg">
//             <h3 className="text-xl mb-4">Confirm Deletion</h3>
//             <input
//               type="text"
//               placeholder="Enter security key"
//               value={secKey}
//               onChange={(e) => setSecKey(e.target.value)}
//               className="p-2 border rounded w-full mb-4"
//             />
//             <div className="flex justify-between">
//               <button
//                 onClick={handleSecKeySubmit}
//                 className="px-4 py-2 bg-blue-500 text-white rounded-md"
//               >
//                 Confirm
//               </button>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 bg-gray-500 text-white rounded-md"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListUser;







// import React, { useState, useEffect } from "react";
// import { getUsers, deleteUser, editUser } from "../assets/objects"; // Import user management functions
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const ListUser = () => {
//   const [users, setUsers] = useState([]); // State to store the list of users
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [editableUser, setEditableUser] = useState(null); // State to store the user being edited
//   const [formData, setFormData] = useState({ name: "", email: "", role: "", status: "" }); // Form data for editing
//   const [secKey, setSecKey] = useState(""); // Security key for delete action
//   const [showModal, setShowModal] = useState(false); // Modal visibility for delete confirmation
//   const [searchName, setSearchName] = useState(""); // Search filter by name
//   const [searchId, setSearchId] = useState(""); // Search filter by ID
//   const [filterStatus, setFilterStatus] = useState(""); // Filter by status
//   const [filterRole, setFilterRole] = useState(""); // Filter by role
//   const [userToDelete, setUserToDelete] = useState(null); // State to track the user to delete
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const fetchedUsers = await getUsers();
//         if (fetchedUsers && fetchedUsers.length > 0) {
//           setUsers(fetchedUsers);
//         } else {
//           toast.info("No users found.");
//         }
//       } catch (error) {
//         setError(error);
//         toast.error("Failed to fetch users");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Filtering logic
//   const filteredUsers = users.filter((user) => {
//     const matchesName = user.name.toLowerCase().includes(searchName.toLowerCase());
//     const matchesId = user.id.toString().includes(searchId);
//     const matchesStatus = filterStatus ? user.status === filterStatus : true;
//     const matchesRole = filterRole ? user.role === filterRole : true;
//     return matchesName && matchesId && matchesStatus && matchesRole;
//   });

//   const handleStatusChange = (userId, newStatus) => {
//     setUsers((prevUsers) =>
//       prevUsers.map((user) =>
//         user.id === userId ? { ...user, status: newStatus } : user
//       )
//     );
//     toast.success("User status updated successfully");
//   };

//   // Handle the edit action
//   const handleEdit = (user) => {
//     setEditableUser(user);
//     setFormData({ ...user });
//   };

//   // Handle form field changes
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle save after editing
//   const handleSaveEdit = () => {
//     const updatedUser = { ...editableUser, ...formData };
//     const result = editUser(updatedUser);
//     if (result) {
//       setUsers((prevUsers) =>
//         prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
//       );
//       toast.success("User updated successfully");
//       setEditableUser(null);
//     } else {
//       toast.error("Failed to update user.");
//     }
//   };

//   // Handle cancel edit action
//   const handleCancelEdit = () => {
//     setEditableUser(null);
//   };

//   // Handle delete action
//   const handleDelete = (userId) => {
//     setUserToDelete(userId);
//     setShowModal(true);
//   };

//   const handleSecKeySubmit = () => {
//     const storedSecKey = import.meta.env.VITE_SEC_KEY;
//     if (secKey === storedSecKey) {
//       const result = deleteUser(userToDelete);
//       if (result) {
//         setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete));
//         toast.success("User deleted successfully");
//       } else {
//         toast.error("User not found.");
//       }
//       setShowModal(false);
//     } else {
//       toast.error("Incorrect SEC key.");
//     }
//   };

//   const getStatusClass = (status) => {
//     if (status === "Active") {
//       return "bg-green-500 text-white";
//     } else if (status === "Inactive") {
//       return "bg-red-500 text-white";
//     } else {
//       return "bg-gray-500 text-white";
//     }
//   };

//   const handleAssignRole = (user) => {
//     navigate("/RoleManagement", { state: { user: { name: user.name, id: user.id } } });
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error loading users. Please try again later.</div>;

//   return (
//     <div className="w-full px-4 py-6">
//       <h2 className="mb-4 text-xl font-semibold text-center">User List</h2>
//       <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4">
//         <input
//           type="text"
//           placeholder="Search by name"
//           value={searchName}
//           onChange={(e) => setSearchName(e.target.value)}
//           className="p-2 border rounded w-full"
//         />
//         <input
//           type="text"
//           placeholder="Search by ID"
//           value={searchId}
//           onChange={(e) => setSearchId(e.target.value)}
//           className="p-2 border rounded w-full"
//         />
//         <select
//           value={filterStatus}
//           onChange={(e) => setFilterStatus(e.target.value)}
//           className="p-2 border rounded w-full"
//         >
//           <option value="">Filter by Status</option>
//           <option value="Active">Active</option>
//           <option value="Inactive">Inactive</option>
//           <option value="Suspended">Suspended</option>
//         </select>
//         <select
//           value={filterRole}
//           onChange={(e) => setFilterRole(e.target.value)}
//           className="p-2 border rounded w-full"
//         >
//           <option value="">Filter by Role</option>
//           <option value="Admin">Admin</option>
//           <option value="User">User</option>
//           <option value="Manager">Manager</option>
//         </select>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full table-auto border-collapse border border-gray-300">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-4 py-2 border">ID</th>
//               <th className="px-4 py-2 border">Name</th>
//               <th className="px-4 py-2 border">Email</th>
//               <th className="px-4 py-2 border">Role</th>
//               <th className="px-4 py-2 border">Status</th>
//               <th className="px-4 py-2 border">Action</th>
//               <th className="px-4 py-2 border">Assign Role</th>
//               <th className="px-4 py-2 border">Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.length > 0 ? (
//               filteredUsers.map((user) => (
//                 <tr key={user.id} className="hover:bg-gray-100">
//                   <td className="px-4 py-2 border">{user.id}</td>
//                   <td className="px-4 py-2 border">
//                     {editableUser?.id === user.id ? (
//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleFormChange}
//                         className="p-1 border rounded w-full"
//                       />
//                     ) : (
//                       user.name
//                     )}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {editableUser?.id === user.id ? (
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleFormChange}
//                         className="p-1 border rounded w-full"
//                       />
//                     ) : (
//                       user.email
//                     )}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {editableUser?.id === user.id ? (
//                       <input
//                         type="text"
//                         name="role"
//                         value={formData.role}
//                         onChange={handleFormChange}
//                         className="p-1 border rounded w-full"
//                       />
//                     ) : (
//                       user.role
//                     )}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {editableUser?.id === user.id ? (
//                       <select
//                         name="status"
//                         value={formData.status}
//                         onChange={handleFormChange}
//                         className="p-1 border rounded w-full"
//                       >
//                         <option value="Active">Active</option>
//                         <option value="Inactive">Inactive</option>
//                         <option value="Suspended">Suspended</option>
//                       </select>
//                     ) : (
//                       <span className={`px-2 py-1 rounded ${getStatusClass(user.status)}`}>
//                         {user.status}
//                       </span>
//                     )}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     {editableUser?.id === user.id ? (
//                       <div>
//                         <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">
//                           Save
//                         </button>
//                         <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-2 py-1 rounded">
//                           Cancel
//                         </button>
//                       </div>
//                     ) : (
//                       <button onClick={() => handleEdit(user)} className="bg-yellow-500 text-white px-2 py-1 rounded">
//                         Edit
//                       </button>
//                     )}
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <button
//                       onClick={() => handleAssignRole(user)}
//                       className="bg-teal-500 text-white px-2 py-1 rounded"
//                     >
//                       Assign Role
//                     </button>
//                   </td>
//                   <td className="px-4 py-2 border">
//                     <button
//                       onClick={() => handleDelete(user.id)}
//                       className="bg-red-500 text-white px-2 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8" className="text-center px-4 py-2 border">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal for delete confirmation */}
//       {showModal && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-md shadow-lg">
//             <h3 className="mb-4 text-lg font-semibold">Enter SEC Key to Confirm Deletion</h3>
//             <input
//               type="password"
//               value={secKey}
//               onChange={(e) => setSecKey(e.target.value)}
//               className="p-2 border rounded mb-4"
//               placeholder="SEC Key"
//             />
//             <div className="flex justify-between">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="bg-gray-500 text-white px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSecKeySubmit}
//                 className="bg-red-500 text-white px-4 py-2 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ListUser;




import React, { useState, useEffect } from "react";
import { getUsers, deleteUser, editUser } from "../assets/objects"; // Import user management functions
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ListUser = () => {
  const [users, setUsers] = useState([]); // State to store the list of users
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [editableUser, setEditableUser] = useState(null); // State to store the user being edited
  const [formData, setFormData] = useState({ name: "", email: "", role: "", status: "" }); // Form data for editing
  const [secKey, setSecKey] = useState(""); // Security key for delete action
  const [showModal, setShowModal] = useState(false); // Modal visibility for delete confirmation
  const [searchName, setSearchName] = useState(""); // Search filter by name
  const [searchId, setSearchId] = useState(""); // Search filter by ID
  const [filterStatus, setFilterStatus] = useState(""); // Filter by status
  const [filterRole, setFilterRole] = useState(""); // Filter by role
  const [userToDelete, setUserToDelete] = useState(null); // State to track the user to delete
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await getUsers();
        if (fetchedUsers && fetchedUsers.length > 0) {
          setUsers(fetchedUsers);
        } else {
          toast.info("No users found.");
        }
      } catch (error) {
        setError(error);
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filtering logic
  const filteredUsers = users.filter((user) => {
    const matchesName = user.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesId = user.id.toString().includes(searchId);
    const matchesStatus = filterStatus ? user.status === filterStatus : true;
    const matchesRole = filterRole ? user.role === filterRole : true;
    return matchesName && matchesId && matchesStatus && matchesRole;
  });

  const handleStatusChange = (userId, newStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    toast.success("User status updated successfully");
  };

  // Handle the edit action
  const handleEdit = (user) => {
    setEditableUser(user);
    setFormData({ ...user });
  };

  // Handle form field changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle save after editing
  const handleSaveEdit = () => {
    const updatedUser = { ...editableUser, ...formData };
    const result = editUser(updatedUser);
    if (result) {
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      toast.success("User updated successfully");
      setEditableUser(null);
    } else {
      toast.error("Failed to update user.");
    }
  };

  // Handle cancel edit action
  const handleCancelEdit = () => {
    setEditableUser(null);
  };

  // Handle delete action
  const handleDelete = (userId) => {
    setUserToDelete(userId);
    setShowModal(true);
  };

  const handleSecKeySubmit = () => {
    const storedSecKey = import.meta.env.VITE_SEC_KEY;
    if (secKey === storedSecKey) {
      const result = deleteUser(userToDelete);
      if (result) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete));
        toast.success("User deleted successfully");
      } else {
        toast.error("User not found.");
      }
      setShowModal(false);
    } else {
      toast.error("Incorrect SEC key.");
    }
  };

  const getStatusClass = (status) => {
    if (status === "Active") {
      return "bg-green-500 text-white";
    } else if (status === "Inactive") {
      return "bg-red-500 text-white";
    } else {
      return "bg-gray-500 text-white";
    }
  };

  const handleAssignRole = (user) => {
    navigate("/RoleManagement", { state: { user: { name: user.name, id: user.id } } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading users. Please try again later.</div>;

  return (
    <div className="w-full px-4 py-6">
      <h2 className="mb-4 text-xl font-semibold text-center">User List</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">Filter by Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Suspended">Suspended</option>
        </select>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">Filter by Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Manager">Manager</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
              <th className="px-4 py-2 border">Assign Role</th>
              <th className="px-4 py-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{user.id}</td>
                  <td className="px-4 py-2 border">
                    {editableUser?.id === user.id ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="p-1 border rounded w-full"
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {editableUser?.id === user.id ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="p-1 border rounded w-full"
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {editableUser?.id === user.id ? (
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleFormChange}
                        className="p-1 border rounded w-full"
                      />
                    ) : (
                      user.role
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {editableUser?.id === user.id ? (
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleFormChange}
                        className="p-1 border rounded w-full"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Suspended">Suspended</option>
                      </select>
                    ) : (
                      <span className={`px-2 py-1 rounded-full ${getStatusClass(user.status)}`}>
                        {user.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 border flex justify-center">
  {editableUser?.id === user.id ? (
    <>
      <button onClick={handleSaveEdit} className="px-4 py-1 bg-green-500 text-white rounded mr-2">
        Save
      </button>
      <button onClick={handleCancelEdit} className="px-4 py-1 bg-red-500 text-white rounded">
        Cancel
      </button>
    </>
  ) : (
    <button onClick={() => handleEdit(user)} className="px-4 py-1 bg-blue-500 text-white rounded">
      Edit
    </button>
  )}
</td>

                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleAssignRole(user)}
                      className="px-4 py-1 bg-black text-white rounded"
                    >
                      Assign Role
                    </button>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="px-4 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-2">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for delete confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded">
            <h3 className="text-xl mb-4">Enter Passcode to Confirm Deletion</h3>
            <input
              type="text"
              value={secKey}
              onChange={(e) => setSecKey(e.target.value)}
              className="p-2 border rounded w-full mb-4"
            />
            <div className="flex justify-between">
              <button onClick={handleSecKeySubmit} className="px-4 py-2 bg-black text-white rounded">
                Submit
              </button>
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 text-black rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListUser;
