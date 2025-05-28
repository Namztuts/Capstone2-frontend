import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useCategories } from '../context/CategoriesContext';
import '../styles/NavBar.css';

function NavBar() {
   const { user, logout } = useUser();
   const { setCart, totalItems } = useCart();
   const { categories } = useCategories();
   const navigate = useNavigate();

   const handleLogout = () => {
      setCart(null); //removes user cart from state
      localStorage.removeItem('cart_id'); //removes user cart from localstorage
      logout();
   };

   return (
      <header>
         <nav className="NavBar">
            <div className="NavBar-left">
               <Link to="/">
                  <img
                     src="/logo6.png"
                     alt="A&E Logo"
                     className="logo"
                  />
               </Link>
            </div>
            <div className="NavBar-right">
               {user ? (
                  <>
                     <button onClick={() => navigate('/products')}>
                        Products
                     </button>
                     <button onClick={() => navigate('/cart')}>
                        Cart {totalItems > 0 && `(${totalItems})`}
                     </button>
                     <button
                        onClick={() => navigate(`/profile/${user.username}`)}
                        className="NavBar-username"
                     >
                        {user.firstName} | Profile
                     </button>
                     <button
                        onClick={handleLogout}
                        className="NavBar-logout"
                     >
                        Logout
                     </button>
                  </>
               ) : (
                  <>
                     <button onClick={() => navigate('/login')}>Login</button>
                     <button onClick={() => navigate('/register')}>
                        Register
                     </button>
                  </>
               )}
            </div>
         </nav>

         {/* Categories */}
         <nav className="NavBar-categories">
            <Link to={`/products`}>All</Link>
            {categories.map((cat) => (
               <Link
                  key={cat.name}
                  to={`/categories/${cat.id}/products`}
               >
                  {cat.name}
               </Link>
            ))}
         </nav>
      </header>
   );
}

export default NavBar;
