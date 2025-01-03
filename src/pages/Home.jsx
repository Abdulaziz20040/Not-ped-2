import React, { useState, useEffect } from "react";
import { Drawer, Popover, Modal, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import "./home.css";

const ResponsiveMenu = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track if we are in editing mode
  const [newName, setNewName] = useState(localStorage.getItem("name") || ""); // The new name to edit
  const navigate = useNavigate(); // For navigation after logout

  const menuItems = [
    "javascript",
    "c++",
    "html",
    "bootstrap",
    "react",
    "nextjs",
    "taypscript",
    "barchasi",
    // "figma",
    // "projects",
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const name = localStorage.getItem("name");

  useEffect(() => {
    // Fetch users list if role is available and "admin"
    if (name === "ican") {
      fetch("https://c0adcbfd27d5ecc2.mokky.dev/user") // Assuming this is the API URL
        .then((res) => res.json())
        .then((data) => setUsers(data)) // Update state with user data
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, [name]);

  const handleProfileClick = () => {
    // Show the modal only if the name in localStorage is "ican"
    if (name === "ican") {
      setModalVisible(true); // Show the modal
    }
  };

  const handleLogout = () => {
    // Clear the relevant data from localStorage
    localStorage.removeItem("name");
    localStorage.removeItem("token"); // Remove any other user data stored in localStorage

    // Redirect to the login page
    navigate("/login");
  };

  const profileMenu = (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg">
      {isEditing ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="px-4 py-2 w-full text-black rounded"
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => {
              localStorage.setItem("name", newName); // Save to localStorage
              setIsEditing(false); // Exit edit mode
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <button className="px-4 py-2 w-full text-left text-black hover:bg-teal-600 rounded">
            {name}
          </button>
          <button
            className="px-4 py-2 w-full text-left text-black hover:bg-teal-600 rounded"
            onClick={() => setIsEditing(true)} // Enable edit mode
          >
            Edit
          </button>
          <button
            className="px-4 py-2 w-full text-left text-black hover:bg-teal-600 rounded"
            onClick={handleLogout} // Call logout function on click
          >
            Logout
          </button>
        </>
      )}
    </div>
  );

  const handleEdit = (user) => {
    // Handle the editing of user details
    console.log("Editing user:", user);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="w-full flex items-center justify-between p-4 bg-[#00393F] text-white">
      {/* Notepad Logo */}
      <div className="text-lg font-bold flex-shrink-0">
        <Link to={"/"}>Not ped</Link>
      </div>

      {/* Menu for Larger Screens */}
      <ul className="hidden lg:flex flex-1 justify-center gap-6 items-center overflow-x-auto scrollbar-hide">
        {menuItems.map((item) => (
          <li key={item}>
            <Link
              to={`/${item.toLowerCase()}`}
              className="text-white hover:bg-teal-600 px-3 py-2 rounded whitespace-nowrap"
            >
              {item}
            </Link>
          </li>
        ))}
        <li>
          <Link to="/cshap">C#</Link>
        </li>
      </ul>

      {/* Profile Button */}
      <div className="hidden lg:block">
        <div className="flex items-center gap-2">
          <img
            className="w-10 h-10 rounded-full"
            src="https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg"
            alt="profile"
          />
          <Popover
            content={profileMenu}
            trigger="click"
            placement="bottomRight" // Positioning the Popover below the icon and on the right
          >
            <HiDotsVertical
              className="text-[22px] cursor-pointer"
              onClick={handleProfileClick}
            />
          </Popover>
        </div>
      </div>

      {/* Bars Icon for Small Screens */}
      <div className="lg:hidden flex items-center gap-2">
        <MenuOutlined
          className="text-2xl cursor-pointer"
          onClick={handleDrawerToggle}
        />
      </div>

      {/* Drawer for Small Screens */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={handleDrawerToggle}
        open={drawerOpen}
        className="lg:hidden"
        width={300}
      >
        <ul className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <li key={item}>
              <Link
                to={`/${item.toLowerCase()}`}
                className="text-black hover:bg-teal-600 px-3 py-2 rounded whitespace-nowrap"
              >
                {item}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/cshap">C#</Link>
          </li>
          <li>
            <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500">
              Profile
            </button>
          </li>
        </ul>
      </Drawer>

      {/* Modal for User List */}
      <Modal
        title="User List"
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={600}
      >
        <div>
          <h3>{name}</h3>
          <ul className="mt-4">
            {users.length > 0 ? (
              users.map((user) => (
                <li
                  key={user.id}
                  className="py-2 flex justify-between items-center"
                >
                  <span>{user.name}</span>
                  <span>{user.phoneNumber}</span>
                  <span>{user.date}</span>
                  <Button onClick={() => handleEdit(user)}>Edit</Button>
                </li>
              ))
            ) : (
              <li>No users found</li>
            )}
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default ResponsiveMenu;
