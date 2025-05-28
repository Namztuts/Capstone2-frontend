import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
   const { id, name, description } = product;
   const [quantity, setQuantity] = useState(1);
   const { handleAddToCart } = useCart();

   const handleIncrement = () => {
      setQuantity((prev) => prev + 1);
   };

   const handleDecrement = () => {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
   };

   const handleSubmit = () => {
      if (quantity > 0) {
         handleAddToCart(product, quantity);
      }
      alert(`${quantity} of ${name} was added to the cart`);

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
