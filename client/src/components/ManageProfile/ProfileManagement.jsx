import './profile.css'

import React, { useState } from 'react';
import { useUserContext } from '../../hooks/useUserContext';
import { useUpdateUser } from '../../hooks/useUpdateUser'; // Assuming you have a hook for updating user details

const ProfileManagement = () => {
  const { user, updateUser } = useUserContext();
  const { updateUserInfo, isLoading: isUpdating, error: updateError } = useUpdateUser(); // Assume you have a hook for updating user details

  const [name, setName] = useState(user.name);
  const [specialization, setSpecialization] = useState(user.specialization);
  const [availability, setAvailability] = useState(user.availability || []);

  const handleUpdateProfile = async () => {
    try {
      // Make an API call to update the user's profile
      await updateUserInfo(user._id, { name, specialization, availability });
      
      // You can also update the local user context with the new information
      updateUser({ ...user, name, specialization, availability });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleAddAvailability = (newAvailability) => {
    setAvailability([...availability, newAvailability]);
  };

  const handleRemoveAvailability = (index) => {
    const updatedAvailability = [...availability];
    updatedAvailability.splice(index, 1);
    setAvailability(updatedAvailability);
  };

  return (
    <div>
      <h2>Profile Management</h2>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Specialization:</label>
        <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
      </div>
      <div>
        <h3>Availability Hours:</h3>
        {availability.map((time, index) => (
          <div key={index}>
            <span>{time}</span>
            <button onClick={() => handleRemoveAvailability(index)}>Remove</button>
          </div>
        ))}
        <div>
          <input type="text" placeholder="Add availability" onChange={(e) => setAvailability(e.target.value)} />
          <button onClick={() => handleAddAvailability(availability)}>Add</button>
        </div>
      </div>
      <button onClick={handleUpdateProfile} disabled={isUpdating}>
        Update Profile
      </button>
      {updateError && <p>Error updating profile: {updateError}</p>}
    </div>
  );
};

export default ProfileManagement;
