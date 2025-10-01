import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3001'; //for Vite

/* API Class
 *
 * Static class tying together methods used to get/send to to the API
 *
 */
class API {
   static token; //the token for interactivity with the API will be stored here

   static async request(endpoint, data = {}, method = 'get') {
      console.debug('API Call:', endpoint, data, method);

      //passing authorization token through the header
      const url = `${BASE_URL}/${endpoint}`;
      const headers = { Authorization: `Bearer ${API.token}` };
      const params = method === 'get' ? data : {};

      try {
         return (await axios({ url, method, data, params, headers })).data;
      } catch (err) {
         console.error('API Error:', err.response);
         let message = err.response.data.error.message;
         throw Array.isArray(message) ? message : [message];
      }
   }

   //****** GET routes ******

   //Get a list of all products
   static async getProducts() {
      //FIN:
      try {
         let response = await this.request('products');
         return response.products;
      } catch (error) {
         console.error('Error getting products:', error);
         throw error;
      }
   }

   //Get a single product
   static async getProduct(id) {
      //FIN:
      try {
         let response = await this.request(`products/${id}`);
         return response.product;
      } catch (error) {
         console.error('Error getting products:', error);
         throw error;
      }
   }

   //Get details about a user via username
   static async getUser(username) {
      //FIN: works
      if (!this.token) {
         console.error('No token available. Cannot fetch user.');
         return null;
      }

      if (!username) {
         console.error('Username was not found.');
         return null;
      }

      try {
         const response = await this.request(`users/${username}`);
         return response;
      } catch (error) {
         console.error('Error fetching user:', error);
         return null;
      }
   }

   //Get a list of all categories
   static async getCategories() {
      //FIN: works
      try {
         let response = await this.request('categories');
         return response.categories;
      } catch (error) {
         console.error('Error getting categories:', error);
         throw error;
      }
   }

   //Get all products from a category
   static async getCategoryProducts(id) {
      //FIN:
      try {
         let response = await this.request(`categories/${id}/products`);
         return response.category;
      } catch (error) {
         console.error('Error getting products:', error);
         throw error;
      }
   }

   //Get a cart via username
   static async getCart(username) {
      //FIN:
      try {
         let response = await this.request(`carts/${username}`);
         return response.cart;
      } catch (error) {
         console.error('Error getting products:', error);
         throw error;
      }
   }

   //Get all cart items via cart_id
   static async getCartItems(id) {
      //FIN:
      if (!id) return []; //return an empty array if there is no id

      try {
         let response = await this.request(`cart-items/cart/${id}`);
         return response.cart.items;
      } catch (error) {
         console.error('Error getting products:', error);
         throw error;
      }
   }

   //Get order via id
   static async getOrder(id) {
      //FIN:
      if (!id) return []; //return an empty array if there is no id

      try {
         let response = await this.request(`orders/${id}`);
         return response.order;
      } catch (error) {
         console.error('Error getting products:', error);
         throw error;
      }
   }

   //Get all order items via order_id
   static async getOrderItems(id) {
      //FIN:
      if (!id) return []; //return an empty array if there is no id

      try {
         let response = await this.request(`order-items/order/${id}`);
         return response.order.items;
      } catch (error) {
         console.error('Error getting products:', error);
         throw error;
      }
   }

   //Get all orders via user_id
   static async getAllOrders(id) {
      //FIN:
      if (!id) return []; //return an empty array if there is no id

      try {
         let response = await this.request(`orders/username/${id}`);
         console.log('api response', response.orders);
         return response.orders;
      } catch (error) {
         console.error('Error getting products:', error);
         throw error;
      }
   }

   //****** POST routes ******

   //Register a new user | userData object { username, first_name, last_name, email }
   static async registerUser(userData) {
      //FIN: works
      try {
         let response = await this.request('auth/register', userData, 'post');
         return response.token;
      } catch (error) {
         console.error('Error registering user:', error);
         throw error;
      }
   }

   //Authenticate a user upon login
   static async authenticateUser(username, password) {
      //FIN: works
      try {
         let response = await this.request(
            'auth/token',
            { username, password },
            'post'
         );
         const { token } = response; // Extract the token from the response
         return { token }; // Only return the token
      } catch (error) {
         console.error('Error authenticating user:', error);
         throw error;
      }
   }

   static async addToCart(cartData) {
      //FIN:
      try {
         let response = await this.request(`cart-items`, cartData, 'post');
         return response;
      } catch (error) {
         console.error('Error adding item to cart:', error);
         throw error;
      }
   }

   static async createOrder(orderData) {
      //FIN:
      try {
         let response = await this.request(`orders`, orderData, 'post');
         console.log('api createOrder', response);
         return response;
      } catch (error) {
         console.error('Error creating order:', error);
         throw error;
      }
   }

   static async addToOrder(orderData) {
      //TODO: NOTE: make it so that the order does not get created if there is an error
      try {
         let response = await this.request(
            `order-items/bulk`,
            orderData,
            'post'
         );
         console.log('api addToOrder', response);
         return response;
      } catch (error) {
         console.error('Error adding item to order:', error);
         throw error;
      }
   }

   //****** PATCH routes ******

   //Edit a user profile | userData object { username, firstName, lastName, email }
   static async editUser(username, userData) {
      //NOTE: works mostly but still getting error on isAdmin

      try {
         // Make the API request to update user data
         let response = await this.request(
            `users/${username}`,
            userData,
            'patch'
         );

         // If the username was changed, update it in localStorage
         if (response.user.username && response.user.username !== username) {
            localStorage.setItem('username', response.user.username);
         }

         // Save the updated token to localStorage (if available)
         if (response.token) {
            localStorage.setItem('token', response.token);
         }

         return response.user;
      } catch (error) {
         console.error('Error editing user:', error); //NOTE: error here | instance.isAdmin is not of a type(s) boolean
         throw error;
      }
   }

   static async updateCartItem(cart_item_id, quantity) {
      //FIN:
      try {
         let response = await this.request(
            `cart-items/${cart_item_id}`,
            { quantity },
            'patch'
         );

         return response;
      } catch (error) {
         console.error('Error updating cart item:', error);
         throw error;
      }
   }

   //****** DELETE routes ******

   static async deleteUser(username) {
      //FIN: works
      try {
         let response = await this.request(`users/${username}`, '', 'delete');
         return response;
      } catch (error) {
         console.error('Error deleting user:', error);
         throw error;
      }
   }

   static async deleteCartItem(cart_item_id) {
      //FIN:
      try {
         let response = await this.request(
            `cart-items/${cart_item_id}`,
            {},
            'delete'
         );

         return response;
      } catch (error) {
         console.error('Error deleting user:', error);
         throw error;
      }
   }

   static async clearCart(cart_id) {
      //FIN:
      try {
         let response = await this.request(
            `cart-items/cart/${cart_id}`,
            {},
            'delete'
         );

         return response;
      } catch (error) {
         console.error('Error deleting items from cart:', error);
         throw error;
      }
   }
}

export default API;
