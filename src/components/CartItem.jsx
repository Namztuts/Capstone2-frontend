import '../styles/Cart.css';

function CartItem({ item, onIncrement, onDecrement, onDelete }) {
   return (
      <li className="CartItem">
         <div className="CartItem-details">
            <div className="CartItem-text">
               <strong>{item.name}</strong>
               <span className="CartItem-description">{item.description}</span>
               <span>
                  ${item.price} x {item.quantity}
               </span>

               <div className="CartItem-controls">
                  <button
                     onClick={() => onDecrement(item.cart_item_id)}
                     disabled={item.quantity <= 1}
                  >
                     −
                  </button>
                  <button onClick={() => onIncrement(item.cart_item_id)}>
                     +
                  </button>
                  <button
                     className="CartItem-delete"
                     onClick={() => onDelete(item.cart_item_id)}
                  >
                     Delete
                  </button>
               </div>
            </div>
         </div>

         <img
            src="/default.png"
            alt={item.name}
            className="CartItem-thumbnail"
         />
      </li>
   );
}

export default CartItem;
