import React, { useEffect, useState } from 'react';

const UserProfile = () => {
  const [name, setName] = useState('');

  const gettheUserData = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/profile', {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setName(data.userName); // ✅ Update state
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    gettheUserData();
  }, []);

  return (
    <div className=' flex  justify-center w-[75%]   items-center'>
      <h1 className="text-white bg-blue-700 p-10  z-20 rounded-xl px-28 text-2xl  ">{`Hi  ${name}`}</h1>
    </div>
  );
};

export default UserProfile;
