import { useState, useEffect } from 'react';
import { CartContext } from './CartContext';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

function CartProvider({ children }) {
   const [cart, setCart] = useState([]);
   const [cartItems, setCartItems] = useState([]);
   const [totalItems, setTotalItems] = useState(0);
   const [totalPrice, setTotalPrice] = useState(0);
   const { setIsLoading, user } = useUser();
   const navigate = useNavigate();

   useEffect(() => {
      async function fetchCartAndItems() {
         setIsLoading(true);
         try {
            const cart = await API.getCart(user.username);
            const cart_items = await API.getCartItems(cart.id);
            setCart(cart.id);
            setCartItems(cart_items);

            localStorage.setItem('cart_id', cart.id); //add cart_id localStorage
         } catch (error) {
            console.error('No cart found:', error);
            setCart(null);
            setCartItems([]);
         } finally {
            setIsLoading(false);
         }
      }

      //only run once the user context has ran
      if (user && user.username) {
         fetchCartAndItems();
      }
   }, [user]);

   //Keep track of how many items and total price for items that are in the cart
   useEffect(() => {
      const totalQuantity = cartItems.reduce(
         (sum, item) => sum + item.quantity,
         0
      );
      const totalPrice = cartItems.reduce(
         (sum, item) => sum + item.price * item.quantity,
         0
      );
      setTotalItems(totalQuantity);
      setTotalPrice(totalPrice);
   }, [cartItems]);

   async function handleAddToCart(product, quantity) {
      if (cart) {
         const item = {
            cart_id: cart,
            product_id: product.id,
            quantity: quantity,
         };
         await API.addToCart(item);
      }

      //update cartItems after adding a new item
      const updatedCartItems = await API.getCartItems(cart);
      setCartItems(updatedCartItems);
   }

   async function handlePlaceOrder() {
      try {
         if (!cart || !user || !totalPrice || cartItems.length === 0) {
            alert('Missing cart, user, or cart is empty.');
            return;
         }

         setIsLoading(true);

         //create the order
         const orderPayload = {
            username: user.username,
            total: totalPrice,
         };

         const orderResponse = await API.createOrder(orderPayload);
         const orderID = orderResponse.order.id;

         //convert our cartItems into orderItems
         const orderItemsPayload = cartItems.map((item) => ({
            order_id: orderID,
            product_id: item.product_id,
            quantity: item.quantity,
            price_at_purchase: parseFloat(item.price), //convert to number
         }));

         await API.addToOrder(orderItemsPayload);

         //clear cart
         await API.clearCart(cart);
         setCartItems([]);

         //redirect to receipt
         navigate(`/checkout/receipt/${orderID}`);
      } catch (err) {
         console.error('Failed to place order:', err);
         alert('Something went wrong placing the order.');
      } finally {
         setIsLoading(false);
      }
   }
   //NOTE: disable checkout button while loading is true
   //NOTE: as soon as button is pressed, we create order | then we add all items to order

   return (
      <CartContext.Provider
         value={{
            cart,
            setCart,
            cartItems,
            setCartItems,
            totalItems,
            totalPrice,
            handleAddToCart,
            handlePlaceOrder,
         }}
      >
         {children}
      </CartContext.Provider>
   );
}

export default CartProvider;
