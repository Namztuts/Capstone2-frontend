import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import '../styles/Checkout.css';

function Checkout() {
   const { cartItems, totalPrice, handlePlaceOrder } = useCart();
   const { setIsLoading, isLoading } = useUser();
   const navigate = useNavigate();

   //NOTE: i want the receipt to look like a traditional physical reciept
   return (
      <div className="Checkout">
         <div className="Checkout-main">
            <div className="Checkout-header">
               <h1>Checkout</h1>
               <p>Just one more step to complete your order!</p>
            </div>

            <ul className="Checkout-items">
               {cartItems.map((item) => (
                  <li
                     key={item.cart_item_id}
                     className="Checkout-item"
                  >
                     <div className="Checkout-item-details">
                        <strong>{item.name}</strong>
                        <p>
                           ${item.price} x {item.quantity}
                        </p>
                     </div>
                  </li>
               ))}
            </ul>

            <h3>Total: ${totalPrice.toFixed(2)}</h3>

            <div className="Checkout-buttons">
               <button
                  className="Checkout-edit"
                  onClick={() => navigate('/cart')}
               >
                  Edit Cart
               </button>
               <button
                  className="Checkout-order"
                  onClick={handlePlaceOrder}
                  disabled={isLoading}
               >
                  {isLoading ? 'Placing Order...' : 'Place Your Order'}
               </button>
            </div>
         </div>
      </div>
   );
}

export default Checkout;
