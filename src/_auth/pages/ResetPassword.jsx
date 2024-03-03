import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useResetPassword } from "@/lib/react-query";
import { showToast, showAlert } from "@/lib/utils";
import { Loading } from "@/components";
import { Helmet } from "react-helmet-async";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loadingPage, setLoadingPage] = useState(true);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const { mutateAsync: resetPassword, isPending: isLoading } = useResetPassword();

  // Validate token
  const validateToken = async (userId, token) => {
    const res = await resetPassword({
      data: {
        userId,
        token
      },
      type: "validateLink"
    });

    if (res?.status === "Success") {
      setLoadingPage(false);
    } else {
      setLoadingPage(false);
      setError("Sorry, the password reset link you clicked is no longer valid. Please request a new one.");
    }
  };

  useEffect(() => {
    if (location?.search) {
      const params = new URLSearchParams(location.search);
      const userId = params.get("userId");
      const token = params.get("token");
      if (userId.trim() && token.trim()) {
        setUserData({
          userId,
          token
        });
        validateToken(userId, token);
      }
    }

    if (location && !location.search) {
      navigate("/forgot-password");
    }
  }, [location]);

  // =====================================================================================================================
  // Change Password
  // =====================================================================================================================
  const handleSubmit = async e => {
    e.preventDefault();

    if (password?.trim().length < 6) {
      return showToast("Invalid password. Password must be at least 6 digits.", "error", 2000);
    }

    const res = await resetPassword({
      data: {
        newPassword: password,
        userId: userData?.userId,
        token: userData?.token
      },
      type: "change"
    });

    if (res?.status === "Success") {
      setPassword("");
      showToast(res.message || "Password changed successfully.");
      setTimeout(function () {
        navigate("/sign-in");
      }, 1000);
    } else {
      showAlert("Password Reset Failed!", res.error.message || "Something went wrong try again later.", "error");
    }
  };

  if (loadingPage) {
    return <Loading />;
  }

  return (
    <section className="">
      <Helmet>
        <title>Reset Password - Linkbridge</title>
      </Helmet>
      
      {!loadingPage && error ? (
        <div className="error-message text-center ">
          <p>🚨</p>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <h1 className="heading3">Reset Password</h1>

          <form onSubmit={handleSubmit} className="mt-4 bg-white rounded text-black p-6 dark-mode">
            <div className="">
              <input
                onChange={e => setPassword(e.target.value)}
                className="form-input"
                type="password"
                value={password}
                placeholder="Type new password"
              />
            </div>
            <button disabled={isLoading} className="submit-btn mt-4" type="submit">
              {isLoading ? <Loading /> : "Save"}
            </button>
          </form>
        </>
      )}
    </section>
  );
};
