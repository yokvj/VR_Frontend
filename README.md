

Project Documentation: Role-Based Access Control (RBAC) UI
Project Overview
The Role-Based Access Control (RBAC) UI is a secure and efficient system for managing users, roles, and permissions. Built with React.js and Tailwind CSS, it ensures robust validation, security mechanisms, and seamless navigation. The system also incorporates JWT authentication for secure login and data handling.

Technologies Used
Frontend Framework: React.js
Styling: Tailwind CSS
Authentication: JWT (JSON Web Token)
Environment Variables:
VITE_SEC_KEY=1234
VITE_ADMIN_EMAIL="admin@gmail.com"
VITE_ADMIN_PASSWORD="12345"

Key Features
Authentication and Login
On the first launch, the project redirects to the Login Page.
Users must log in using:
Email: admin@gmail.com
Password: 12345

Upon successful login:
A JWT token is generated and stored in localStorage.
The user is redirected to the Homepage.

Validation:
All input fields must be filled.
Incorrect credentials display an error message.

User Management
Add User Page
Fields: User ID, Name, Email, Contact, Role, Status

Validation:
Prevents duplicate entries based on User ID and Email.
Ensures all fields are filled.

Navigation: Redirects to the User List Page upon successful user addition.
User List Page

Displays: All users in a tabular format.
Actions:
Edit: Opens a form with existing user data and a Save option.
Delete:
Prompts for the admin passcode (1234).
Upon successful passcode entry, deletes the user.

Assign Role:
Validates the admin passcode.
Redirects to the Role Management Page with user-specific data.

Role Management
Role Management Page
Functionality:

Select a role from a dropdown.
Assign permissions using checkboxes.
Validation:

Role name cannot be empty.
If User ID is missing, redirects to the User List Page.
Navigation: Redirects to the Homepage after role assignment.

Role Permission Management
Role List Page
Displays: All roles and their associated permissions.
Actions:
Modify: Update role details.
Delete: Remove roles.
User Flow
Login

Enter admin@gmail.com and 12345.
On success, store JWT in localStorage and navigate to Homepage.

Adding a User
Navigate to the Add User Page.
Enter user details (User ID, Name, Email, Contact, Role, Status).
Validate and click Add User → Redirects to User List Page.
Editing or Deleting a User

On the User List Page, click Edit or Delete.
For Delete, enter the admin passcode (1234).
Assigning Roles

Click Assign Role → Enter passcode.
Redirects to Role Management Page.
Assign role and permissions → Redirect to Homepage.
Managing Role Permissions

Navigate to the Role List Page.
Modify or delete roles.

Validation and Security
User Validation
Checks for duplicate entries based on User ID and Email.
Ensures all input fields are filled.

Passcode Security
Admin passcode (1234) is required for deleting users and assigning roles.
JWT Authentication
JWT token is stored in localStorage upon login for secure access control.

Navigation Overview
Page	Navigation
Login Page	Redirects to Homepage upon successful login.
Add User Page	Redirects to User List Page after successful addition.
User List Page	Options: Edit, Delete, Assign Role.
Role Management Page	Accessible after admin passcode validation, redirects to Homepage after role assignment.
Role List Page	Displays all roles, allows modifications or deletions.
