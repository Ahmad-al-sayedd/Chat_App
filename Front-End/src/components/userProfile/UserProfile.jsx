import React, { useEffect } from 'react'

const UserProfile = () => {

 const gettheUserData=()=>{

  const fetchUrl = fetch('http://localhost:3000/user/profile', {
    method: 'GET',
    credentials: 'include', // Include cookies in the request
  });
  fetchUrl.then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }).then(data => {
    console.log('User data:', data);
  }).catch(error => {
    console.error('Error fetching user data:', error);
  });
  
 }

 useEffect(() => {
  gettheUserData();
 
}, [])

  return (
    <div>
     <h1>here is profile user </h1>
    </div>
  )
}

export default UserProfile
 