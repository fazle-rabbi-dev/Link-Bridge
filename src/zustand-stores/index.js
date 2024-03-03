import { create } from "zustand";
import { signOutAccount } from "@/lib/appwrite/api";
import { setLocalStorageItem, removeLocalStorageItem } from "@/lib/utils";

// =====================================================================================================================
// Authentication
// =====================================================================================================================
export const useAuthStore = create(set => ({
  isLoggedIn: false,
  isLoadingAuth: true,
  user: null,
  isLoggingOut: false,

  setUser: data => {
    if (!data) {
      removeLocalStorageItem("loggedinUser");
    }

    set({
      isLoadingAuth: false,
      isLoggedIn: data?._id ? true : false,
      user: data || null
    });
  },

  logOut: async () => {
    set({ isLoggingOut: true });
    await signOutAccount();
    removeLocalStorageItem("loggedinUser");

    set({
      isLoggedIn: false,
      user: null,
      isLoggingOut: false
    });
  }
}));


// =====================================================================================================================
// For Link Page
// =====================================================================================================================
export const useLinkStore = create(set => ({
  isOpenCustomLinkModal: false,
  isOpenSocialLinkModal: false,
  shouldEdit: false,
  clickedLinkItem: "",

  openCustomLinkModal: () => {
    set({ isOpenCustomLinkModal: true });
  },

  closeCustomLinkModal: () => {
    set({
      isOpenCustomLinkModal: false,
      clickedLinkItem: {},
      shouldEdit: false
    });
  },

  openSocialLinkModal: () => {
    set({ isOpenSocialLinkModal: true });
  },

  closeSocialModal: () => {
    set({
      isOpenSocialLinkModal: false,
      clickedLinkItem: {},
      shouldEdit: false
    });
  },

  setClickedLinkItem: value => {
    set({ clickedLinkItem: value });
  },

  setShouldEdit: value => {
    set({ shouldEdit: value });
  }
}));


// =====================================================================================================================
// For Theme
// =====================================================================================================================
export const useThemeStore = create((set, get) => ({
  isDarkThemeEnabled: false,
  design: {},

  toggleDarkTheme: () => {
    const isDarkThemeEnabled = get().isDarkThemeEnabled;
    const newTheme = isDarkThemeEnabled ? "light" : "dark";
    setLocalStorageItem("theme", newTheme);

    document.documentElement.classList.toggle("dark");

    set({ isDarkThemeEnabled: !isDarkThemeEnabled });
  },

  setDesign: value => {
    set({ design: value || {} });
  }
}));
