import { useState, useEffect } from 'react';
import { CategoriesContext } from './CategoriesContext';
import { useUser } from './UserContext';
import API from '../api/api';

function CategoriesProvider({ children }) {
   const [categories, setCategories] = useState([]);
   const { isLoading, setIsLoading } = useUser();

   //TODO: works??
   async function getCategories() {
      setIsLoading(true);
      try {
         const categories = await API.getCategories();
         setCategories(categories);
      } catch (error) {
         console.error('Error fetching categories:', error);
      } finally {
         setIsLoading(false);
      }
   }

   useEffect(() => {
      getCategories();
   }, []);

   return (
      <CategoriesContext.Provider value={{ categories, getCategories }}>
         {children}
      </CategoriesContext.Provider>
   );
}

export default CategoriesProvider;
