/**
 * NovaTech - Storage & User Settings Manager
 */

const StorageManager = {
  KEYS: {
    API_KEY: 'novatech_gemini_api_key',
    MODEL_NAME: 'novatech_gemini_model',
    THEME: 'novatech_theme',
    BOOKMARKS: 'novatech_bookmarked_tech',
    USER_PHONE: 'novatech_user_phone',
    DAILY_DIGEST: 'novatech_saved_digest'
  },

  getApiKey() {
    return localStorage.getItem(this.KEYS.API_KEY) || '';
  },

  setApiKey(key) {
    if (key) {
      localStorage.setItem(this.KEYS.API_KEY, key.trim());
    } else {
      localStorage.removeItem(this.KEYS.API_KEY);
    }
  },

  getModel() {
    return localStorage.getItem(this.KEYS.MODEL_NAME) || 'gemini-3.7-flash';
  },

  setModel(model) {
    localStorage.setItem(this.KEYS.MODEL_NAME, model);
  },

  getTheme() {
    return localStorage.getItem(this.KEYS.THEME) || 'dark';
  },

  setTheme(theme) {
    localStorage.setItem(this.KEYS.THEME, theme);
    document.documentElement.setAttribute('data-theme', theme);
  },

  getUserPhone() {
    return localStorage.getItem(this.KEYS.USER_PHONE) || '+919876543210';
  },

  setUserPhone(phone) {
    localStorage.setItem(this.KEYS.USER_PHONE, phone.trim());
  },

  getBookmarks() {
    try {
      const data = localStorage.getItem(this.KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  toggleBookmark(techId) {
    const list = this.getBookmarks();
    const idx = list.indexOf(techId);
    if (idx >= 0) {
      list.splice(idx, 1);
    } else {
      list.push(techId);
    }
    localStorage.setItem(this.KEYS.BOOKMARKS, JSON.stringify(list));
    return list.includes(techId);
  },

  isBookmarked(techId) {
    return this.getBookmarks().includes(techId);
  }
};
