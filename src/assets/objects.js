
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

 // Array to store role data
 let roles = [];