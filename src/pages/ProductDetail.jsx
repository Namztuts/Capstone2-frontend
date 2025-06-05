import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import API from '../api/api';
import '../styles/ProductDetail.css';

function ProductDetail() {
   const { id } = useParams();
   const [product, setProduct] = useState(null);
   const [quantity, setQuantity] = useState(1);
   const [categoryProducts, setCategoryProducts] = useState([]);
   const { error, setError, setIsLoading, user } = useUser();
   const { handleAddToCart } = useCart();
   const { showToast } = useToast();
   const navigate = useNavigate();

   useEffect(() => {
      async function fetchProduct() {
         setIsLoading(true);
         try {
            const response = await API.getProduct(id);
            setProduct(response);
         } catch (err) {
            console.error('Failed to fetch product', err);
            setError(err.message);
         } finally {
            setIsLoading(false);
         }
      }

      fetchProduct();
   }, [id]);

   useEffect(() => {
      async function fetchCategoryProducts() {
         if (!product) return; //wait until product has been grabbed
         setIsLoading(true);
         try {
            const response = await API.getCategoryProducts(product.categoryID);
            console.log('products', Object.values(response.items));
            setCategoryProducts(Object.values(response.items));
         } catch (err) {
            console.error('Failed to fetch category products', err);
            setError(err.message);
         } finally {
            setIsLoading(false);
         }
      }

      fetchCategoryProducts();
   }, [product]);

   const handleIncrement = () => {
      setQuantity((prev) => prev + 1);
   };

   const handleDecrement = () => {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
   };

   const handleSubmit = async () => {
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

   if (!product) return <p>Loading product...</p>;

   return (
      <div className="ProductDetail">
         {/* Main */}
         <div className="ProductDetail-product">
            <img
               src="/default.png"
               alt={product.name}
               className="ProductDetail-image"
            />

            <div className="ProductDetail-info">
               <h2>{product.name}</h2>
               <h3>{product.description}</h3>
               <p className="ProductDetail-price">${product.price}</p>

               <div className="ProductDetail-quantity">
                  <input
                     type="number"
                     min="1"
                     value={quantity}
                     readOnly
                  />
                  <button onClick={handleDecrement}>−</button>
                  <button onClick={handleIncrement}>+</button>
                  <button
                     className="ProductDetail-add"
                     onClick={handleSubmit}
                  >
                     Add to Cart
                  </button>
               </div>

               {/* display errors */}
               {error && <div className="ProductDetail-error">{error}</div>}
            </div>
         </div>

         {/* Items in the same category */}
         <div className="ProductDetail-related">
            <h3>Other items you may like!</h3>
            <div className="ProductDetail-RelatedItems">
               {categoryProducts.map((item) => (
                  <Link
                     to={`/products/${item.id}`}
                     key={item.id}
                  >
                     <div className="ProductDetail-RelatedItem">
                        <div>
                           <h4>{item.name}</h4>
                           <img
                              src="/default.png"
                              alt={item.name}
                           />
                        </div>
                     </div>
                  </Link>
               ))}
            </div>
         </div>
      </div>
   );
}

export default ProductDetail;
