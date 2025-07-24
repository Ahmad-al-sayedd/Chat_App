import React, { useState } from "react";
import { useNavigate } from "react-router-dom";






const LoginAndRegister = () => {
  const [switchPage, setSwitchPage] = useState(false); // false = login, true = register
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  
  const navigate = useNavigate();

  const gettingData = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log("Data", formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fetchUrl = await fetch(
        `http://localhost:3000/user/${switchPage ? "register" : "login"}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            userName: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const response = await fetchUrl.json();
      console.log("Response from server:", response);

       if (fetchUrl.ok) {
        console.log("Form submitted successfully");
        // // Redirect or perform any other actions after successful submission
        localStorage.setItem('userId',response.user._id)
        navigate(`/profile/${response.token}`);
        }
    } catch (error) {
      console.log("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {switchPage ? "Register" : "Login"}
        </h2>

        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
          {switchPage && (
            <div>
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="username"
              >
                Username
              </label>
              <input
                value={formData.username}
                onChange={(e) => gettingData(e)}
                type="text"
                id="username"
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                name="username"
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              name="email"
              onChange={(e) => gettingData(e)}
            />
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              name="password"
              onChange={(e) => gettingData(e)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {switchPage ? "Register" : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          {switchPage ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-blue-600 hover:underline font-medium"
            onClick={() => setSwitchPage(!switchPage)}
          >
            {switchPage ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginAndRegister;
