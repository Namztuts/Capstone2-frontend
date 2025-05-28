import { useUser } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
   const navigate = useNavigate();
   const { user } = useUser();

   return (
      <div className="Home">
         <h1>Anything & Everything</h1>
         <img
            src="/logo4.png"
            alt="A&E Logo"
            className="Home-image"
         />
         <p className="Home-tagline">
            Your one-stop shop for anything & everything!
         </p>

         {user ? (
            <div>
               {/* Welcome message for logged-in users */}
               <h2>Welcome back, {user.firstName}!</h2>
               <p className="Home-products">
                  Browse our products <Link to="/products">here</Link>.
               </p>
            </div>
         ) : (
            <div>
               <button onClick={() => navigate('/login')}>Log in</button>
               <button onClick={() => navigate('/register')}>Register</button>
            </div>
         )}
      </div>
   );
}

export default Home;
