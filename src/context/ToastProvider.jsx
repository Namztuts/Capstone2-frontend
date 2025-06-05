import { useState } from 'react';
import { ToastContext } from './ToastContext';

function ToastProvider({ children }) {
   const [toasts, setToasts] = useState([]);

   function showToast(message, type = 'success') {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);

      //remove after 3 seconds
      setTimeout(() => {
         setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 3000);
   }

   function removeToast(id) {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
   }

   return (
      <ToastContext.Provider value={{ showToast }}>
         {children}

         <div className="Toast-container">
            {toasts.map((toast) => (
               <div
                  key={toast.id}
                  className={`Toast Toast-${toast.type}`}
               >
                  {toast.message}
                  <button
                     className="Toast-dismiss"
                     onClick={() => removeToast(toast.id)}
                  >
                     ✕
                  </button>
               </div>
            ))}
         </div>
      </ToastContext.Provider>
   );
}

export default ToastProvider;
