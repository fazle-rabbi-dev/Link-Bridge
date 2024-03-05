import { ID } from "appwrite";
import { account, storage, avatars, appwriteConfig } from "./config.js";
const github_auth_success_callback = import.meta.env.VITE_APPWRITE_GITHUB_AUTH_SUCCESS_CALLBACK;
const google_auth_success_callback = import.meta.env.VITE_APPWRITE_GOOGLE_AUTH_SUCCESS_CALLBACK;
const auth_failure_callback = import.meta.env.VITE_APPWRITE_AUTH_FAILURE_CALLBACK;
const storageId = import.meta.env.APPWRITE_STORAGE_ID

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


// =====================================================================================================================
// Fie Upload & Delete
// =====================================================================================================================
export async function uploadFile(file) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );
    
    if(!uploadedFile) throw Error;
    
    const previewUrl = await getFilePreview(uploadedFile.$id)
    
    return {
      id: uploadedFile.$id,
      url: previewUrl.href
    };
  } catch (error) {
    console.log(error)
    return null;
  }
}

export async function getFilePreview(fileId) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      /*2000,
      2000,
      "top",
      100*/
    );

    if (!fileUrl) throw Error;
    
    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(fileId) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}
