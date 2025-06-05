import { useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

function AuthProvider({ children }) {
   const navigate = useNavigate();
   const [user, setUser] = useState(null);
   const [error, setError] = useState(null); //hold our errors to potentially reflect on the page
   const [isLoading, setIsLoading] = useState(true); //global loading state since it is used multiple times
   const [token, setToken] = useState(
      () => localStorage.getItem('token') || null
   );

   //NOTE: not removing the token from local storage when register is failed | is also calling getUser when failed
   useEffect(() => {
      function handleToken() {
         //set token and add to local storage
         if (token) {
            localStorage.setItem('token', token);
            API.token = token;
         } else {
            localStorage.removeItem('token');
            setUser(null);
         }
      }

      async function fetchUser() {
         //if there is no token, return
         if (!token) {
            setIsLoading(false);
            return;
         }

         setIsLoading(true);
         try {
            setIsLoading(true);

            const { username } = jwtDecode(token); //decode with jwt

            const { user } = await API.getUser(username);
            setUser(user);
            localStorage.setItem('username', username); //add to localStorage
         } catch (error) {
            //NOTE: testing the unauthorized page
            if (err.includes('Unauthorized')) {
               navigate('/unauthorized');
            }

            console.error('Invalid token:', error);
            setUser(null);
         } finally {
            setIsLoading(false);
         }
      }

      handleToken();
      fetchUser();
   }, [token]); //runs whenever token changes

   const login = (newToken, username) => {
      setToken(newToken); //add the token to state
   };

   const logout = () => {
      setToken(null); //clears the token
      setUser(null); //removes user from state
      localStorage.removeItem('token'); //removes token from localstorage
      localStorage.removeItem('username'); //removes user from localstorage
      navigate('/'); //navigate back to home page
   };

   return (
      <UserContext.Provider
         value={{
            user,
            setUser,
            token,
            isLoading,
            setIsLoading,
            login,
            logout,
            error,
            setError,
         }}
      >
         {children}
      </UserContext.Provider>
   );
}

export default AuthProvider;
