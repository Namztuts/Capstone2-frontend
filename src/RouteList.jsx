import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductPage from './pages/ProductPage';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Categories from './pages/Categories';
import OrderReceipt from './pages/OrderReceipt';
import Unauthorized from './pages/Unauthorized';

function App() {
   return (
      <>
         <NavBar />
         <Routes>
            <Route
               path="/"
               element={<Home />}
            />
            <Route
               path="/login"
               element={<Login />}
            />
            <Route
               path="/register"
               element={<Register />}
            />
            <Route
               path="/products"
               element={<ProductPage />}
            />
            <Route
               path="/products/:id"
               element={<ProductDetail />}
            />
            <Route
               path="/categories/:id/products"
               element={<Categories />}
            />
            <Route
               path="/profile/:username"
               element={<Profile />}
            />
            <Route
               path="/cart"
               element={<Cart />}
            />
            <Route
               path="/checkout"
               element={<Checkout />}
            />
            <Route
               path="/checkout/receipt/:id"
               element={<OrderReceipt />}
            />

            {/* NOTE: 401 error page */}
            <Route
               path="/unauthorized"
               element={<Unauthorized />}
            />
         </Routes>
      </>
   );
}

export default App;
