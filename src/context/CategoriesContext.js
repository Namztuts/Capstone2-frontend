import { createContext, useContext } from 'react';

export const CategoriesContext = createContext(null);

export function useCategories() {
   const context = useContext(CategoriesContext);
   if (!context) {
      throw new Error(
         'useCategories must be used within an CategoriesProvider'
      );
   }
   return context;
}
