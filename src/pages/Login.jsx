import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';
import '../styles/Login.css';

function Login() {
   const navigate = useNavigate();
   const { login, error, setError } = useUser();
   const [formData, setFormData] = useState({ username: '', password: '' }); //initial state for our Login form

   //NOTE: add a 'name' attribute to each input | can view 'name' in event.target.name | name attribute will match exactly the key in the above object
   const handleChange = (event) => {
      // spreading the existing data, then updating the name (the specified input) with the value (what is being typed in the input)
      const { name, value } = event.target; //destructing and grabbing the event.target.name and event.target.value
      setFormData((data) => ({
         ...data,
         [name]: value,
      }));
   };

   async function handleSubmit(event) {
      event.preventDefault();
      try {
         //call API to authenticate the user with the provided username and password
         const { token } = await API.authenticateUser(
            formData.username,
            formData.password
         );

         login(token); //if auth is successful, login the user
         setError(null);
         navigate('/'); //navigate to user homepage
      } catch (error) {
         console.error('Login failed:', error);
         setError('Invalid username or password.');
      }
   }

   return (
      <div className="Login">
         <div className="Login-box">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
               <div className="Login-form-group">
                  <label htmlFor="username">Username</label>
                  <input
                     id="username"
                     name="username"
                     value={formData.username}
                     onChange={handleChange}
                     placeholder="Enter your username"
                     autoComplete="username"
                     required
                  />
               </div>

               <div className="Login-form-group">
                  <label htmlFor="password">Password</label>
                  <input
                     id="password"
                     name="password"
                     type="password"
                     value={formData.password}
                     onChange={handleChange}
                     placeholder="Enter your password"
                     autoComplete="current-password"
                     required
                  />
               </div>

               {error && <div className="Login-error-message">{error}</div>}

               <button
                  type="submit"
                  className="Login-button"
               >
                  Login
               </button>
            </form>

            <p className="Login-register">
               Don't have an account? <Link to="/register">Register here.</Link>
            </p>
         </div>
      </div>
   );
}

export default Login;
// onChange={(event) =>
//    setFormData({ ...formData, password: event.target.value })
// } NOTE: another way of doing the handleChange, but in line
