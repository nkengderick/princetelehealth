import './profile.css';
import React, { useState } from 'react';
import { useUserContext } from '../../hooks/useUserContext';

const ProfileManagement = () => {
//   const [name, setName] = useState(user.name);
//   const [specialization, setSpecialization] = useState(user.specialization);
//   const [availability, setAvailability] = useState(user.availability || []);

//   // Check if user is null
//   if (!user) {
//     return <p>Loading...</p>; // You can customize this loading state as needed
//   }

//   setName(user.name)
//   setAvailability(user.availability)
//   setSpecialization(user.specialization)

//   const handleUpdateProfile = async () => {
//     try {
//       await updateUserInfo(user._id, { name, specialization, availability });
//       updateUser({ ...user, name, specialization, availability });
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   const handleAddAvailability = (newAvailability) => {
//     setAvailability([...availability, newAvailability]);
//   };

//   const handleRemoveAvailability = (index) => {
//     const updatedAvailability = [...availability];
//     updatedAvailability.splice(index, 1);
//     setAvailability(updatedAvailability);
//   };

//   return (
//     <div>
//       <h2>Profile Management</h2>
//       <div>
//         <label>Name:</label>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//       </div>
//       <div>
//         <label>Specialization:</label>
//         <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
//       </div>
//       <div>
//         <h3>Availability Hours:</h3>
//         {availability.map((time, index) => (
//           <div key={index}>
//             <span>{time}</span>
//             <button onClick={() => handleRemoveAvailability(index)}>Remove</button>
//           </div>
//         ))}
//         <div>
//           <input type="text" placeholder="Add availability" onChange={(e) => setAvailability(e.target.value)} />
//           <button onClick={() => handleAddAvailability(availability)}>Add</button>
//         </div>
//       </div>
//       <button onClick={handleUpdateProfile} disabled={isUpdating}>
//         Update Profile
//       </button>
//       {updateError && <p>Error updating profile: {updateError}</p>}
//     </div>
//   );
};

export default ProfileManagement;
