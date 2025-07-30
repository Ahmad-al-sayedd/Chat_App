import { useEffect, useState } from "react";
// import './navbar.scss'
import { Outlet, Link, useNavigate } from "react-router-dom";
import userImg from "../../assets/images/user.avif";

const NavBar = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const local = localStorage.getItem("userId");

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
      const filtered = data.filter((user) => user._id !== local);
      setUsers(filtered);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };
  console.log("users", users);

  useEffect(() => {
    getAllUSER();
  }, []);

  const searchRes = users.filter((user) => {
    const { userName } = user;
    return userName.toLowerCase().startsWith(inputValue.toLowerCase().trim());
  });

  //Create Chat one 2 one

  const createOneToOneChat = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/user/chat`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to create or retrieve chat");
      }

      const chatData = await response.json();

      navigate(`/userChat/${chatData._id}`);

      // Navigate or update state as needed
    } catch (error) {
      console.log("Chat creation error:", error);
    }
  };

  return (
    <>
      <nav className="bg-blue-800 h-full w-[25%]">
        <div className="border-b   border-b-white-500 pb-10 ">
          <label
            htmlFor="user"
            className="block text-2xl ml-4 font-bold mt-5 text-white"
          >
            Chat app
          </label>
          <input
            type="text"
            id="user"
            name="user"
            className="block mt-4 user w-[90%] p-5  rounded-2xl      m-auto"
            placeholder="Search User"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        <ul>
          {inputValue && searchRes.length === 0 ? (
            <p className="text-white text-center mt-4">No users found</p>
          ) : (
            (inputValue ? searchRes : users).map((user, index) => (
              <Link onClick={() => createOneToOneChat(user._id)} key={index}>
                <div className=" items-center text-white text-xl font-bold space-x-10 border-y py-8 flex gap-14 mb-2 px-4">
                  <img
                    src={userImg}
                    alt="img"
                    loading="lazy"
                    className=" h-[90px] w-[90px] rounded-full  "
                  />
                  <li className="list-none">{user.userName}</li>
                </div>
              </Link>
            ))
          )}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;
