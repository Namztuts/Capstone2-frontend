import { useState, useEffect } from 'react';
import API from '../api/api';
import '../styles/OrderCard.css';

function OrderCard({ order }) {
   const { id, created_at, total } = order;
   const [expanded, setExpanded] = useState(false);
   const [orderItems, setOrderItems] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      async function getOrderItems() {
         setLoading(true); //loading while the data is being fetched and shown on page
         try {
            let response = await API.getOrderItems(id);
            setOrderItems(Object.values(response));
         } catch (error) {
            console.error('Error fetching order items:', error);
         } finally {
            setLoading(false); //finally runs regardless of wether try or catch succeed
         }
      }

      if (id) {
         getOrderItems();
      }
   }, [id]);

   if (loading || !order) return <p>Loading order summary...</p>;

   return (
      <div
         className="OrderCard"
         onClick={() => setExpanded(!expanded)}
         style={{ cursor: 'pointer' }}
      >
         <p className="OrderCard-id">Order ID: {id}</p>
         <p className="OrderCard-date">
            Date Ordered: {new Date(created_at).toLocaleDateString()}
         </p>
         <p className="OrderCard-total">Order Total: ${total}</p>

         {expanded && (
            <div className="OrderCard-items">
               <h4>Items:</h4>
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
            </div>
         )}
      </div>
   );
}

export default OrderCard;
