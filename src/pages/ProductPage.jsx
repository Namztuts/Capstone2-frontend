import { useState, useEffect } from 'react';
import API from '../api/api';
import ProductCard from '../components/ProductCard';
import { useUser } from '../context/UserContext';
import '../styles/ProductPage.css';
// import SearchTemplate from './SearchTemplate';

function ProductPage() {
   const [products, setProducts] = useState([]);
   const { isLoading, setIsLoading } = useUser();
   // const [searchTerm, setSearchTerm] = useState('');

   useEffect(() => {
      async function getProducts() {
         setIsLoading(true); //loading while the data is being fetched and shown on page
         try {
            let response = await API.getProducts();
            setProducts(Object.values(response));
         } catch (error) {
            console.error('Error fetching products:', error);
         } finally {
            setIsLoading(false); //finally runs regardless of wether try or catch succeed
         }
      }
      getProducts();
   }, []);

   // const filteredCompanies = companies.filter((company) =>
   //    company.name.toLowerCase().includes(searchTerm.toLowerCase())
   // );

   // when loading, show loading...
   if (isLoading) {
      return <p>Loading &hellip;</p>;
   }

   return (
      <div className="ProductPage">
         <h1>Products</h1>
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
         {/* <SearchTemplate
            isLoading={isLoading} // Pass loading state to `PagesTemplate`
            data={filteredCompanies} // Pass the filtered list of companies
            renderItem={(company) => <CompanyCard company={company} />} // Render each company using `CompanyCard`
            onSearch={setSearchTerm} // Pass the search term setter to `PagesTemplate`
            searchBy="Search by company..." // Placeholder text for the search bar
         /> */}
      </div>
   );
}

export default ProductPage;
