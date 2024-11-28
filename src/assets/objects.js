
let users = []; // Array to store user data


// Function to add a new user
export const AddUser = (user) => {
  // Check for duplicate ID, email, or contact number
  const isDuplicate = users.some(
    (existingUser) =>
      existingUser.id === user.id ||
      existingUser.email === user.email ||
      existingUser.contactNumber === user.contactNumber
  );

  if (isDuplicate) {
    throw new Error("User with the same ID, Email, or Contact Number already exists.");
  }

  users.push(user); // Add new user to the array
};

// Function to get all users
export const getUsers = () => {
  return users; // Return the current list of users
};

// Function to delete a user by ID
export const deleteUser = (userId) => {
  const initialLength = users.length;
  users = users.filter(user => user.id !== userId); // Remove the user with the matching ID
  return users.length < initialLength; // Return true if a user was deleted, false otherwise
};

// Function to update a user's details
export const editUser = (updatedUser) => {
  const index = users.findIndex(user => user.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser; // Update the user in the array
    return true; // Return true if the user was updated successfully
  }
  return false; // Return false if the user was not found
};





let roles = [];  // Array to store roles



const addRole = (role) => {
  const isDuplicate = roles.some((existingRole) => existingRole.employeeId === role.employeeId);
  if (isDuplicate) {
    throw new Error("Role with the same Employee ID already exists.");
  }

  // Update user status to assigned
  const user = users.find((u) => u.id === role.employeeId);
  if (user) {
    user.assigned = true; // Mark user as assigned
  }

  roles.push(role);
};

// Function to get all roles
const getRoles = () => {
  return roles;
};
// const deleteRole = (employeeId) => {
//   roles = roles.filter((role) => role.employeeId !== employeeId);
// };
const deleteRole = (employeeId) => {
  // Find the role to delete
  const roleToDelete = roles.find((role) => role.employeeId === employeeId);

  // If the role exists, update the user status
  if (roleToDelete) {
    // Update the assigned status of the user to false
    const user = users.find((u) => u.id === roleToDelete.employeeId);
    if (user) {
      user.assigned = false; // Mark user as unassigned
    }
    
    // Remove the role from the roles array
    roles = roles.filter((role) => role.employeeId !== employeeId);
  }
};


// Export the functions
export { addRole, getRoles, deleteRole };

