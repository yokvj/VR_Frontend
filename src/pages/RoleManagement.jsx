
// import React, { useState } from "react";
// import { toast } from "react-toastify";

// const RoleManagement = () => {
//     const [roles, setRoles] = useState([]);
//     const [newRole, setNewRole] = useState({ name: "", permissions: [], employeeId: "" });
//     const [editingRole, setEditingRole] = useState(null);
//     const [selectedPermissions, setSelectedPermissions] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [enteredKey, setEnteredKey] = useState("");
//     const [callbackFunction, setCallbackFunction] = useState(null);

//     const allPermissions = ["Read", "Write", "Delete", "Update"];
//     const secretKey = import.meta.env.VITE_SEC_KEY || "1234";

//     const handleAddRole = () => {
//         if (!newRole.name.trim() || !newRole.employeeId.trim()) {
//             toast.error("Role name and Employee ID cannot be empty.");
//             return;
//         }

//         if (roles.some(role => role.name === newRole.name)) {
//             toast.error("Role name must be unique.");
//             return;
//         }

//         if (roles.some(role => role.employeeId === newRole.employeeId)) {
//             toast.error("Employee ID already exists.");
//             return;
//         }

//         const newRoleData = { ...newRole, permissions: selectedPermissions };
//         setRoles([...roles, newRoleData]);
//         setNewRole({ name: "", permissions: [], employeeId: "" });
//         setSelectedPermissions([]);
//         toast.success("Role added successfully!");
//     };

//     const promptForSecretKey = (callback) => {
//         setCallbackFunction(() => callback);
//         setIsModalOpen(true);
//     };

//     const handleSecretKeySubmit = () => {
//         if (enteredKey === secretKey) {
//             callbackFunction();
//             setIsModalOpen(false);
//             setEnteredKey("");
//         } else {
//             toast.error("Invalid secret key.");
//         }
//     };

//     const handleEditRole = (role) => {
//         promptForSecretKey(() => {
//             setEditingRole(role);
//             setNewRole({ name: role.name, permissions: [...role.permissions], employeeId: role.employeeId });
//             setSelectedPermissions(role.permissions);
//         });
//     };

//     const handleSaveEdit = () => {
//         if (roles.some(role => role.employeeId === newRole.employeeId && role.name !== editingRole.name)) {
//             toast.error("Employee ID already exists.");
//             return;
//         }

//         const updatedRoles = roles.map(role =>
//             role.name === editingRole.name
//                 ? { ...editingRole, permissions: selectedPermissions, employeeId: newRole.employeeId }
//                 : role
//         );
//         setRoles(updatedRoles);
//         setEditingRole(null);
//         setNewRole({ name: "", permissions: [], employeeId: "" });
//         setSelectedPermissions([]);
//         toast.success("Role updated successfully!");
//     };

//     const handleDeleteRole = (roleName) => {
//         promptForSecretKey(() => {
//             setRoles(roles.filter(role => role.name !== roleName));
//             toast.success("Role deleted successfully!");
//         });
//     };

//     const handlePermissionChange = (permission) => {
//         setSelectedPermissions((prevPermissions) =>
//             prevPermissions.includes(permission)
//                 ? prevPermissions.filter(p => p !== permission)
//                 : [...prevPermissions, permission]
//         );
//     };

//     return (
//         <div className="w-full px-4">
//             <h2 className="mb-4 text-xl font-semibold text-center">Role Management</h2>

//             {/* Modal for Secret Key */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//                     <div className="bg-white p-6 rounded-md shadow-lg w-80 max-w-xs">
//                         <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">Enter Secret Key</h3>
//                         <input
//                             type="password"
//                             value={enteredKey}
//                             onChange={(e) => setEnteredKey(e.target.value)}
//                             placeholder="Secret Key"
//                             className="w-full p-2 border border-gray-300 rounded-md mb-4 text-sm"
//                         />
//                         <div className="flex justify-between">
//                             <button
//                                 onClick={handleSecretKeySubmit}
//                                 className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
//                             >
//                                 Submit
//                             </button>
//                             <button
//                                 onClick={() => {
//                                     setIsModalOpen(false);
//                                     setEnteredKey("");
//                                 }}
//                                 className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Add/Edit Role Form */}
//             <div className="mb-6 border p-4 rounded-lg shadow-md">
//                 <h3 className="text-lg font-semibold mb-4">
//                     {editingRole ? `Edit Role: ${editingRole.name}` : "Add New Role"}
//                 </h3>
//                 <div className="mb-4">
//                     <label className="block font-medium mb-2">Role Name:</label>
//                     <input
//                         type="text"
//                         value={newRole.name}
//                         onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
//                         placeholder="Enter role name"
//                         className="w-full p-2 border border-gray-300 rounded-md"
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label className="block font-medium mb-2">Employee ID:</label>
//                     <input
//                         type="text"
//                         value={newRole.employeeId}
//                         onChange={(e) => setNewRole({ ...newRole, employeeId: e.target.value })}
//                         placeholder="Enter Employee ID"
//                         className="w-full p-2 border border-gray-300 rounded-md"
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label className="block font-medium mb-2">Permissions:</label>
//                     <div className="flex flex-wrap gap-2">
//                         {allPermissions.map((permission) => (
//                             <label key={permission} className="flex items-center space-x-2">
//                                 <input
//                                     type="checkbox"
//                                     checked={selectedPermissions.includes(permission)}
//                                     onChange={() => handlePermissionChange(permission)}
//                                 />
//                                 <span>{permission}</span>
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="flex space-x-4">
//                     {editingRole ? (
//                         <>
//                             <button
//                                 onClick={handleSaveEdit}
//                                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//                             >
//                                 Save
//                             </button>
//                             <button
//                                 onClick={() => setEditingRole(null)}
//                                 className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
//                             >
//                                 Cancel
//                             </button>
//                         </>
//                     ) : (
//                         <button
//                             onClick={handleAddRole}
//                             className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
//                         >
//                             Add Role
//                         </button>
//                     )}
//                 </div>
//             </div>

//             {/* Roles Table */}
//             <div className="overflow-x-auto">
//                 <table className="table-auto w-full border-collapse border border-gray-300">
//                     <thead className="bg-gray-200">
//                         <tr>
//                             <th className="px-4 py-2 border">Role Name</th>
//                             <th className="px-4 py-2 border">Employee ID</th>
//                             <th className="px-4 py-2 border">Permissions</th>
//                             <th className="px-4 py-2 border">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {roles.length > 0 ? (
//                             roles.map((role) => (
//                                 <tr key={role.name} className="hover:bg-gray-100">
//                                     <td className="px-4 py-2 border">{role.name}</td>
//                                     <td className="px-4 py-2 border">{role.employeeId}</td>
//                                     <td className="px-4 py-2 border">{role.permissions.join(", ") || "No Permissions"}</td>
//                                     <td className="px-4 py-2 border text-center">
//                                         <div className="flex justify-center space-x-2">
//                                             <button
//                                                 onClick={() => handleEditRole(role)}
//                                                 className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//                                             >
//                                                 Edit
//                                             </button>
//                                             <button
//                                                 onClick={() => handleDeleteRole(role.name)}
//                                                 className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
//                                             >
//                                                 Delete
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr>
//                                 <td colSpan="4" className="text-center py-4">No roles found</td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default RoleManagement;


// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { toast } from "react-toastify";

// const RoleManagement = () => {
//   const location = useLocation();
//   const user = location.state?.user || {};  // Get the user object passed from ListUser.jsx

//   const [roles, setRoles] = useState([]);
//   const [newRole, setNewRole] = useState({ name: "", permissions: [], employeeId: "" });
//   const [selectedPermissions, setSelectedPermissions] = useState([]);

//   // The user data passed from ListUser.jsx is available here
//   const { name, id } = user;

//   const handleAddRole = () => {
//     if (!newRole.name.trim() || !newRole.employeeId.trim()) {
//       toast.error("Role name and Employee ID cannot be empty.");
//       return;
//     }

//     const newRoleData = { ...newRole, permissions: selectedPermissions };
//     setRoles([...roles, newRoleData]);
//     setNewRole({ name: "", permissions: [], employeeId: "" });
//     setSelectedPermissions([]);
//     toast.success("Role added successfully!");
//   };

//   return (
//     <div className="w-full px-4">
//       <h2 className="mb-4 text-xl font-semibold text-center">Role Management</h2>

//       {/* Displaying the passed user data */}
//       <div className="mb-6 p-4 border rounded-lg shadow-md">
//         <h3 className="text-lg font-semibold mb-4">Assign Role for {name} (ID: {id})</h3>
//         {/* Add Role Form */}
//         <div className="mb-4">
//           <label className="block font-medium mb-2">Role Name:</label>
//           <input
//             type="text"
//             value={newRole.name}
//             onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
//             placeholder="Enter role name"
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block font-medium mb-2">Employee ID:</label>
//           <input
//             type="text"
//             value={newRole.employeeId || id}  // Using the passed user ID here
//             onChange={(e) => setNewRole({ ...newRole, employeeId: e.target.value })}
//             placeholder="Enter Employee ID"
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//         </div>

//         {/* Permissions */}
//         <div className="mb-4">
//           <label className="block font-medium mb-2">Permissions:</label>
//           <div className="flex flex-wrap gap-2">
//             {["Read", "Write", "Delete", "Update"].map((permission) => (
//               <label key={permission} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedPermissions.includes(permission)}
//                   onChange={() => handlePermissionChange(permission)}
//                 />
//                 <span>{permission}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Add Role Button */}
//         <button
//           onClick={handleAddRole}
//           className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
//         >
//           Add Role
//         </button>
//       </div>

//       {/* Roles Table */}
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-300">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-4 py-2 border">Role Name</th>
//               <th className="px-4 py-2 border">Employee ID</th>
//               <th className="px-4 py-2 border">Permissions</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {roles.length > 0 ? (
//               roles.map((role) => (
//                 <tr key={role.name}>
//                   <td className="px-4 py-2 border">{role.name}</td>
//                   <td className="px-4 py-2 border">{role.employeeId}</td>
//                   <td className="px-4 py-2 border">{role.permissions.join(", ") || "No Permissions"}</td>
//                   <td className="px-4 py-2 border text-center">
//                     {/* Add other actions like edit/delete */}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center py-4">No roles found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default RoleManagement;



// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { toast } from "react-toastify";

// const RoleManagement = () => {
//   const location = useLocation();
//   const user = location.state?.user || {};  // Get the user object passed from ListUser.jsx

//   const [roles, setRoles] = useState([]);
//   const [newRole, setNewRole] = useState({ name: "", permissions: [], employeeId: "" });
//   const [selectedPermissions, setSelectedPermissions] = useState([]);

//   // The user data passed from ListUser.jsx is available here
//   const { name, id } = user;

//   // List of available roles for dropdown
//   const roleOptions = ["Admin", "Manager", "Editor", "Viewer"];

//   const handleAddRole = () => {
//     if (!newRole.name.trim() || !newRole.employeeId.trim()) {
//       toast.error("Role name and Employee ID cannot be empty.");
//       return;
//     }

//     const newRoleData = { ...newRole, permissions: selectedPermissions };
//     setRoles([...roles, newRoleData]);
//     setNewRole({ name: "", permissions: [], employeeId: "" });
//     setSelectedPermissions([]);
//     toast.success("Role added successfully!");
//   };

//   // Handle changes to permissions checkboxes
//   const handlePermissionChange = (permission) => {
//     setSelectedPermissions((prevPermissions) =>
//       prevPermissions.includes(permission)
//         ? prevPermissions.filter((p) => p !== permission)  // Remove permission if it's already selected
//         : [...prevPermissions, permission]  // Add permission if it's not selected
//     );
//   };

//   return (
//     <div className="w-full px-4">
//       <h2 className="mb-4 text-xl font-semibold text-center">Role Management</h2>

//       {/* Displaying the passed user data */}
//       <div className="mb-6 p-4 border rounded-lg shadow-md">
//         <h3 className="text-lg font-semibold mb-4">Assign Role for {name} (ID: {id})</h3>
//         {/* Add Role Form */}
//         <div className="mb-4">
//           <label className="block font-medium mb-2">Role Name:</label>
//           <select
//             value={newRole.name}
//             onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">Select Role</option>
//             {roleOptions.map((role) => (
//               <option key={role} value={role}>
//                 {role}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block font-medium mb-2">Employee ID:</label>
//           <input
//             type="text"
//             value={newRole.employeeId || id}  // Using the passed user ID here
//             readOnly
//             className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
//           />
//         </div>

//         {/* Permissions */}
//         <div className="mb-4">
//           <label className="block font-medium mb-2">Permissions:</label>
//           <div className="flex flex-wrap gap-2">
//             {["Read", "Write", "Delete", "Update"].map((permission) => (
//               <label key={permission} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedPermissions.includes(permission)}
//                   onChange={() => handlePermissionChange(permission)}
//                 />
//                 <span>{permission}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Add Role Button */}
//         <button
//           onClick={handleAddRole}
//           className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
//         >
//           Add Role
//         </button>
//       </div>

//       {/* Roles Table */}
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-300">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-4 py-2 border">Role Name</th>
//               <th className="px-4 py-2 border">Employee ID</th>
//               <th className="px-4 py-2 border">Permissions</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {roles.length > 0 ? (
//               roles.map((role, index) => (
//                 <tr key={index}>
//                   <td className="px-4 py-2 border">{role.name}</td>
//                   <td className="px-4 py-2 border">{role.employeeId}</td>
//                   <td className="px-4 py-2 border">{role.permissions.join(", ") || "No Permissions"}</td>
//                   <td className="px-4 py-2 border text-center">
//                     {/* Add other actions like edit/delete */}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center py-4">No roles found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default RoleManagement;




// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { toast } from "react-toastify";

// const RoleManagement = () => {
//   const location = useLocation();
//   const user = location.state?.user || {};  // Get the user object passed from ListUser.jsx

//   const [roles, setRoles] = useState([]);
//   const [newRole, setNewRole] = useState({
//     name: "",  // Default empty, will update with dropdown
//     permissions: [],
//     employeeId: user.id || "",  // Set default to user ID
//   });
//   const [selectedPermissions, setSelectedPermissions] = useState([]);

//   // The user data passed from ListUser.jsx is available here
//   const { name, id } = user;

//   // List of available roles for dropdown
//   const roleOptions = ["Admin", "Manager", "Editor", "Viewer"];

//   const handleAddRole = () => {
//     // Log values for debugging
//     console.log("Role Name:", newRole.name);
//     console.log("Employee ID:", newRole.employeeId);

//     // Validation
//     if (!newRole.name || !newRole.employeeId) {
//       toast.error("Role name and Employee ID cannot be empty.");
//       return;
//     }

//     const newRoleData = { ...newRole, permissions: selectedPermissions };
//     setRoles([...roles, newRoleData]);
//     setNewRole({ name: "", permissions: [], employeeId: "" });  // Reset form
//     setSelectedPermissions([]);
//     toast.success("Role added successfully!");
//   };

//   // Handle changes to permissions checkboxes
//   const handlePermissionChange = (permission) => {
//     setSelectedPermissions((prevPermissions) =>
//       prevPermissions.includes(permission)
//         ? prevPermissions.filter((p) => p !== permission)  // Remove permission if it's already selected
//         : [...prevPermissions, permission]  // Add permission if it's not selected
//     );
//   };

//   return (
//     <div className="w-full px-4">
//       <h2 className="mb-4 text-xl font-semibold text-center">Role Management</h2>

//       {/* Displaying the passed user data */}
//       <div className="mb-6 p-4 border rounded-lg shadow-md">
//         <h3 className="text-lg font-semibold mb-4">Assign Role for {name} (ID: {id})</h3>
//         {/* Add Role Form */}
//         <div className="mb-4">
//           <label className="block font-medium mb-2">Role Name:</label>
//           <select
//             value={newRole.name}
//             onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">Select Role</option>
//             {roleOptions.map((role) => (
//               <option key={role} value={role}>
//                 {role}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block font-medium mb-2">Employee ID:</label>
//           <input
//             type="text"
//             value={newRole.employeeId || id}  // Using the passed user ID here
//             readOnly
//             className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
//           />
//         </div>

//         {/* Permissions */}
//         <div className="mb-4">
//           <label className="block font-medium mb-2">Permissions:</label>
//           <div className="flex flex-wrap gap-2">
//             {["Read", "Write", "Delete", "Update"].map((permission) => (
//               <label key={permission} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedPermissions.includes(permission)}
//                   onChange={() => handlePermissionChange(permission)}
//                 />
//                 <span>{permission}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Add Role Button */}
//         <button
//           onClick={handleAddRole}
//           className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
//         >
//           Add Role
//         </button>
//       </div>

//       {/* Roles Table */}
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-300">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-4 py-2 border">Role Name</th>
//               <th className="px-4 py-2 border">Employee ID</th>
//               <th className="px-4 py-2 border">Permissions</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {roles.length > 0 ? (
//               roles.map((role, index) => (
//                 <tr key={index}>
//                   <td className="px-4 py-2 border">{role.name}</td>
//                   <td className="px-4 py-2 border">{role.employeeId}</td>
//                   <td className="px-4 py-2 border">{role.permissions.join(", ") || "No Permissions"}</td>
//                   <td className="px-4 py-2 border text-center">
//                     {/* Add other actions like edit/delete */}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center py-4">No roles found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default RoleManagement;







// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { toast } from "react-toastify";

// // Array to store role data
// let roles = [];  // Global array for storing role data

// // Function to add a new role
// const addRole = (role) => {
//   const isDuplicate = roles.some(existingRole => existingRole.employeeId === role.employeeId);

//   if (isDuplicate) {
//     throw new Error("Role with the same Employee ID already exists.");
//   }

//   roles.push(role); // Add new role to the array
// };

// // Function to get all roles
// const getRoles = () => {
//   return roles; // Return the current list of roles
// };

// // Function to delete a role by Employee ID
// const deleteRole = (employeeId) => {
//   const initialLength = roles.length;
//   roles = roles.filter(role => role.employeeId !== employeeId); // Remove the role with the matching Employee ID
//   return roles.length < initialLength; // Return true if a role was deleted, false otherwise
// };

// // Function to update a role's details
// const editRole = (updatedRole) => {
//   const index = roles.findIndex(role => role.employeeId === updatedRole.employeeId);
//   if (index !== -1) {
//     roles[index] = updatedRole; // Update the role in the array
//     return true; // Return true if the role was updated successfully
//   }
//   return false; // Return false if the role was not found
// };

// const RoleManagement = () => {
//   const location = useLocation();
//   const user = location.state?.user || {};  // Get the user object passed from ListUser.jsx

//   const [rolesList, setRolesList] = useState(roles);  // Use the global roles array
//   const [newRole, setNewRole] = useState({
//     name: "",  // Default empty, will update with dropdown
//     permissions: [],
//     employeeId: user.id || "",  // Set default to user ID
//   });
//   const [selectedPermissions, setSelectedPermissions] = useState([]);
//   const [editingRole, setEditingRole] = useState(null); // For storing the role that is being edited

//   const { name, id } = user;

//   const roleOptions = ["Admin", "Manager", "Editor", "Viewer"];

//   const handleAddRole = () => {
//     // Log values for debugging
//     console.log("Role Name:", newRole.name);
//     console.log("Employee ID:", newRole.employeeId);

//     // Validation
//     if (!newRole.name || !newRole.employeeId) {
//       toast.error("Role name and Employee ID cannot be empty.");
//       return;
//     }

//     const newRoleData = { ...newRole, permissions: selectedPermissions };
//     try {
//       addRole(newRoleData);  // Add role to the roles array
//       setRolesList([...roles]);  // Update the state with the new roles list
//       setNewRole({ name: "", permissions: [], employeeId: "" });  // Reset form
//       setSelectedPermissions([]);
//       toast.success("Role added successfully!");
//     } catch (error) {
//       toast.error(error.message);  // Handle duplicate errors
//     }
//   };

//   const handlePermissionChange = (permission) => {
//     setSelectedPermissions((prevPermissions) =>
//       prevPermissions.includes(permission)
//         ? prevPermissions.filter((p) => p !== permission)
//         : [...prevPermissions, permission]
//     );
//   };

//   const handleDeleteRole = (employeeId) => {
//     const isDeleted = deleteRole(employeeId);
//     if (isDeleted) {
//       setRolesList([...roles]);  // Update the roles list after deletion
//       toast.success("Role deleted successfully!");
//     } else {
//       toast.error("Role not found!");
//     }
//   };

//   const handleEditRole = (role) => {
//     setEditingRole(role);  // Set the role to edit
//     setNewRole({
//       ...role,
//       permissions: role.permissions || [],
//     });
//     setSelectedPermissions(role.permissions || []);  // Pre-fill permissions
//   };

//   const handleUpdateRole = () => {
//     // Validation
//     if (!newRole.name || !newRole.employeeId) {
//       toast.error("Role name and Employee ID cannot be empty.");
//       return;
//     }

//     const updatedRoleData = { ...newRole, permissions: selectedPermissions };
//     const isUpdated = editRole(updatedRoleData);  // Update role in the global array

//     if (isUpdated) {
//       setRolesList([...roles]);  // Update the roles list after edit
//       setNewRole({ name: "", permissions: [], employeeId: "" });  // Reset form
//       setSelectedPermissions([]);
//       setEditingRole(null);  // Reset editing state
//       toast.success("Role updated successfully!");
//     } else {
//       toast.error("Role update failed!");
//     }
//   };

//   return (
//     <div className="w-full px-4">
//       <h2 className="mb-4 text-xl font-semibold text-center">Role Management</h2>

//       <div className="mb-6 p-4 border rounded-lg shadow-md">
//         <h3 className="text-lg font-semibold mb-4">
//           {editingRole ? `Edit Role for ${editingRole.name} (ID: ${editingRole.employeeId})` : `Assign Role for ${name} (ID: ${id})`}
//         </h3>

//         <div className="mb-4">
//           <label className="block font-medium mb-2">Role Name:</label>
//           <select
//             value={newRole.name}
//             onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">Select Role</option>
//             {roleOptions.map((role) => (
//               <option key={role} value={role}>
//                 {role}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block font-medium mb-2">Employee ID:</label>
//           <input
//             type="text"
//             value={newRole.employeeId || id}
//             readOnly
//             className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block font-medium mb-2">Permissions:</label>
//           <div className="flex flex-wrap gap-2">
//             {["Read", "Write", "Delete", "Update"].map((permission) => (
//               <label key={permission} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedPermissions.includes(permission)}
//                   onChange={() => handlePermissionChange(permission)}
//                 />
//                 <span>{permission}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {editingRole ? (
//           <button
//             onClick={handleUpdateRole}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//           >
//             Update Role
//           </button>
//         ) : (
//           <button
//             onClick={handleAddRole}
//             className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
//           >
//             Add Role
//           </button>
//         )}
//       </div>

//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-300">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-4 py-2 border">Role Name</th>
//               <th className="px-4 py-2 border">Employee ID</th>
//               <th className="px-4 py-2 border">Permissions</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rolesList.length > 0 ? (
//               rolesList.map((role, index) => (
//                 <tr key={index}>
//                   <td className="px-4 py-2 border">{role.name}</td>
//                   <td className="px-4 py-2 border">{role.employeeId}</td>
//                   <td className="px-4 py-2 border">{role.permissions.join(", ") || "No Permissions"}</td>
//                   <td className="px-4 py-2 border text-center">
//                     <button
//                       onClick={() => handleDeleteRole(role.employeeId)}
//                       className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() => handleEditRole(role)}
//                       className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-2"
//                     >
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center py-4">No roles found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default RoleManagement;


// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// // Array to store role data
// let roles = [];  // Global array for storing role data

// // Function to add a new role
// const addRole = (role) => {
//   const isDuplicate = roles.some(existingRole => existingRole.employeeId === role.employeeId);

//   if (isDuplicate) {
//     throw new Error("Role with the same Employee ID already exists.");
//   }

//   roles.push(role); // Add new role to the array
// };

// // Function to get all roles
// const getRoles = () => {
//   return roles; // Return the current list of roles
// };

// // Function to delete a role by Employee ID
// const deleteRole = (employeeId) => {
//   const initialLength = roles.length;
//   roles = roles.filter(role => role.employeeId !== employeeId); // Remove the role with the matching Employee ID
//   return roles.length < initialLength; // Return true if a role was deleted, false otherwise
// };

// // Function to update a role's details
// const editRole = (updatedRole) => {
//   const index = roles.findIndex(role => role.employeeId === updatedRole.employeeId);
//   if (index !== -1) {
//     roles[index] = updatedRole; // Update the role in the array
//     return true; // Return true if the role was updated successfully
//   }
//   return false; // Return false if the role was not found
// };

// const RoleManagement = () => {
//   const location = useLocation();
//   const user = location.state?.user || {};  // Get the user object passed from ListUser.jsx
//   const [rolesList, setRolesList] = useState(roles);  // Use the global roles array
//   const [newRole, setNewRole] = useState({
//     name: "",  // Default empty, will update with dropdown
//     permissions: [],
//     employeeId: user.id || "",  // Set default to user ID
//   });
//   const [selectedPermissions, setSelectedPermissions] = useState([]);
//   const [editingRole, setEditingRole] = useState(null); // For storing the role that is being edited
//   const [secKey, setSecKey] = useState("");  // SEC Key state
//   const [authenticated, setAuthenticated] = useState(false);  // To track if SEC key is validated
//   const navigate = useNavigate();

//   const { name, id } = user;
//   const roleOptions = ["Admin", "Manager", "Editor", "Viewer"];

//   // Function to handle SEC Key submission
//   const handleSecKeySubmit = () => {
//     const storedSecKey = import.meta.env.VITE_SEC_KEY;  // Get SEC Key from env variable

//     if (secKey === storedSecKey) {
//       setAuthenticated(true);  // Set authenticated to true if SEC key is correct
//       toast.success("Authenticated successfully!");
//     } else {
//       toast.error("Incorrect SEC Key. Please try again.");
//     }
//   };

//   if (!authenticated) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-gray-100">
//         <div className="bg-white p-6 rounded-lg shadow-md w-96">
//           <h2 className="text-lg font-semibold mb-4">Enter SEC Key</h2>
//           <input
//             type="password"
//             placeholder="Enter SEC Key"
//             value={secKey}
//             onChange={(e) => setSecKey(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md mb-4"
//           />
//           <div className="flex justify-end">
//             <button
//               onClick={handleSecKeySubmit}
//               className="px-4 py-2 bg-blue-500 text-white rounded-md"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const handleAddRole = () => {
//     // Log values for debugging
//     console.log("Role Name:", newRole.name);
//     console.log("Employee ID:", newRole.employeeId);

//     // Validation
//     if (!newRole.name || !newRole.employeeId) {
//       toast.error("Role name and Employee ID cannot be empty.");
//       return;
//     }

//     const newRoleData = { ...newRole, permissions: selectedPermissions };
//     try {
//       addRole(newRoleData);  // Add role to the roles array
//       setRolesList([...roles]);  // Update the state with the new roles list
//       setNewRole({ name: "", permissions: [], employeeId: "" });  // Reset form
//       setSelectedPermissions([]);
//       toast.success("Role added successfully!");
//     } catch (error) {
//       toast.error(error.message);  // Handle duplicate errors
//     }
//   };

//   const handlePermissionChange = (permission) => {
//     setSelectedPermissions((prevPermissions) =>
//       prevPermissions.includes(permission)
//         ? prevPermissions.filter((p) => p !== permission)
//         : [...prevPermissions, permission]
//     );
//   };

//   const handleDeleteRole = (employeeId) => {
//     const isDeleted = deleteRole(employeeId);
//     if (isDeleted) {
//       setRolesList([...roles]);  // Update the roles list after deletion
//       toast.success("Role deleted successfully!");
//     } else {
//       toast.error("Role not found!");
//     }
//   };

//   const handleEditRole = (role) => {
//     setEditingRole(role);  // Set the role to edit
//     setNewRole({
//       ...role,
//       permissions: role.permissions || [],
//     });
//     setSelectedPermissions(role.permissions || []);  // Pre-fill permissions
//   };

//   const handleUpdateRole = () => {
//     // Validation
//     if (!newRole.name || !newRole.employeeId) {
//       toast.error("Role name and Employee ID cannot be empty.");
//       return;
//     }

//     const updatedRoleData = { ...newRole, permissions: selectedPermissions };
//     const isUpdated = editRole(updatedRoleData);  // Update role in the global array

//     if (isUpdated) {
//       setRolesList([...roles]);  // Update the roles list after edit
//       setNewRole({ name: "", permissions: [], employeeId: "" });  // Reset form
//       setSelectedPermissions([]);
//       setEditingRole(null);  // Reset editing state
//       toast.success("Role updated successfully!");
//     } else {
//       toast.error("Role update failed!");
//     }
//   };

//   return (
//     <div className="w-full px-4">
//       <h2 className="mb-4 text-xl font-semibold text-center">Role Management</h2>

//       <div className="mb-6 p-4 border rounded-lg shadow-md">
//         <h3 className="text-lg font-semibold mb-4">
//           {editingRole ? `Edit Role for ${editingRole.name} (ID: ${editingRole.employeeId})` : `Assign Role for ${name} (ID: ${id})`}
//         </h3>

//         <div className="mb-4">
//           <label className="block font-medium mb-2">Role Name:</label>
//           <select
//             value={newRole.name}
//             onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">Select Role</option>
//             {roleOptions.map((role) => (
//               <option key={role} value={role}>
//                 {role}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block font-medium mb-2">Employee ID:</label>
//           <input
//             type="text"
//             value={newRole.employeeId || id}
//             readOnly
//             className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block font-medium mb-2">Permissions:</label>
//           <div className="flex flex-wrap gap-2">
//             {["Read", "Write", "Delete", "Update"].map((permission) => (
//               <label key={permission} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedPermissions.includes(permission)}
//                   onChange={() => handlePermissionChange(permission)}
//                 />
//                 <span>{permission}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {editingRole ? (
//           <button
//             onClick={handleUpdateRole}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//           >
//             Update Role
//           </button>
//         ) : (
//           <button
//             onClick={handleAddRole}
//             className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
//           >
//             Add Role
//           </button>
//         )}
//       </div>

//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-300">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-4 py-2 border">Role Name</th>
//               <th className="px-4 py-2 border">Employee ID</th>
//               <th className="px-4 py-2 border">Permissions</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rolesList.length > 0 ? (
//               rolesList.map((role, index) => (
//                 <tr key={index}>
//                   <td className="px-4 py-2 border">{role.name}</td>
//                   <td className="px-4 py-2 border">{role.employeeId}</td>
//                   <td className="px-4 py-2 border">{role.permissions.join(", ") || "No Permissions"}</td>
//                   <td className="px-4 py-2 border text-center">
//                     <button
//                       onClick={() => handleDeleteRole(role.employeeId)}
//                       className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() => handleEditRole(role)}
//                       className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-2"
//                     >
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center py-4">No roles found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default RoleManagement;

// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// // Array to store role data
// let roles = [];  // Global array for storing role data

// // Function to add a new role
// const addRole = (role) => {
//   const isDuplicate = roles.some(existingRole => existingRole.employeeId === role.employeeId);

//   if (isDuplicate) {
//     throw new Error("Role with the same Employee ID already exists.");
//   }

//   roles.push(role); // Add new role to the array
// };

// // Function to get all roles
// const getRoles = () => {
//   return roles; // Return the current list of roles
// };

// // Function to delete a role by Employee ID
// const deleteRole = (employeeId) => {
//   const initialLength = roles.length;
//   roles = roles.filter(role => role.employeeId !== employeeId); // Remove the role with the matching Employee ID
//   return roles.length < initialLength; // Return true if a role was deleted, false otherwise
// };

// // Function to update a role's details
// const editRole = (updatedRole) => {
//   const index = roles.findIndex(role => role.employeeId === updatedRole.employeeId);
//   if (index !== -1) {
//     roles[index] = updatedRole; // Update the role in the array
//     return true; // Return true if the role was updated successfully
//   }
//   return false; // Return false if the role was not found
// };

// const RoleManagement = () => {
//   const location = useLocation();
//   const user = location.state?.user || {};  // Get the user object passed from ListUser.jsx
//   const [rolesList, setRolesList] = useState(roles);  // Use the global roles array
//   const [newRole, setNewRole] = useState({
//     name: "",  // Default empty, will update with dropdown
//     permissions: [],
//     employeeId: user.id || "",  // Set default to user ID
//   });
//   const [selectedPermissions, setSelectedPermissions] = useState([]);
//   const [editingRole, setEditingRole] = useState(null); // For storing the role that is being edited
//   const [secKey, setSecKey] = useState("");  // SEC Key state
//   const [authenticated, setAuthenticated] = useState(false);  // To track if SEC key is validated
//   const navigate = useNavigate();

//   const { name, id } = user;
//   const roleOptions = ["Admin", "Manager", "Editor", "Viewer"];

//   // Function to handle SEC Key submission
//   const handleSecKeySubmit = () => {
//     const storedSecKey = import.meta.env.VITE_SEC_KEY;  // Get SEC Key from env variable

//     if (secKey === storedSecKey) {
//       setAuthenticated(true);  // Set authenticated to true if SEC key is correct
//       toast.success("Authenticated successfully!");
//     } else {
//       toast.error("Incorrect SEC Key. Please try again.");
//     }
//   };

//   if (!authenticated) {
//     return (
//         <div className="flex justify-center items-start min-h-screen bg-gray-100">
//         <div className="bg-white p-6 rounded-lg shadow-md w-96 sm:h-52 md:h-52 lg:h-auto mt-16">
//           <h2 className="text-lg font-semibold mb-4">Enter SEC Key</h2>
//           <input
//             type="password"
//             placeholder="Enter SEC Key"
//             value={secKey}
//             onChange={(e) => setSecKey(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md mb-4"
//           />
//           <div className="flex justify-end">
//             <button
//               onClick={handleSecKeySubmit}
//               className="px-4 py-2 bg-black text-white rounded-md"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
      
//     );
//   }

//   const handleAddRole = () => {
//     // Log values for debugging
//     console.log("Role Name:", newRole.name);
//     console.log("Employee ID:", newRole.employeeId);

//     // Validation
//     if (!newRole.name || !newRole.employeeId) {
//       toast.error("Role name and Employee ID cannot be empty.");
//       return;
//     }

//     const newRoleData = { ...newRole, permissions: selectedPermissions };
//     try {
//       addRole(newRoleData);  // Add role to the roles array
//       setRolesList([...roles]);  // Update the state with the new roles list
//       setNewRole({ name: "", permissions: [], employeeId: "" });  // Reset form
//       setSelectedPermissions([]);
//       toast.success("Role added successfully!");
//     } catch (error) {
//       toast.error(error.message);  // Handle duplicate errors
//     }
//   };

//   const handlePermissionChange = (permission) => {
//     setSelectedPermissions((prevPermissions) =>
//       prevPermissions.includes(permission)
//         ? prevPermissions.filter((p) => p !== permission)
//         : [...prevPermissions, permission]
//     );
//   };

//   const handleDeleteRole = (employeeId) => {
//     const isDeleted = deleteRole(employeeId);
//     if (isDeleted) {
//       setRolesList([...roles]);  // Update the roles list after deletion
//       toast.success("Role deleted successfully!");
//     } else {
//       toast.error("Role not found!");
//     }
//   };

//   const handleEditRole = (role) => {
//     setEditingRole(role);  // Set the role to edit
//     setNewRole({
//       ...role,
//       permissions: role.permissions || [],
//     });
//     setSelectedPermissions(role.permissions || []);  // Pre-fill permissions
//   };

//   const handleUpdateRole = () => {
//     // Validation
//     if (!newRole.name || !newRole.employeeId) {
//       toast.error("Role name and Employee ID cannot be empty.");
//       return;
//     }

//     const updatedRoleData = { ...newRole, permissions: selectedPermissions };
//     const isUpdated = editRole(updatedRoleData);  // Update role in the global array

//     if (isUpdated) {
//       setRolesList([...roles]);  // Update the roles list after edit
//       setNewRole({ name: "", permissions: [], employeeId: "" });  // Reset form
//       setSelectedPermissions([]);
//       setEditingRole(null);  // Reset editing state
//       toast.success("Role updated successfully!");
//     } else {
//       toast.error("Role update failed!");
//     }
//   };

//   return (
//     <div className="w-full px-4 py-6">
//       <h2 className="mb-4 text-xl font-semibold text-center">Role Management</h2>

//       <div className="mb-6 p-4 border rounded-lg shadow-md bg-white">
//         <h3 className="text-lg font-semibold mb-4">
//           {editingRole ? `Edit Role for ${editingRole.name} (ID: ${editingRole.employeeId})` : `Assign Role for ${name} (ID: ${id})`}
//         </h3>

//         <div className="mb-4">
//           <label className="block font-medium mb-2">Role Name:</label>
//           <select
//             value={newRole.name}
//             onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">Select Role</option>
//             {roleOptions.map((role) => (
//               <option key={role} value={role}>
//                 {role}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block font-medium mb-2">Employee ID:</label>
//           <input
//             type="text"
//             value={newRole.employeeId || id}
//             readOnly
//             className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block font-medium mb-2">Permissions:</label>
//           <div className="flex flex-wrap gap-2">
//             {["Read", "Write", "Delete", "Update"].map((permission) => (
//               <label key={permission} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedPermissions.includes(permission)}
//                   onChange={() => handlePermissionChange(permission)}
//                   className="text-blue-500"
//                 />
//                 <span>{permission}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {editingRole ? (
//           <button
//             onClick={handleUpdateRole}
//             className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-600 transition w-full sm:w-auto"
//           >
//             Update Role
//           </button>
//         ) : (
//           <button
//             onClick={handleAddRole}
//             className="px-4 py-2 bg-black text-white rounded-md hover:bg-green-600 transition w-full sm:w-auto"
//           >
//             Add Role
//           </button>
//         )}
//       </div>

//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-300">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-4 py-2 border">Role Name</th>
//               <th className="px-4 py-2 border">Employee ID</th>
//               <th className="px-4 py-2 border">Permissions</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rolesList.length > 0 ? (
//               rolesList.map((role, index) => (
//                 <tr key={index}>
//                   <td className="px-4 py-2 border">{role.name}</td>
//                   <td className="px-4 py-2 border">{role.employeeId}</td>
//                   <td className="px-4 py-2 border">{role.permissions.join(", ") || "No Permissions"}</td>
//                   <td className="px-4 py-2 border text-center">
//                     <button
//                       onClick={() => handleDeleteRole(role.employeeId)}
//                       className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() => handleEditRole(role)}
//                       className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-2"
//                     >
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center py-4">No roles found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default RoleManagement;

// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// // Array to store role data
// let roles = [];  // Global array for storing role data

// // Function to add a new role
// const addRole = (role) => {
//   const isDuplicate = roles.some(existingRole => existingRole.employeeId === role.employeeId);

//   if (isDuplicate) {
//     throw new Error("Role with the same Employee ID already exists.");
//   }

//   roles.push(role); // Add new role to the array
// };

// // Function to get all roles
// const getRoles = () => {
//   return roles; // Return the current list of roles
// };

// // Function to delete a role by Employee ID
// const deleteRole = (employeeId) => {
//   const initialLength = roles.length;
//   roles = roles.filter(role => role.employeeId !== employeeId); // Remove the role with the matching Employee ID
//   return roles.length < initialLength; // Return true if a role was deleted, false otherwise
// };

// // Function to update a role's details
// const editRole = (updatedRole) => {
//   const index = roles.findIndex(role => role.employeeId === updatedRole.employeeId);
//   if (index !== -1) {
//     roles[index] = updatedRole; // Update the role in the array
//     return true; // Return true if the role was updated successfully
//   }
//   return false; // Return false if the role was not found
// };

// const RoleManagement = () => {
//   const location = useLocation();
//   const user = location.state?.user || {};  // Get the user object passed from ListUser.jsx
//   const [rolesList, setRolesList] = useState(roles);  // Use the global roles array
//   const [newRole, setNewRole] = useState({
//     name: "",  // Default empty, will update with dropdown
//     permissions: [],
//     employeeId: user.id || "",  // Set default to user ID
//   });
//   const [selectedPermissions, setSelectedPermissions] = useState([]);
//   const [editingRole, setEditingRole] = useState(null); // For storing the role that is being edited
//   const [secKey, setSecKey] = useState("");  // SEC Key state
//   const [authenticated, setAuthenticated] = useState(false);  // To track if SEC key is validated
//   const navigate = useNavigate();

//   const { name, id } = user;
//   const roleOptions = ["Admin", "Manager", "Editor", "Viewer"];

//   // Check if user ID is undefined and handle the error
//   useEffect(() => {
//     if (!user.id) {
//       toast.error("No employee found! Redirecting to the User List.");
//       setTimeout(() => {
//         navigate("/listUser");  // Adjust the path if needed
//       }, 3000);  // Wait for the toast notification to appear before navigating
//     }
//   }, [user.id, navigate]);

//   // Function to handle SEC Key submission
//   const handleSecKeySubmit = () => {
//     const storedSecKey = import.meta.env.VITE_SEC_KEY;  // Get SEC Key from env variable

//     if (secKey === storedSecKey) {
//       setAuthenticated(true);  // Set authenticated to true if SEC key is correct
//       toast.success("Authenticated successfully!");
//     } else {
//       toast.error("Incorrect SEC Key. Please try again.");
//     }
//   };

//   if (!authenticated) {
//     return (
//       <div className="flex justify-center items-start min-h-screen bg-gray-100">
//         <div className="bg-white p-6 rounded-lg shadow-md w-96 sm:h-52 md:h-52 lg:h-auto mt-16">
//           <h2 className="text-lg font-semibold mb-4">Enter SEC Key</h2>
//           <input
//             type="password"
//             placeholder="Enter SEC Key"
//             value={secKey}
//             onChange={(e) => setSecKey(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md mb-4"
//           />
//           <div className="flex justify-end">
//             <button
//               onClick={handleSecKeySubmit}
//               className="px-4 py-2 bg-black text-white rounded-md"
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const handleAddRole = () => {
//     // Log values for debugging
//     console.log("Role Name:", newRole.name);
//     console.log("Employee ID:", newRole.employeeId);

//     // Validation
//     if (!newRole.name || !newRole.employeeId) {
//       toast.error("Role name and Employee ID cannot be empty.");
//       return;
//     }

//     const newRoleData = { ...newRole, permissions: selectedPermissions };
//     try {
//       addRole(newRoleData);  // Add role to the roles array
//       setRolesList([...roles]);  // Update the state with the new roles list
//       setNewRole({ name: "", permissions: [], employeeId: "" });  // Reset form
//       setSelectedPermissions([]);
//       toast.success("Role added successfully!");
//     } catch (error) {
//       toast.error(error.message);  // Handle duplicate errors
//     }
//   };

//   const handlePermissionChange = (permission) => {
//     setSelectedPermissions((prevPermissions) =>
//       prevPermissions.includes(permission)
//         ? prevPermissions.filter((p) => p !== permission)
//         : [...prevPermissions, permission]
//     );
//   };

//   const handleDeleteRole = (employeeId) => {
//     const isDeleted = deleteRole(employeeId);
//     if (isDeleted) {
//       setRolesList([...roles]);  // Update the roles list after deletion
//       toast.success("Role deleted successfully!");
//     } else {
//       toast.error("Role not found!");
//     }
//   };

//   const handleEditRole = (role) => {
//     setEditingRole(role);  // Set the role to edit
//     setNewRole({
//       ...role,
//       permissions: role.permissions || [],
//     });
//     setSelectedPermissions(role.permissions || []);  // Pre-fill permissions
//   };

//   const handleUpdateRole = () => {
//     // Validation
//     if (!newRole.name || !newRole.employeeId) {
//       toast.error("Role name and Employee ID cannot be empty.");
//       return;
//     }

//     const updatedRoleData = { ...newRole, permissions: selectedPermissions };
//     const isUpdated = editRole(updatedRoleData);  // Update role in the global array

//     if (isUpdated) {
//       setRolesList([...roles]);  // Update the roles list after edit
//       setNewRole({ name: "", permissions: [], employeeId: "" });  // Reset form
//       setSelectedPermissions([]);
//       setEditingRole(null);  // Reset editing state
//       toast.success("Role updated successfully!");
//     } else {
//       toast.error("Role update failed!");
//     }
//   };

//   return (
//     <div className="w-full px-4 py-6">
//       <h2 className="mb-4 text-xl font-semibold text-center">Role Management</h2>

//       <div className="mb-6 p-4 border rounded-lg shadow-md bg-white">
//         <h3 className="text-lg font-semibold mb-4">
//           {editingRole ? `Edit Role for ${editingRole.name} (ID: ${editingRole.employeeId})` : `Assign Role for ${name} (ID: ${id})`}
//         </h3>

//         <div className="mb-4">
//           <label className="block font-medium mb-2">Role Name:</label>
//           <select
//             value={newRole.name}
//             onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           >
//             <option value="">Select Role</option>
//             {roleOptions.map((role) => (
//               <option key={role} value={role}>
//                 {role}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block font-medium mb-2">Employee ID:</label>
//           <input
//             type="text"
//             value={newRole.employeeId || id}
//             readOnly
//             className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block font-medium mb-2">Permissions:</label>
//           <div className="flex flex-wrap gap-2">
//             {["Read", "Write", "Delete", "Update"].map((permission) => (
//               <label key={permission} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedPermissions.includes(permission)}
//                   onChange={() => handlePermissionChange(permission)}
//                   className="text-blue-500"
//                 />
//                 <span>{permission}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {editingRole ? (
//           <button
//             onClick={handleUpdateRole}
//             className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-600 transition w-full sm:w-auto"
//           >
//             Update Role
//           </button>
//         ) : (
//           <button
//             onClick={handleAddRole}
//             className="px-4 py-2 bg-black text-white rounded-md hover:bg-green-600 transition w-full sm:w-auto"
//           >
//             Add Role
//           </button>
//         )}
//       </div>

//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-300">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="px-4 py-2 border">Role Name</th>
//               <th className="px-4 py-2 border">Employee ID</th>
//               <th className="px-4 py-2 border">Permissions</th>
//               <th className="px-4 py-2 border">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {rolesList.length > 0 ? (
//               rolesList.map((role, index) => (
//                 <tr key={index}>
//                   <td className="px-4 py-2 border">{role.name}</td>
//                   <td className="px-4 py-2 border">{role.employeeId}</td>
//                   <td className="px-4 py-2 border">{role.permissions.join(", ") || "No Permissions"}</td>
//                   <td className="px-4 py-2 border text-center">
//                     <button
//                       onClick={() => handleDeleteRole(role.employeeId)}
//                       className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                     <button
//                       onClick={() => handleEditRole(role)}
//                       className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-2"
//                     >
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="text-center py-4">No roles found</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default RoleManagement;



import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Array to store role data
let roles = [];  // Global array for storing role data

// Function to add a new role
const addRole = (role) => {
  const isDuplicate = roles.some(existingRole => existingRole.employeeId === role.employeeId);

  if (isDuplicate) {
    throw new Error("Role with the same Employee ID already exists.");
  }

  roles.push(role); // Add new role to the array
};

// Function to get all roles
const getRoles = () => {
  return roles; // Return the current list of roles
};

// Function to delete a role by Employee ID
const deleteRole = (employeeId) => {
  const initialLength = roles.length;
  roles = roles.filter(role => role.employeeId !== employeeId); // Remove the role with the matching Employee ID
  return roles.length < initialLength; // Return true if a role was deleted, false otherwise
};

// Function to update a role's details
const editRole = (updatedRole) => {
  const index = roles.findIndex(role => role.employeeId === updatedRole.employeeId);
  if (index !== -1) {
    roles[index] = updatedRole; // Update the role in the array
    return true; // Return true if the role was updated successfully
  }
  return false; // Return false if the role was not found
};

const RoleManagement = () => {
  const location = useLocation();
  const user = location.state?.user || {};  // Get the user object passed from ListUser.jsx
  const [rolesList, setRolesList] = useState(roles);  // Use the global roles array
  const [newRole, setNewRole] = useState({
    name: "",  // Default empty, will update with dropdown
    permissions: [],
    employeeId: user.id || "",  // Set default to user ID
  });
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [editingRole, setEditingRole] = useState(null); // For storing the role that is being edited
  const [secKey, setSecKey] = useState("");  // SEC Key state
  const [authenticated, setAuthenticated] = useState(false);  // To track if SEC key is validated
  const navigate = useNavigate();

  const { name, id } = user;
  const roleOptions = ["Admin", "Manager", "Editor", "Viewer"];

  // Function to handle SEC Key submission
  const handleSecKeySubmit = () => {
    const storedSecKey = import.meta.env.VITE_SEC_KEY;  // Get SEC Key from env variable

    if (secKey === storedSecKey) {
      setAuthenticated(true);  // Set authenticated to true if SEC key is correct
      toast.success("Authenticated successfully!");
    } else {
      toast.error("Incorrect SEC Key. Please try again.");
    }
  };

  // Check if user ID is undefined and handle the error after SEC key validation
  useEffect(() => {
    if (authenticated && !user.id) {
      toast.error("No employee found! Redirecting to the User List.");
      setTimeout(() => {
        navigate("/listUser");  // Adjust the path if needed
      }, 3000);  // Wait for the toast notification to appear before navigating
    }
  }, [authenticated, user.id, navigate]);

  if (!authenticated) {
    return (
      <div className="flex justify-center items-start min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-96 sm:h-52 md:h-52 lg:h-auto mt-16">
          <h2 className="text-lg font-semibold mb-4">Enter SEC Key</h2>
          <input
            type="password"
            placeholder="Enter SEC Key"
            value={secKey}
            onChange={(e) => setSecKey(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          <div className="flex justify-end">
            <button
              onClick={handleSecKeySubmit}
              className="px-4 py-2 bg-black text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAddRole = () => {
    // Log values for debugging
    console.log("Role Name:", newRole.name);
    console.log("Employee ID:", newRole.employeeId);

    // Validation
    if (!newRole.name || !newRole.employeeId) {
      toast.error("Role name and Employee ID cannot be empty.");
      return;
    }

    const newRoleData = { ...newRole, permissions: selectedPermissions };
    try {
      addRole(newRoleData);  // Add role to the roles array
      setRolesList([...roles]);  // Update the state with the new roles list
      setNewRole({ name: "", permissions: [], employeeId: "" });  // Reset form
      setSelectedPermissions([]);
      toast.success("Role added successfully!");
    } catch (error) {
      toast.error(error.message);  // Handle duplicate errors
    }
  };

  const handlePermissionChange = (permission) => {
    setSelectedPermissions((prevPermissions) =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter((p) => p !== permission)
        : [...prevPermissions, permission]
    );
  };

  const handleDeleteRole = (employeeId) => {
    const isDeleted = deleteRole(employeeId);
    if (isDeleted) {
      setRolesList([...roles]);  // Update the roles list after deletion
      toast.success("Role deleted successfully!");
    } else {
      toast.error("Role not found!");
    }
  };

  const handleEditRole = (role) => {
    setEditingRole(role);  // Set the role to edit
    setNewRole({
      ...role,
      permissions: role.permissions || [],
    });
    setSelectedPermissions(role.permissions || []);  // Pre-fill permissions
  };

  const handleUpdateRole = () => {
    // Validation
    if (!newRole.name || !newRole.employeeId) {
      toast.error("Role name and Employee ID cannot be empty.");
      return;
    }

    const updatedRoleData = { ...newRole, permissions: selectedPermissions };
    const isUpdated = editRole(updatedRoleData);  // Update role in the global array

    if (isUpdated) {
      setRolesList([...roles]);  // Update the roles list after edit
      setNewRole({ name: "", permissions: [], employeeId: "" });  // Reset form
      setSelectedPermissions([]);
      setEditingRole(null);  // Reset editing state
      toast.success("Role updated successfully!");
    } else {
      toast.error("Role update failed!");
    }
  };

  return (
    <div className="w-full px-4 py-6">
      <h2 className="mb-4 text-xl font-semibold text-center">Role Management</h2>

      <div className="mb-6 p-4 border rounded-lg shadow-md bg-white">
        <h3 className="text-lg font-semibold mb-4">
          {editingRole ? `Edit Role for ${editingRole.name} (ID: ${editingRole.employeeId})` : `Assign Role for ${name} (ID: ${id})`}
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
            value={newRole.employeeId || id}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Permissions:</label>
          <div className="flex flex-wrap gap-2">
            {["Read", "Write", "Delete", "Update"].map((permission) => (
              <label key={permission} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedPermissions.includes(permission)}
                  onChange={() => handlePermissionChange(permission)}
                  className="text-blue-500"
                />
                <span>{permission}</span>
              </label>
            ))}
          </div>
        </div>

        {editingRole ? (
          <button
            onClick={handleUpdateRole}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-blue-600 transition w-full sm:w-auto"
          >
            Update Role
          </button>
        ) : (
          <button
            onClick={handleAddRole}
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-green-600 transition w-full sm:w-auto"
          >
            Add Role
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">Role Name</th>
              <th className="px-4 py-2 border">Employee ID</th>
              <th className="px-4 py-2 border">Permissions</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rolesList.length > 0 ? (
              rolesList.map((role, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{role.name}</td>
                  <td className="px-4 py-2 border">{role.employeeId}</td>
                  <td className="px-4 py-2 border">{role.permissions.join(", ") || "No Permissions"}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleDeleteRole(role.employeeId)}
                      className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEditRole(role)}
                      className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-2"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">No roles found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoleManagement;
