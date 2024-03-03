// import { API_ROOT } from "@/constants";
const API_ROOT = import.meta.env.VITE_API_ROOT
import axios from "axios";
import { getLocalStorageItem } from "@/lib/utils";

// =========================================
// POST, PATCH, DELETE <request>
// =========================================
const mutationRequest = async (url, data, Authorization, method = "POST") => {
  const headers = {};

  if (data?.icon || data?.file || data?.avatar) {
    headers["Content-Type"] = "multipart/form-data.";
  } else {
    headers["Content-Type"] = "application/json";
  }

  if (Authorization) {
    const user = getLocalStorageItem("loggedinUser");
    const accessToken = user?.accessToken;
    headers["Authorization"] = `Bearer ${accessToken}`;
    if (data) data.creator = user?._id;
  }

  const options = {
    url,
    headers,
    method
  };

  if (method !== "DELETE") {
    options.data = data;
  }

  try {
    const res = await axios(options);
    return res?.data;
  } catch (error) {
    console.log(error);
    return error?.response?.data;
  }
};

// =========================================
// Get Request
// =========================================
const getRequest = async (url, Authorization) => {
  try {
    const headers = {};

    if (Authorization) {
      const user = getLocalStorageItem("loggedinUser");
      const accessToken = user?.accessToken;
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const options = {
      url,
      headers
    };

    const res = await axios(options);

    return res?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

// =========================================
// Authentication
// =========================================
export const createUserAccount = async user => {
  const res = await mutationRequest(`${API_ROOT}/users/register`, user);
  return res;
};

export const loginUserAccount = async user => {
  const res = await mutationRequest(`${API_ROOT}/users/login`, user);
  return res;
};

export const loginUserAccountWithSocial = async user => {
  const res = await mutationRequest(`${API_ROOT}/users/login-with-social`, user);
  return res;
};

export const confirmUserAccount = async ({ userId, token }) => {
  const res = await getRequest(`${API_ROOT}/users/confirm-account?userId=${userId}&token=${token}`);
  return res;
};

export const resetPassword = async ({ data, type }) => {
  const res = await mutationRequest(`${API_ROOT}/users/reset-password?type=${type}`, data, false, "PATCH");
  return res;
};

export const getUser = async userId => {
  const res = await getRequest(`${API_ROOT}/users/${userId}`, true);

  // delete res.data.data.authentication;
  return res.data.data;
};

export const getLinktreeProfile = async username => {
  const res = await getRequest(`${API_ROOT}/users/linktree-profile/${username}`, true);
  return res.data.data;
};

export const updateProfile = async ({ data, type }) => {
  const res = await mutationRequest(`${API_ROOT}/users/${data?.id}?updateType=${type}`, data, true, "PATCH");
  return res;
};

export const updateProfileDesign = async data => {
  // For upload custom bg image
  let newData = {
    ...data.data,
    type: data.type
  };

  if (data.type !== "background") {
    newData = data;
  }

  const res = await mutationRequest(`${API_ROOT}/users/update/linktree-profile?type=${data.type}`, newData, true, "PATCH");
  return res;
};

// =========================================
// Link Crud Operation
// =========================================
export const addLink = async ({ data, docType }) => {
  const res = await mutationRequest(`${API_ROOT}/links?docType=${docType}`, data, true);
  return res;
};

export const getLinks = async () => {
  const res = await getRequest(`${API_ROOT}/links`, true);
  return res;
};

export const getLinkStats = async () => {
  const res = await getRequest(`${API_ROOT}/links/stats`, true);
  return res;
};

export const updateLink = async ({ data, docType }) => {
  const res = await mutationRequest(`${API_ROOT}/links/${data?.id}?docType=${docType}`, data, true, "PATCH");
  return res;
};

export const deleteLink = async ({ docId, docType }) => {
  const res = await mutationRequest(`${API_ROOT}/links/${docId}?docType=${docType}`, null, true, "DELETE");
  return res;
};

// Count Link Click
export const countLinkClick = async (linkId, data) => {
  const res = await mutationRequest(`${API_ROOT}/links/click/${linkId}`, data, false, "PATCH");
  return res;
};
