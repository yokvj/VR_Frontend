import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const HomePage = () => {
  const [showMore, setShowMore] = useState(false); // State to track showing more boxes
  const navigate = useNavigate(); // Initialize the navigate function

  const handleTotalUsersClick = () => {
    navigate("/listUser"); // Navigate to the ListUser page
  };

  const RoleManagemnt = () => {
    navigate("/RoleManagement"); // Navigate to the ListUser page
  };

  const toggleShowMore = () => {
    setShowMore(!showMore); // Toggle between showing and hiding additional boxes
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-6 p-6">
      {/* Total Users Box */}
      <div
        className="w-full sm:w-[300px] h-[150px] rounded-lg shadow-lg flex items-center justify-center text-white text-center text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 cursor-pointer"
        onClick={handleTotalUsersClick} // Add onClick to navigate to ListUser
      >
       User Management
      </div>

      {/* Total Inactive Users Box */}
      <div onClick={RoleManagemnt} className="w-full sm:w-[300px] h-[150px] rounded-lg shadow-lg flex items-center justify-center text-white text-center text-lg font-semibold bg-gradient-to-r from-red-500 to-pink-500">
       Role Management
      </div>

      {/* Empty Box */}
      <div className="w-full sm:w-[300px] h-[150px] rounded-lg shadow-lg flex items-center justify-center text-white text-center text-lg font-semibold bg-gradient-to-r from-green-500 to-teal-500">
            Additional Box 1
          </div>

      {/* Down Arrow (Shows additional boxes when clicked) */}
      <div
        className="w-full sm:w-[300px] flex justify-center items-center cursor-pointer mt-4"
        onClick={toggleShowMore}
      >
        <div className="text-2xl text-gray-950">{showMore ? "↑" : "↓"}</div> {/* Arrow Toggle */}
      </div>

      {/* Additional Boxes (hidden by default, shown when showMore is true) */}
      {showMore && (
        <>
          {/* Additional Box 1 */}
          <div className="w-full sm:w-[300px] h-[150px] rounded-lg shadow-lg flex items-center justify-center text-white text-center text-lg font-semibold bg-gradient-to-r from-green-500 to-teal-500">
            Additional Box 1
          </div>

          {/* Additional Box 2 */}
          <div className="w-full sm:w-[300px] h-[150px] rounded-lg shadow-lg flex items-center justify-center text-white text-center text-lg font-semibold bg-gradient-to-r from-yellow-500 to-orange-500">
            Additional Box 2
          </div>

        
      
        </>
      )}
    </div>
  );
};

export default HomePage;
