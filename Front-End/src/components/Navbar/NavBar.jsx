import { useEffect, useState } from "react";
// import './navbar.scss'
import { Outlet, Link } from "react-router-dom";

const NavBar = () => {
  const [users, setUsers] = useState([]);

  const getAllUSER = async () => {

    try {
      const fetchUsers = await fetch("http://localhost:3000/user/all-users", {
        method: "GET",
        credentials: "include", // Include cookies in the request
      });

      if (!fetchUsers.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await fetchUsers.json();
      console.log("Fetched users:", data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };
  useEffect(() => {
    getAllUSER();
  }, []);

  return (
    <>
      <nav className="bg-blue-800 h-full w-[25%]">
        <div className="border-b   border-b-white-500 pb-10 ">
          <label
            htmlFor="user"
            className="block text-2xl ml-4 font-bold mt-5 text-white"
          >
            Chat app{" "}
          </label>
          <input
            type="text"
            id="user"
            name="user"
            className="block mt-4 user w-[90%] p-5  rounded-2xl      m-auto"
            placeholder="Search User"
          />
        </div>

        <ul className="bg-red-500"></ul>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
