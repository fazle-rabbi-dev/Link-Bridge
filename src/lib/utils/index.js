import { toast } from "react-hot-toast";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import Swal from "sweetalert2";

export const cn = (...inputs) => {
  return twMerge(clsx(...inputs));
};

export const showAlert = (title, text, icon) => {
  Swal.fire({
    title: title || "Good job!",
    text: text || "You clicked the button!",
    icon: icon || "success"
  });
};

export function capitalizeFirstLetter(str) {
  // Check if the string is not empty
  if (str.length === 0) {
    return str; // Return the string as it is if it's empty
  } else {
    // Capitalize the first character and concatenate it with the rest of the string
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export const showToast = (
  msg = "Here is your toast",
  type = "success",
  time = 2000,
  primaryColor = "#f2197e"
) => {
  toast[type](msg, {
    duration: time,
    position: "top-center"
    // icon: "👏",
    /*iconTheme: {
      primary: primaryColor,
      secondary: "#f8f8f8"
    }*/
  });
};

// Function to set data in local storage
export const setLocalStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage item:", error);
  }
};

// Function to get data from local storage
export const getLocalStorageItem = key => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error getting localStorage item:", error);
    return null;
  }
};

// Function to remove data from local storage
export const removeLocalStorageItem = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing localStorage item:", error);
  }
};

// For social login 
export function generateRandomPassword() {
  const length = 10;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-="; // Characters to include in the password, including symbols
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

// Url validator
export function validateURL(url) {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  return urlPattern.test(url);
}

// Copy text to clipboard
export function copyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Make the textarea out of viewport
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";

  document.body.appendChild(textArea);

  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch (error) {
    console.error("Unable to copy:", error);
    document.body.removeChild(textArea);
    return false;
  }
}

export function formatDate(dateString) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // handle midnight

  const formattedDate = `${day} ${month}, ${year}`;
  const formattedTime = `${("0" + hours).slice(-2)}:${minutes} ${ampm}`;

  return `🗓️ ${formattedDate} ⏰ ${formattedTime}`;
}

// Generate avatar from name
export function generateAvatar(name) {
  // const nameParts = name.split(" ");
  // const initials = nameParts.map(part => part[0]);
  // const avatar = initials.join("");

  return name.slice(0, 1);
}


export const createSlug = link => {
  return `/dashboard/${link.label.toLowerCase()}`;
};