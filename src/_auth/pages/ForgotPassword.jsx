import { Link } from "react-router-dom";
import { useState } from "react";
import { useResetPassword } from "@/lib/react-query";
import { showToast, showAlert } from "@/lib/utils";
import { Loading } from "@/components";
import { Helmet } from "react-helmet-async";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const { mutateAsync: resetPassword, isPending: isResetingPassword } = useResetPassword();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email?.trim()) return showToast("Enter a valid email address", "error");

    const res = await resetPassword({
      data: {
        email
      },
      type: "reset"
    });

    if (res?.status === "Success") {
      showAlert(
        "Success",
        "Reset password email sent successfully. Please check your email inbox and follow the instructions to reset your password."
      );
      setEmail("");
    } else {
      showAlert("Error", res.error?.message || "Something went wrong try again later.", "error");
    }
  };

  return (
    <section className="">
      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      
      <div class="dark-mode form-container">
        <h1 className="heading3">Forgot Password</h1>

        <form onSubmit={handleSubmit} class="form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              onChange={e => setEmail(e.target.value)}
              value={email}
              className="auth-form-input"
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              required=""
            />
          </div>

          <button disabled={isResetingPassword} className="mt-4 py-3 rounded bg-black/90 text-white dark:bg-white dark:text-black/80" type="submit">
            {isResetingPassword ? <Loading /> : "Send Email"}
          </button>
        </form>

        <p class="signup-link">
          Don't have an account?
          <Link to="/sign-up" className="signup-link link">
            {" "}
            Sign up now
          </Link>
        </p>
      </div>
    </section>
  );
};
