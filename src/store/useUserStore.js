import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { userStorage } from '../utils/storage';

/**
 * Zustand store for user management
 */
export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      // Login
      login: (email, password) => {
        const user = userStorage.findByEmail(email);
        if (user && user.password === password) {
          userStorage.setCurrent(user);
          set({ user, isAuthenticated: true });
          return { success: true, user };
        }
        return { success: false, error: 'Email hoặc mật khẩu không đúng' };
      },
      
      // Register
      register: (userData) => {
        const existingUser = userStorage.findByEmail(userData.email);
        if (existingUser) {
          return { success: false, error: 'Email đã được sử dụng' };
        }
        
        const newUser = userStorage.register(userData);
        userStorage.setCurrent(newUser);
        set({ user: newUser, isAuthenticated: true });
        return { success: true, user: newUser };
      },
      
      // Logout
      logout: () => {
        userStorage.logout();
        set({ user: null, isAuthenticated: false });
      },
      
      // Initialize from storage
      init: () => {
        const user = userStorage.getCurrent();
        if (user) {
          set({ user, isAuthenticated: true });
        }
      }
    }),
    {
      name: 'litebay-user',
      storage: localStorage
    }
  )
);

