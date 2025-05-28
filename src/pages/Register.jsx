import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';
import '../styles/Register.css';

function Register() {
   const INITIAL_STATE = {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
   };
   const navigate = useNavigate();
   const { login, error, setError } = useUser();
   // const [error, setError] = useState(null);
   const [formData, setFormData] = useState(INITIAL_STATE); //initial state for our Register form

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
         const token = await API.registerUser(formData); //call API to register the user with the provided form data

         login(token);
         navigate('/'); //navigate to home page
      } catch (error) {
         setError(error);
         console.error('Error during signup:', error);
      }
   }

   return (
      <div className="Register">
         <div className="Register-box">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
               <div className="Register-form-group">
                  <label htmlFor="username">Username</label>
                  <input
                     id="username"
                     name="username"
                     type="text"
                     value={formData.username}
                     onChange={handleChange}
                     placeholder="Username"
                     autoComplete="username"
                     required
                  />
               </div>

               <div className="Register-form-group">
                  <label htmlFor="email">Email</label>
                  <input
                     id="email"
                     name="email"
                     type="email"
                     value={formData.email}
                     onChange={handleChange}
                     placeholder="Email"
                     autoComplete="email"
                     required
                  />
               </div>

               <div className="Register-form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                     id="firstName"
                     name="firstName"
                     type="text"
                     value={formData.firstName}
                     onChange={handleChange}
                     placeholder="First Name"
                     autoComplete="given-name"
                     required
                  />
               </div>

               <div className="Register-form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                     id="lastName"
                     name="lastName"
                     type="text"
                     value={formData.lastName}
                     onChange={handleChange}
                     placeholder="Last Name"
                     autoComplete="family-name"
                     required
                  />
               </div>

               <div className="Register-form-group">
                  <label htmlFor="password">Password</label>
                  <input
                     id="password"
                     name="password"
                     type="password"
                     value={formData.password}
                     onChange={handleChange}
                     placeholder="Password"
                     autoComplete="new-password"
                     required
                  />
               </div>

               {error && <div className="Register-error-message">{error}</div>}

               <button
                  type="submit"
                  className="Register-button"
               >
                  Register
               </button>
            </form>

            <p className="Register-login">
               Already have an account? <Link to="/login">Login here.</Link>
            </p>
         </div>
      </div>
   );
}

export default Register;
