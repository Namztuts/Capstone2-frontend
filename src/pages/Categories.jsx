import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import ProductCard from '../components/ProductCard';
import { useUser } from '../context/UserContext';
import '../styles/ProductPage.css';

function Categories() {
   const { id } = useParams();
   const [category, setCategory] = useState(null);
   const [products, setProducts] = useState([]);
   const { isLoading, setIsLoading } = useUser();

   useEffect(() => {
      if (!id) return; //don't fetch until id is ready

      async function getCategoryProducts() {
         setIsLoading(true); //loading while the data is being fetched and shown on page
         try {
            let response = await API.getCategoryProducts(id);
            console.log('categories page response', response);

            setCategory(response.name);
            setProducts(response.items);
         } catch (error) {
            console.error('Error fetching products:', error);
         } finally {
            setIsLoading(false); //finally runs regardless of wether try or catch succeed
         }
      }
      getCategoryProducts();
   }, [id]);

   // when loading, show loading...
   if (isLoading || !category) {
      return <p>Loading &hellip;</p>;
   }

   return (
      <div className="ProductPage">
         <h1>Category: {category} </h1>
         <ul className="ProductPage-list">
            {products.map((product) => (
               <li
                  key={product.id}
                  className="ProductPage-list-item"
               >
                  <ProductCard product={product} />
               </li>
            ))}
         </ul>
      </div>
   );
}

export default Categories;
