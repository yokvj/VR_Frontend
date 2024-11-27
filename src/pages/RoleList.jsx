
// import React, { useState } from "react";
// import { getRoles, deleteRole } from "../assets/objects.js"; // Import the getRoles and deleteRole functions

// const RoleList = () => {
//   const roles = getRoles(); // Get roles from object.js

//   // State to manage edited role and visibility of edit form
//   const [editingRole, setEditingRole] = useState(null);
//   const [roleName, setRoleName] = useState("");
//   const [permissions, setPermissions] = useState([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false); // State for modal visibility
//   const [roleToDelete, setRoleToDelete] = useState(null); // Role to delete

//   // Handle delete role
//   const handleDelete = (employeeId) => {
//     setShowDeleteModal(true);
//     setRoleToDelete(employeeId);
//   };

//   // Confirm delete
//   const confirmDelete = () => {
//     if (roleToDelete !== null) {
//       deleteRole(roleToDelete); // Call the delete function to remove the role
//     }
//     setShowDeleteModal(false); // Close the modal
//   };

//   // Cancel delete
//   const cancelDelete = () => {
//     setShowDeleteModal(false); // Close the modal without deleting
//   };

//   // Handle start editing a role
//   const handleEdit = (role) => {
//     setEditingRole(role.employeeId);
//     setRoleName(role.name);
//     setPermissions(role.permissions);
//   };

//   // Handle save edited role
//   const handleSave = (employeeId) => {
//     // Save changes (In this case, we directly modify the roles object)
//     const updatedRole = { ...roles.find(role => role.employeeId === employeeId), name: roleName, permissions };
    
//     // Update role data (you should have an update function in your object.js)
//     // For now, just simulate role update:
//     const index = roles.findIndex(role => role.employeeId === employeeId);
//     if (index !== -1) {
//       roles[index] = updatedRole;
//     }
    
//     setEditingRole(null); // Close the editing form
//   };

//   return (
//     <div className="w-full px-4 py-6">
//       <h2 className="mb-4 text-xl font-semibold text-center">Role List</h2>

//       <div className="mb-6 p-4 border rounded-lg shadow-md bg-white">
//         {roles.length === 0 ? (
//           <p>No roles available.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto border-collapse">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="px-4 py-2 border">Employee ID</th>
//                   <th className="px-4 py-2 border">Role Name</th>
//                   <th className="px-4 py-2 border">Permissions</th>
//                   <th className="px-4 py-2 border">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {roles.map((role, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="px-4 py-2 border">{role.employeeId}</td>
//                     <td className="px-4 py-2 border">
//                       {editingRole === role.employeeId ? (
//                         <input
//                           type="text"
//                           value={roleName}
//                           onChange={(e) => setRoleName(e.target.value)}
//                           className="w-full px-2 py-1 border rounded-md"
//                         />
//                       ) : (
//                         role.name
//                       )}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       {editingRole === role.employeeId ? (
//                         <div className="flex flex-wrap">
//                           {["View", "Edit", "Delete", "Approve"].map((permission) => (
//                             <label key={permission} className="mr-4">
//                               <input
//                                 type="checkbox"
//                                 checked={permissions.includes(permission)}
//                                 onChange={() => setPermissions(prev => 
//                                   permissions.includes(permission)
//                                     ? prev.filter(p => p !== permission)
//                                     : [...prev, permission]
//                                 )}
//                                 className="mr-2"
//                               />
//                               {permission}
//                             </label>
//                           ))}
//                         </div>
//                       ) : (
//                         role.permissions.join(", ")
//                       )}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       {editingRole === role.employeeId ? (
//                         <button
//                           onClick={() => handleSave(role.employeeId)}
//                           className="px-4 py-2 bg-green-500 text-white rounded-md mr-2"
//                         >
//                           Save
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => handleEdit(role)}
//                           className="px-4 py-2 bg-black text-white rounded-md mr-2"
//                         >
//                           Edit
//                         </button>
//                       )}
//                       <button
//                         onClick={() => handleDelete(role.employeeId)}
//                         className="px-4 py-2 bg-red-500 text-white rounded-md"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-96">
//             <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
//             <p>Are you sure you want to delete this role?</p>
//             <div className="mt-4 flex flex-col sm:flex-row justify-center sm:justify-between gap-4">
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 bg-black text-white rounded-md"
//               >
//                 Yes, Delete
//               </button>
//               <button
//                 onClick={cancelDelete}
//                 className="px-4 py-2 bg-gray-300 text-black rounded-md"
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

// export default RoleList;

// import React, { useState } from "react";
// import { getRoles, deleteRole } from "../assets/objects.js"; // Import the getRoles and deleteRole functions

// const RoleList = () => {
//   const roles = getRoles(); // Get roles from object.js

//   // State to manage edited role and visibility of edit form
//   const [editingRole, setEditingRole] = useState(null);
//   const [roleName, setRoleName] = useState("");
//   const [permissions, setPermissions] = useState([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false); // State for modal visibility
//   const [roleToDelete, setRoleToDelete] = useState(null); // Role to delete

//   // Role options for dropdown
//   const roleOptions = [
//     "Software Engineer", "QA Engineer", "DevOps Engineer", "System Administrator",
//     "Frontend Developer", "Backend Developer", "Full Stack Developer", "Database Administrator",
//     "Project Manager", "Product Owner", "UI/UX Designer", "Technical Writer"
//   ];

//   // Handle delete role
//   const handleDelete = (employeeId) => {
//     setShowDeleteModal(true);
//     setRoleToDelete(employeeId);
//   };

//   // Confirm delete
//   const confirmDelete = () => {
//     if (roleToDelete !== null) {
//       deleteRole(roleToDelete); // Call the delete function to remove the role
//     }
//     setShowDeleteModal(false); // Close the modal
//   };

//   // Cancel delete
//   const cancelDelete = () => {
//     setShowDeleteModal(false); // Close the modal without deleting
//   };

//   // Handle start editing a role
//   const handleEdit = (role) => {
//     setEditingRole(role.employeeId);
//     setRoleName(role.name);
//     setPermissions(role.permissions);
//   };

//   // Handle save edited role
//   const handleSave = (employeeId) => {
//     // Save changes (In this case, we directly modify the roles object)
//     const updatedRole = { ...roles.find(role => role.employeeId === employeeId), name: roleName, permissions };
    
//     // Update role data (you should have an update function in your object.js)
//     // For now, just simulate role update:
//     const index = roles.findIndex(role => role.employeeId === employeeId);
//     if (index !== -1) {
//       roles[index] = updatedRole;
//     }
    
//     setEditingRole(null); // Close the editing form
//   };

//   return (
//     <div className="w-full px-4 py-6">
//       <h2 className="mb-4 text-xl font-semibold text-center">Role List</h2>

//       <div className="mb-6 p-4 border rounded-lg shadow-md bg-white">
//         {roles.length === 0 ? (
//           <p>No roles available.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto border-collapse">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="px-4 py-2 border">Employee ID</th>
//                   <th className="px-4 py-2 border">Role Name</th>
//                   <th className="px-4 py-2 border">Permissions</th>
//                   <th className="px-4 py-2 border">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {roles.map((role, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="px-4 py-2 border">{role.employeeId}</td>
//                     <td className="px-4 py-2 border">
//                       {editingRole === role.employeeId ? (
//                         <select
//                           value={roleName}
//                           onChange={(e) => setRoleName(e.target.value)}
//                           className="w-full px-2 py-1 border rounded-md"
//                         >
//                           {roleOptions.map((option, idx) => (
//                             <option key={idx} value={option}>{option}</option>
//                           ))}
//                         </select>
//                       ) : (
//                         role.name
//                       )}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       {editingRole === role.employeeId ? (
//                         <div className="flex flex-wrap">
//                           {["View Code", "Commit Code", "Push Code", "Merge Code", "Deploy"].map((permission) => (
//                             <label key={permission} className="mr-4">
//                               <input
//                                 type="checkbox"
//                                 checked={permissions.includes(permission)}
//                                 onChange={() => setPermissions(prev => 
//                                   permissions.includes(permission)
//                                     ? prev.filter(p => p !== permission)
//                                     : [...prev, permission]
//                                 )}
//                                 className="mr-2"
//                               />
//                               {permission}
//                             </label>
//                           ))}
//                         </div>
//                       ) : (
//                         role.permissions.join(", ")
//                       )}
//                     </td>
//                     <td className="px-4 py-2 border">
//   {editingRole === role.employeeId ? (
//     <div className="flex justify-between items-center space-x-4">
//       <button
//         onClick={() => handleSave(role.employeeId)}
//         className="px-4 py-2 bg-green-500 text-white rounded-md"
//       >
//         Save
//       </button>
//       <button
//         onClick={() => handleDelete(role.employeeId)}
//         className="px-4 py-2 bg-red-500 text-white rounded-md"
//       >
//         Delete
//       </button>
//     </div>
//   ) : (
//     <button
//       onClick={() => handleEdit(role)}
//       className="px-4 py-2 bg-black text-white rounded-md mr-2"
//     >
//       Edit
//     </button>
//   )}
// </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-96">
//             <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
//             <p>Are you sure you want to delete this role?</p>
//             <div className="mt-4 flex flex-col sm:flex-row justify-center sm:justify-between gap-4">
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 bg-black text-white rounded-md"
//               >
//                 Yes, Delete
//               </button>
//               <button
//                 onClick={cancelDelete}
//                 className="px-4 py-2 bg-gray-300 text-black rounded-md"
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

// export default RoleList;




// import React, { useState } from "react";
// import { getRoles, deleteRole } from "../assets/objects.js"; // Import the getRoles and deleteRole functions

// const RoleList = () => {
//   const roles = getRoles(); // Get roles from object.js

//   // State to manage edited role and visibility of edit form
//   const [editingRole, setEditingRole] = useState(null);
//   const [roleName, setRoleName] = useState("");
//   const [permissions, setPermissions] = useState([]);
//   const [showDeleteModal, setShowDeleteModal] = useState(false); // State for modal visibility
//   const [roleToDelete, setRoleToDelete] = useState(null); // Role to delete

//   // Role options for dropdown
//   const roleOptions = [
//     "Software Engineer", "QA Engineer", "DevOps Engineer", "System Administrator",
//     "Frontend Developer", "Backend Developer", "Full Stack Developer", "Database Administrator",
//     "Project Manager", "Product Owner", "UI/UX Designer", "Technical Writer"
//   ];

//   // Handle delete role
//   const handleDelete = (employeeId) => {
//     setShowDeleteModal(true);
//     setRoleToDelete(employeeId);
//   };

//   // Confirm delete
//   const confirmDelete = () => {
//     if (roleToDelete !== null) {
//       deleteRole(roleToDelete); // Call the delete function to remove the role
//     }
//     setShowDeleteModal(false); // Close the modal
//   };

//   // Cancel delete
//   const cancelDelete = () => {
//     setShowDeleteModal(false); // Close the modal without deleting
//   };

//   // Handle start editing a role
//   const handleEdit = (role) => {
//     setEditingRole(role.employeeId);
//     setRoleName(role.name);
//     setPermissions(role.permissions);
//   };

//   // Handle save edited role
//   const handleSave = (employeeId) => {
//     // Save changes (In this case, we directly modify the roles object)
//     const updatedRole = { ...roles.find(role => role.employeeId === employeeId), name: roleName, permissions };
    
//     // Update role data (you should have an update function in your object.js)
//     // For now, just simulate role update:
//     const index = roles.findIndex(role => role.employeeId === employeeId);
//     if (index !== -1) {
//       roles[index] = updatedRole;
//     }
    
//     setEditingRole(null); // Close the editing form
//   };

//   return (
//     <div className="w-full px-4 py-6">
//       <h2 className="mb-4 text-xl font-semibold text-center">Role List</h2>

//       <div className="mb-6 p-4 border rounded-lg shadow-md bg-white">
//         {roles.length === 0 ? (
//           <p>No roles available.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto border-collapse">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="px-4 py-2 border">Employee ID</th>
//                   <th className="px-4 py-2 border">Role Name</th>
//                   <th className="px-4 py-2 border">Permissions</th>
//                   <th className="px-4 py-2 border">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {roles.map((role, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="px-4 py-2 border">{role.employeeId}</td>
//                     <td className="px-4 py-2 border">
//                       {editingRole === role.employeeId ? (
//                         <select
//                           value={roleName}
//                           onChange={(e) => setRoleName(e.target.value)}
//                           className="w-full px-2 py-1 border rounded-md"
//                         >
//                           {roleOptions.map((option, idx) => (
//                             <option key={idx} value={option}>{option}</option>
//                           ))}
//                         </select>
//                       ) : (
//                         role.name
//                       )}
//                     </td>
//                     <td className="px-4 py-2 border">
//                       {editingRole === role.employeeId ? (
//                         <div className="flex flex-wrap">
//                           {["View Code", "Commit Code", "Push Code", "Merge Code", "Deploy"].map((permission) => (
//                             <label key={permission} className="mr-4">
//                               <input
//                                 type="checkbox"
//                                 checked={permissions.includes(permission)}
//                                 onChange={() => setPermissions(prev => 
//                                   permissions.includes(permission)
//                                     ? prev.filter(p => p !== permission)
//                                     : [...prev, permission]
//                                 )}
//                                 className="mr-2"
//                               />
//                               {permission}
//                             </label>
//                           ))}
//                         </div>
//                       ) : (
//                         role.permissions.join(", ")
//                       )}
//                     </td>
//                     <td className="px-4 py-2 border">
//   {editingRole === role.employeeId ? (
//     <div className="flex flex-col sm:flex-row justify-between items-center space-x-4 space-y-4 sm:space-y-0">
//       <button
//         onClick={() => handleSave(role.employeeId)}
//         className="px-4 py-2 bg-green-500 text-white rounded-md w-full sm:w-auto"
//       >
//         Save
//       </button>
//       <button
//         onClick={() => handleDelete(role.employeeId)}
//         className="px-4 py-2 bg-red-500 text-white rounded-md w-full sm:w-auto"
//       >
//         Delete
//       </button>
//     </div>
//   ) : (
//     <button
//       onClick={() => handleEdit(role)}
//       className="px-4 py-2 bg-black text-white rounded-md mr-2 w-full sm:w-auto"
//     >
//       Edit
//     </button>
//   )}
// </td>

//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-96">
//             <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
//             <p>Are you sure you want to delete this role?</p>
//             <div className="mt-4 flex flex-col sm:flex-row justify-center sm:justify-between gap-4">
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 bg-black text-white rounded-md"
//               >
//                 Yes, Delete
//               </button>
//               <button
//                 onClick={cancelDelete}
//                 className="px-4 py-2 bg-gray-300 text-black rounded-md"
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

// export default RoleList;
import React, { useState } from "react";
import { getRoles, deleteRole } from "../assets/objects.js"; // Import the getRoles and deleteRole functions

const RoleList = () => {
  const roles = getRoles(); // Get roles from object.js

  const [editingRole, setEditingRole] = useState(null);
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  const roleOptions = [
    "Software Engineer", "QA Engineer", "DevOps Engineer", "System Administrator",
    "Frontend Developer", "Backend Developer", "Full Stack Developer", "Database Administrator",
    "Project Manager", "Product Owner", "UI/UX Designer", "Technical Writer"
  ];

  const handleDelete = (employeeId) => {
    setShowDeleteModal(true);
    setRoleToDelete(employeeId);
  };

  const confirmDelete = () => {
    if (roleToDelete !== null) {
      deleteRole(roleToDelete);
    }
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleEdit = (role) => {
    setEditingRole(role.employeeId);
    setRoleName(role.name);
    setPermissions(role.permissions);
  };

  const handleSave = (employeeId) => {
    const updatedRole = {
      ...roles.find((role) => role.employeeId === employeeId),
      name: roleName,
      permissions,
    };

    const index = roles.findIndex((role) => role.employeeId === employeeId);
    if (index !== -1) {
      roles[index] = updatedRole;
    }

    setEditingRole(null);
  };

  return (
    <div className="w-full px-4 py-6">
      <h2 className="mb-4 text-xl font-semibold text-center">Role List</h2>

      <div className="mb-6 p-4 border rounded-lg shadow-md bg-white">
        {roles.length === 0 ? (
          <p>No roles available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border">Employee ID</th>
                  <th className="px-4 py-2 border">Role Name</th>
                  <th className="px-4 py-2 border">Permissions</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{role.employeeId}</td>
                    <td className="px-4 py-2 border">
                      {editingRole === role.employeeId ? (
                        <select
                          value={roleName}
                          onChange={(e) => setRoleName(e.target.value)}
                          className="w-full px-2 py-1 border rounded-md"
                        >
                          {roleOptions.map((option, idx) => (
                            <option key={idx} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        role.name
                      )}
                    </td>
                    <td className="px-4 py-2 border">
                      {editingRole === role.employeeId ? (
                        <details>
                          <summary className="text-gray-500 cursor-pointer">
                            Edit Permissions
                          </summary>
                          <div className="flex flex-wrap gap-4 mt-2">
                            {[
                              "View Code",
                              "Commit Code",
                              "Push Code",
                              "Merge Code",
                              "Deploy",
                            ].map((permission) => (
                              <label
                                key={permission}
                                className="flex items-center"
                              >
                                <input
                                  type="checkbox"
                                  checked={permissions.includes(permission)}
                                  onChange={() =>
                                    setPermissions((prev) =>
                                      permissions.includes(permission)
                                        ? prev.filter((p) => p !== permission)
                                        : [...prev, permission]
                                    )
                                  }
                                  className="mr-2"
                                />
                                {permission}
                              </label>
                            ))}
                          </div>
                        </details>
                      ) : (
                        role.permissions.join(", ")
                      )}
                    </td>
                    <td className="px-4 py-2 border">
                      {editingRole === role.employeeId ? (
                        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                          <button
                            onClick={() => handleSave(role.employeeId)}
                            className="px-4 py-2 bg-green-500 text-white rounded-md"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => handleDelete(role.employeeId)}
                            className="px-4 py-2 bg-red-500 text-white rounded-md"
                          >
                            Delete
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEdit(role)}
                          className="px-4 py-2 bg-black text-white rounded-md"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this role?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleList;