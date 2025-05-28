import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import CartProvider from './context/CartProvider';
import CategoriesProvider from './context/CategoriesProvider';
import RouteList from './RouteList';
import './styles/App.css';

function App() {
   return (
      <BrowserRouter>
         <AuthProvider>
            <CartProvider>
               <CategoriesProvider>
                  <RouteList />
               </CategoriesProvider>
            </CartProvider>
         </AuthProvider>
      </BrowserRouter>
   );
}

export default App;
