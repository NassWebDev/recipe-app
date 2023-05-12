import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  getters: {
    isAuthenticated() {
      return !!this.user;
    }
  },
  actions: {
    login(user) {
      this.user = user;
    },
    logout() {
      this.user = null;
    },
    checkAuth() {
      return new Promise((resolve, reject) => {
        if (this.user) {
          resolve();
        } else {
          reject();
        }
      });
    }
  }
});