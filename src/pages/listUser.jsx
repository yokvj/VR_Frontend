

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
//                   <td className="px-4 py-2 border">
//                     <button
//                       onClick={() => handleEdit(user)}
//                       className="w-full lg:w-auto px-2 py-1 bg-blue-500 text-white rounded-md mr-2"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(user.id)}
//                       className="w-full lg:w-auto px-2 py-1 bg-red-500 text-white rounded-md"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="px-4 py-2 border text-center">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-md shadow-md max-w-sm mx-auto">
//             <h3 className="text-lg font-semibold mb-2">Enter Security Key</h3>
//             <input
//               type="password"
//               value={secKey}
//               onChange={(e) => setSecKey(e.target.value)}
//               className="w-full p-2 border rounded mb-4"
//             />
//             <div className="flex justify-end">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSecKeySubmit}
//                 className="bg-green-500 text-white px-4 py-2 rounded"
//               >
//                 Confirm
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
import { getUsers, deleteUser, editUser } from "../assets/objects";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editableUser, setEditableUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "", status: "" });
  const [secKey, setSecKey] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [userToDelete, setUserToDelete] = useState(null);
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

  const handleEdit = (user) => {
    setEditableUser(user);
    setFormData({ ...user });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

  const handleCancelEdit = () => {
    setEditableUser(null);
  };

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
              <th className="px-4 py-2 border">Contact Number</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
              <th className="px-4 py-2 border">Assign Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{user.id}</td>
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.contactNumber}</td>
                  <td className="px-4 py-2 border">{user.role}</td>
                  <td className="px-4 py-2 border">
                    <select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.id, e.target.value)}
                      className={`px-2 py-1 border rounded-md ${getStatusClass(user.status)}`}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleEdit(user)}
                      className="w-full lg:w-auto px-1 py-0 bg-blue-500 text-white rounded-md mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="w-full lg:w-auto px-1 py-0 bg-red-500 text-white rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleAssignRole(user)}
                      className="w-full lg:w-auto px-2 py-1 bg-black text-white rounded-md"
                    >
                      Assign Role
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-2 border text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded shadow-md w-96">
            <h2 className="text-lg font-semibold mb-4">Enter SEC Key</h2>
            <input
              type="password"
              value={secKey}
              onChange={(e) => setSecKey(e.target.value)}
              placeholder="Enter SEC key"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={handleSecKeySubmit}
                className="px-4 py-2 bg-black text-white rounded-md mr-2"
              >
                Submit
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
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

export default ListUser;
