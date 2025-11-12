/**
 * Utility functions for localStorage CRUD operations
 */

// Products CRUD
export const productStorage = {
  getAll: () => {
    const stored = localStorage.getItem('products');
    return stored ? JSON.parse(stored) : [];
  },
  
  save: (products) => {
    localStorage.setItem('products', JSON.stringify(products));
  },
  
  getById: (id) => {
    const products = productStorage.getAll();
    return products.find(p => p.id === parseInt(id));
  },
  
  add: (product) => {
    const products = productStorage.getAll();
    products.push(product);
    productStorage.save(products);
  },
  
  update: (id, updatedProduct) => {
    const products = productStorage.getAll();
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      productStorage.save(products);
    }
  },
  
  delete: (id) => {
    const products = productStorage.getAll();
    const filtered = products.filter(p => p.id !== parseInt(id));
    productStorage.save(filtered);
  }
};

// Wishlist CRUD
export const wishlistStorage = {
  getAll: () => {
    const stored = localStorage.getItem('wishlist');
    return stored ? JSON.parse(stored) : [];
  },
  
  add: (productId) => {
    const wishlist = wishlistStorage.getAll();
    if (!wishlist.includes(productId)) {
      wishlist.push(productId);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
  },
  
  remove: (productId) => {
    const wishlist = wishlistStorage.getAll();
    const filtered = wishlist.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(filtered));
  },
  
  isInWishlist: (productId) => {
    const wishlist = wishlistStorage.getAll();
    return wishlist.includes(productId);
  }
};

// Orders CRUD
export const orderStorage = {
  getAll: () => {
    const stored = localStorage.getItem('orders');
    return stored ? JSON.parse(stored) : [];
  },
  
  add: (order) => {
    const orders = orderStorage.getAll();
    const newOrder = {
      ...order,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    return newOrder;
  },
  
  getById: (id) => {
    const orders = orderStorage.getAll();
    return orders.find(o => o.id === parseInt(id));
  }
};

// Contacts CRUD
export const contactStorage = {
  getAll: () => {
    const stored = localStorage.getItem('contacts');
    return stored ? JSON.parse(stored) : [];
  },
  
  add: (contact) => {
    const contacts = contactStorage.getAll();
    const newContact = {
      ...contact,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    return newContact;
  }
};

// User CRUD
export const userStorage = {
  getCurrent: () => {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  },
  
  setCurrent: (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
  },
  
  logout: () => {
    localStorage.removeItem('currentUser');
  },
  
  register: (userData) => {
    const users = userStorage.getAll();
    const newUser = {
      ...userData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
  },
  
  getAll: () => {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : [];
  },
  
  findByEmail: (email) => {
    const users = userStorage.getAll();
    return users.find(u => u.email === email);
  }
};

// Visit counter
export const visitCounter = {
  increment: () => {
    const count = visitCounter.get();
    localStorage.setItem('visitCount', (count + 1).toString());
  },
  
  get: () => {
    const stored = localStorage.getItem('visitCount');
    return stored ? parseInt(stored) : 0;
  }
};

