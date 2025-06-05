import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import CartProvider from './context/CartProvider';
import ToastProvider from './context/ToastProvider';
import CategoriesProvider from './context/CategoriesProvider';
import RouteList from './RouteList';
import './styles/App.css';

function App() {
   return (
      <BrowserRouter>
         <ToastProvider>
            <AuthProvider>
               <CartProvider>
                  <CategoriesProvider>
                     <RouteList />
                  </CategoriesProvider>
               </CartProvider>
            </AuthProvider>
         </ToastProvider>
      </BrowserRouter>
   );
}

export default App;
