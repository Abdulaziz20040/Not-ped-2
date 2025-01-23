import React, { useState, useEffect } from "react";
import { Drawer, Popover, Modal, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import "./home.css";
import { PiSidebarSimple } from "react-icons/pi";
import { AiOutlineBars } from "react-icons/ai";

const ResponsiveMenu = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(localStorage.getItem("name") || "");
  const navigate = useNavigate();

  const [activ, setActiv] = useState(0);

  const handleActiv = (index) => {
    setActiv(index);
  };

  const menuItems = [
    "Javascript",
    "C++",
    "Html",
    "Bootstrap",
    "React",
    "Next.js",
    "Taypscript",
    "Barchasi",
    "C sharp",
    "Python",
    "Flutter",
    "Java",
    "Vue.js",
    "Angular",
    "Nuxt.js",
    "Node.js",
    "SQL",
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const name = localStorage.getItem("name");

  useEffect(() => {
    if (name === "ican") {
      fetch("https://c0adcbfd27d5ecc2.mokky.dev/user")
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.error("Error fetching user data:", err));
    }
  }, [name]);

  const handleProfileClick = () => {
    if (name === "ican") {
      setModalVisible(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
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
              localStorage.setItem("name", newName);
              setIsEditing(false);
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
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className="px-4 py-2 w-full text-left text-black hover:bg-teal-600 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );

  const handleEdit = (user) => {
    console.log("Editing user:", user);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="w-full flex items-center justify-between p-4 bg-[#00393F] text-white">
      {/* Notepad Logo */}
      <div className="text-lg font-bold flex-shrink-0 flex  items-center gap-2">
        <div className="flex items-center gap-2">
          <AiOutlineBars
            className="text-2xl cursor-pointer"
            onClick={handleDrawerToggle}
          />
        </div>
        <Link to={"/"}>CodePadUz </Link>
      </div>

      {/* Profile Button */}
      <div className="">
        <div className="flex items-center gap-2">
          <Popover
            content={profileMenu}
            trigger="click"
            placement="bottomRight"
          >
            <img
              onClick={handleProfileClick}
              className="w-10 h-10 rounded-full cursor-pointer"
              src="https://i.pinimg.com/736x/31/3c/b6/313cb6df031677742d01dc4449caf4d5.jpg"
              alt="profile"
            />
          </Popover>
        </div>
      </div>

      {/* Bars Icon for Small Screens */}

      {/* Drawer for Small Screens */}
      <Drawer
        title="CodePadUz Menu"
        placement="right"
        onClose={handleDrawerToggle}
        open={drawerOpen}
        className="lg:hidden"
        width={300}
        closable={true} // X ikonkasini yashirish uchun
      >
        <ul className="flex flex-col gap-4">
          {menuItems.map((item) => (
            <li key={item}>
              <NavLink
                to={`/${item.toLowerCase()}`}
                className="text-black px-3 py-2 rounded whitespace-nowrap"
                activeClassName="bg-teal-600 text-white" // Faol link uchun active klass
                onClick={handleDrawerToggle} // Link tanlanganda modalni yopish
              >
                {item}
              </NavLink>
            </li>
          ))}
        </ul>
      </Drawer>

      <Drawer
        title="User List"
        placement="right"
        onClose={handleCloseModal}
        open={modalVisible}
        width={600}
        style={{
          backgroundColor: "#00393ff3",
        }}
        bodyStyle={{
          borderRadius: "30px", // Burchaklar uchun border-radius
          overflow: "hidden", // Tarkibdan chiqmaslik uchun
        }}
        className="custom-modal" // Custom klass qo'shamiz
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
      </Drawer>
    </div>
  );
};

export default ResponsiveMenu;
