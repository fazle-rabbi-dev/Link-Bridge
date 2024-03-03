import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Loading } from "@/components";
import { useConfirmUserAccount } from "@/lib/react-query";
import { Helmet } from "react-helmet-async";

export const ConfirmAccount = () => {
  const [isConfirmed, setisConfirmed] = useState(false);
  const [message, setMessage] = useState("");

  const location = useLocation();
  const { mutateAsync: confirmUserAccount, isPending: isConfirming } = useConfirmUserAccount();

  const startConfirmation = async (userId, token) => {
    const res = await confirmUserAccount({ userId, token });

    if (res?.status === "Success") {
      setisConfirmed(prev => !prev);
    } else if (res.status === "Failed") {
      setMessage(res.error.message);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location?.search);
    const userId = params.get("userId");
    const token = params.get("token");

    if (userId && token) {
      startConfirmation(userId, token);
    }
  }, []);

  return (
    <section className="">
      <Helmet>
        <title>Confirm Account</title>
      </Helmet>
      
      <div className="mt-6 text-center">
        {isConfirming && (
          <>
            <h2 className="mb-4 font-bold">Account Confirming ..</h2>
            <Loading size={40} />
          </>
        )}

        {!isConfirming && isConfirmed && (
          <>
            <p className="text-center">
              <span className="bg-gray-200/40 text-black rounded px-2 text-5xl dark:bg-white dark:text-black/90">✔︎</span>
            </p>
            <h2 className="mt-4 font-bold">
              Account Confirmed Successfully
            </h2>
            <p className="mt-2 body-text">
              Now you can{" "}
              <Link className="text-purple-80 border-b-2 border-b-purple-80 dark:text-purple-70" to="/sign-in">
                Sign in.
              </Link>
            </p>
          </>
        )}

        {!isConfirming && !isConfirmed && (
          <>
            <p className="text-5xl">⚠️</p>
            <h2 className="mt-4 font-light text-yellow-700">
              Oops! It seems like something went wrong. Please check if you clicked on a broken link.
            </h2>
            <button className="btn-base bg-black/90 text-white my-4 dark:bg-white dark:text-black/80" type="button">
              <Link to="/sign-in">Try to sign in</Link>
            </button>
          </>
        )}
      </div>
    </section>
  );
};
