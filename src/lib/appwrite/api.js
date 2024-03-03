import { account, storage, avatars } from "./config.js";
const github_auth_success_callback = import.meta.env.VITE_APPWRITE_GITHUB_AUTH_SUCCESS_CALLBACK;
const google_auth_success_callback = import.meta.env.VITE_APPWRITE_GOOGLE_AUTH_SUCCESS_CALLBACK;
const auth_failure_callback = import.meta.env.VITE_APPWRITE_AUTH_FAILURE_CALLBACK;

export const signInWithGithub = async () => {
  account.createOAuth2Session("github", github_auth_success_callback, auth_failure_callback);
};

export const signInWithGoogle = async () => {
  account.createOAuth2Session("google", google_auth_success_callback, auth_failure_callback);
};

export async function getCurrentAccount() {
  try {
    const currentAccount = await account.get();
    const session = await account.getSession("current");

    return {
      user: currentAccount,
      session
    };
  } catch (error) {
    console.log(error);
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
  }
}
