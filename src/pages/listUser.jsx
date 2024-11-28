



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
        {/* <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">Filter by Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Manager">Manager</option>
        </select> */}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
         
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
                  {/* <td className="px-4 py-2 border">
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
                  </td> */}
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
