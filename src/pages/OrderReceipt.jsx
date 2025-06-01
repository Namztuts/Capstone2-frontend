import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import '../styles/OrderSummary.css';

function OrderSummary() {
   const { id } = useParams();
   const [order, setOrder] = useState(null);
   const [orderItems, setOrderItems] = useState([]);
   const { setIsLoading, isLoading } = useUser();

   useEffect(() => {
      async function getOrder() {
         setIsLoading(true); //loading while the data is being fetched and shown on page
         try {
            let response = await API.getOrder(id);
            setOrder(response);
         } catch (error) {
            console.error('Error fetching order:', error);
         } finally {
            setIsLoading(false); //finally runs regardless of wether try or catch succeed
         }
      }

      async function getOrderItems() {
         setIsLoading(true); //loading while the data is being fetched and shown on page
         try {
            let response = await API.getOrderItems(id);
            setOrderItems(Object.values(response));
         } catch (error) {
            console.error('Error fetching order items:', error);
         } finally {
            setIsLoading(false); //finally runs regardless of wether try or catch succeed
         }
      }

      getOrder();
      getOrderItems();
   }, []);

   if (isLoading || !order) return <p>Loading order summary...</p>;

   //TODO: also make it so the button is disabled upon clicking it

   return (
      <div className="OrderSummary">
         <h1 className="OrderSummary-title">Your Receipt</h1>
         <img
            src="/logo4.png"
            alt="A&E Logo"
            className="logo"
         />

         {/* Timestamp and Payment Info */}
         {order && (
            <div className="OrderSummary-meta">
               <div>Date: {new Date().toLocaleDateString()}</div>
               <div>Time: {new Date().toLocaleTimeString()}</div>
               <div>Payment Method: Credit Card</div>
               <div>Order Number: {order.id}</div>
            </div>
         )}

         <ul className="OrderSummary-items">
            {orderItems.map((item) => (
               <li
                  key={item.order_item_id}
                  className="OrderSummary-item"
               >
                  <span className="item-name">{item.name}</span>
                  <span className="item-details">
                     ${item.price} x {item.quantity}
                  </span>
               </li>
            ))}
         </ul>

         <div className="OrderSummary-summary">
            {/* <div className="summary-line">
               <span>Subtotal</span>
               <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-line">
               <span>Tax</span>
               <span>${tax.toFixed(2)}</span>
            </div> */}
            <div className="summary-line total">
               <span>Total</span>
               {order && <span>${order.total}</span>}
            </div>
         </div>

         <p className="thank-you">Thank you for your purchase!</p>
      </div>
   );
}

export default OrderSummary;
