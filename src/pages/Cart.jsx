import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import CartItem from '../components/CartItem';
import '../styles/Cart.css';

function Cart() {
   const { cartItems, setCartItems } = useCart();
   const navigate = useNavigate();

   const handleIncrement = async (itemId) => {
      const item = cartItems.find((item) => item.cart_item_id === itemId);
      const newQuantity = item.quantity + 1;

      try {
         await API.updateCartItem(itemId, newQuantity);
         setCartItems((items) =>
            items.map((i) =>
               i.cart_item_id === itemId ? { ...i, quantity: newQuantity } : i
            )
         );
      } catch (err) {
         console.error('Failed to increment item:', err);
      }
   };

   const handleDecrement = async (itemId) => {
      const item = cartItems.find((item) => item.cart_item_id === itemId);
      if (item.quantity <= 1) return;

      const newQuantity = item.quantity - 1;

      try {
         await API.updateCartItem(itemId, newQuantity);
         setCartItems((items) =>
            items.map((i) =>
               i.cart_item_id === itemId ? { ...i, quantity: newQuantity } : i
            )
         );
      } catch (err) {
         console.error('Failed to decrement item:', err);
      }
   };

   const handleDelete = async (itemId) => {
      try {
         await API.deleteCartItem(itemId);
         setCartItems((items) =>
            items.filter((i) => i.cart_item_id !== itemId)
         );
      } catch (err) {
         console.error('Failed to delete item:', err);
      }
   };

   const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
   );

   return (
      <div className="Cart">
         <div className="Cart-main">
            <h1>Your Cart</h1>

            {cartItems.length === 0 ? (
               <p>Your cart is empty.</p>
            ) : (
               <>
                  <p>Please review your order for accuracy.</p>
                  <ul className="Cart-items">
                     {cartItems.map((item) => (
                        <CartItem
                           key={item.cart_item_id}
                           item={item}
                           onIncrement={handleIncrement}
                           onDecrement={handleDecrement}
                           onDelete={handleDelete}
                        />
                     ))}
                  </ul>

                  <h3>Total: ${total.toFixed(2)}</h3>

                  <button
                     className="Cart-proceed"
                     onClick={() => navigate('/checkout')}
                  >
                     Proceed to Checkout
                  </button>
               </>
            )}
         </div>
      </div>
   );
}

export default Cart;
