import * as yup from "yup";

export const signInSchema = yup.object().shape({
  // email: yup.string().email().required(),
  email: yup
    .string()
    .min(3, "Email or username must be at least 3 character.")
    .required(),
  password: yup.string().min(6).max(32).required()
});

export const signUpSchema = yup.object().shape({
  name: yup.string().min(3),
  username: yup.string().min(4),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(32).required()
});

export const settingsSchema = yup.object().shape({
  /* For SEO  */
  title: yup.string().min(8),
  description: yup.string().min(10)
});

export const accountSettingsInfoSchema = yup.object().shape({
  name: yup.string().min(3),
  username: yup.string().min(4),
  // email: yup.string().email().required(),
  // password: yup.string().min(8).max(32).required()
});

export const accountSettingsPasswordSchema = yup.object().shape({
  oldpassword: yup.string().min(6).max(32).required(),
  newpassword: yup.string().min(6).max(32).required()
});

