import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useToast } from '../context/ToastContext';

import '../styles/ProductCard.css';

function ProductCard({ product }) {
   const { id, name, description } = product;
   const [quantity, setQuantity] = useState(1);
   const { handleAddToCart } = useCart();
   const { user } = useUser();
   const { showToast } = useToast();
   const navigate = useNavigate();

   const handleIncrement = () => {
      setQuantity((prev) => prev + 1);
   };

   const handleDecrement = () => {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
   };

   const handleSubmit = async () => {
      //navigate to login if there is no user logged in
      if (!user) {
         showToast(`You must be logged in to add items to cart.`, 'error');
         navigate('/login');
         return;
      }

      if (quantity > 0) {
         await handleAddToCart(product, quantity);
         showToast(`${quantity} ${product.name}(s) added to cart!`, 'success');
      }
      setQuantity(1); //reset quantity after adding to cart
   };

   return (
      <div className="ProductCard">
         <div className="ProductCard-content">
            <div className="ProductCard-info">
               <Link
                  to={`/products/${id}`}
                  className="ProductCard-link"
               >
                  <h2>{name}</h2>
               </Link>
               <p>{description}</p>

               <div className="ProductCard-quantity">
                  <input
                     type="number"
                     min="1"
                     value={quantity}
                     readOnly
                  />
                  <button onClick={handleDecrement}>−</button>
                  <button onClick={handleIncrement}>+</button>
                  <button
                     className="ProductCard-add"
                     onClick={handleSubmit}
                  >
                     Add to Cart
                  </button>
               </div>
            </div>

            <img
               // src={product.image}
               src="/default.png"
               alt={name}
               className="ProductCard-image"
            />
         </div>
      </div>
   );
}

export default ProductCard;
