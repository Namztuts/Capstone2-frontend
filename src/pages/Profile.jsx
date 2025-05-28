import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import '../styles/Profile.css';

function Profile() {
   const INITIAL_STATE = {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      isAdmin: '',
      password: '',
   };

   const navigate = useNavigate();
   const { user, setUser, error, setError, isLoading, logout, setToken } =
      useUser();
   const [formData, setFormData] = useState(INITIAL_STATE);
   const [successMsg, setSuccessMsg] = useState('');
   const [activeSection, setActiveSection] = useState('profile');

   //populating the form with existing user data
   useEffect(() => {
      if (user) {
         setFormData({
            username: user.username || '',
            email: user.email || '',
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            // isAdmin: user.isAdmin || '',
            password: '', // for editing, keep this blank unless changing
         });
      }
   }, [user]);

   // error dissapears after 3 seconds
   useEffect(() => {
      if (error || successMsg) {
         const timer = setTimeout(() => {
            setError(null);
            setSuccessMsg('');
         }, 3000);

         return () => clearTimeout(timer); // Clear timeout if component re-renders
      }
   }, [error, successMsg]);

   if (isLoading) return <p>Loading...</p>;
   if (!user) {
      return error && <div className="Profile-error-message">{error}</div>;
   }

   const handleChange = (event) => {
      const { name, value, type, checked } = event.target; //type and checked for our isAdmin boolean

      setFormData((data) => ({
         ...data,
         [name]: type === 'checkbox' ? checked : value,
      }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      try {
         const updatedUser = await API.editUser(user.username, formData);

         if (updatedUser.token) {
            setToken(updatedUser.token); //this sets the new token and triggers user re-fetch
         } else {
            setError('No token provided.');
         }

         setUser(updatedUser);
         setSuccessMsg('Profile updated successfully!'); //TODO: clear message after a few seconds | and clear after successful login
         setError(null);
         setActiveSection('profile');
         navigate(`/profile/${updatedUser.username}`); //navigates to the updated page when edit is complete
      } catch (error) {
         setError('Failed to update profile.');
         setSuccessMsg('');
         console.error('Error updating profile:', error);
      }
   };

   async function handleDelete() {
      try {
         const confirmed = window.confirm(
            'Are you sure you want to delete your account?'
         );
         if (!confirmed) return;
         console.log(confirmed);

         await API.deleteUser(user.username);
         logout();
         navigate('/');
      } catch (err) {
         console.error('Delete failed:', err);
         alert('Failed to delete account.');
      }
   }

   //to avoid hard-coding the same logic multiple times
   const sections = [
      { key: 'edit', label: 'Edit Profile' },
      { key: 'payment', label: 'Payment Info' },
      { key: 'shipping', label: 'Shipping Info' },
      { key: 'orders', label: 'Orders' },
      { key: 'delete', label: 'Delete Profile' },
   ];

   return (
      <div className="Profile-container">
         <h1>Your Profile</h1>

         <div className="Profile-centered-column">
            <div className="Profile-sidebar">
               <h2 onClick={() => setActiveSection('profile')}>
                  Profile Settings
               </h2>
               <ul>
                  {sections.map(({ key, label }) => (
                     <li
                        key={key}
                        onClick={() => setActiveSection(key)}
                        className={activeSection === key ? 'active' : ''}
                     >
                        {label}
                     </li>
                  ))}
               </ul>
            </div>

            <div className="Profile-main">
               {/* error message and success now won't show up at the same time */}
               {(error || successMsg) && (
                  <div
                     className={`alert-message ${error ? 'error' : 'success'}`}
                  >
                     {error || successMsg}
                  </div>
               )}

               {activeSection === 'profile' && (
                  <>
                     <h2>Profile</h2>
                     <p>Username: {user.username}</p>
                     <p>Email: {user.email}</p>
                     <p>First Name: {user.firstName}</p>
                     <p>Last Name: {user.lastName}</p>

                     {/* <p>Admin: {user.isAdmin ? 'Yes' : 'No'}</p> */}
                     <p>
                        Date Created:{' '}
                        {new Date(user.createdAt).toLocaleString()}
                     </p>
                     <button
                        className="Profile-edit"
                        onClick={() => setActiveSection('edit')}
                     >
                        Edit Profile
                     </button>
                  </>
               )}

               {activeSection === 'edit' && (
                  <>
                     <h2>Edit Profile</h2>
                     <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username</label>
                        <input
                           id="username"
                           name="username"
                           type="text"
                           value={formData.username}
                           onChange={handleChange}
                           required
                        />
                        <label htmlFor="email">Email</label>
                        <input
                           id="email"
                           name="email"
                           type="email"
                           value={formData.email}
                           onChange={handleChange}
                           required
                        />
                        <label htmlFor="firstName">First Name</label>
                        <input
                           id="firstName"
                           name="firstName"
                           type="text"
                           value={formData.firstName}
                           onChange={handleChange}
                           required
                        />
                        <label htmlFor="lastName">Last Name</label>
                        <input
                           id="lastName"
                           name="lastName"
                           type="text"
                           value={formData.lastName}
                           onChange={handleChange}
                           required
                        />
                        {/* <label htmlFor="isAdmin">Admin?</label>
                        <input
                           id="isAdmin"
                           name="isAdmin"
                           type="checkbox"
                           checked={formData.isAdmin}
                           onChange={handleChange}
                        /> */}
                        <label htmlFor="password">Confirm Password</label>
                        <input
                           id="password"
                           name="password"
                           type="password"
                           value={formData.password}
                           placeholder="To save changes, please confirm your password"
                           onChange={handleChange}
                           required
                        />
                        <button
                           type="submit"
                           className="Profile-submit"
                        >
                           Save Changes
                        </button>
                     </form>
                  </>
               )}

               {activeSection === 'payment' && (
                  <>
                     <h2>Payment Info</h2>
                     <p>Payment information coming soon...</p>
                  </>
               )}

               {activeSection === 'shipping' && (
                  <>
                     <h2>Shipping Info</h2>
                     <p>Shipping information coming soon...</p>
                  </>
               )}

               {activeSection === 'orders' && (
                  <>
                     <h2>Order History</h2>
                     <p>All your previous orders are here... soon...</p>
                  </>
               )}

               {activeSection === 'delete' && (
                  <>
                     <h2>Delete Profile</h2>
                     <p>Are you sure you want to delete your account?</p>
                     <button
                        className="Profile-delete"
                        onClick={handleDelete}
                     >
                        Delete Account
                     </button>
                  </>
               )}
            </div>
         </div>
      </div>
   );
}

export default Profile;
