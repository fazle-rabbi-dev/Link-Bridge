import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/lib/validation";
import { showToast, showAlert, capitalizeFirstLetter } from "@/lib/utils";
import { useCreateUserAccount } from "@/lib/react-query";
import { Loading } from "@/components";
import { Helmet } from "react-helmet-async";

const formFields = ["Name", "Username", "Email", "Password"];

export const Signup = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { mutateAsync: createAccount, isPending: isCreatingAccount } = useCreateUserAccount();

  const {
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: userName || ""
    },
    resolver: yupResolver(signUpSchema)
  });

  const onSubmit = async data => {
    const res = await createAccount(data);
    if (res.error) {
      showAlert("Signup Failed", res.error.message || res.error, "error");
    } else {
      showToast(res.data.message);
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    if (location.search) {
      const params = new URLSearchParams(location.search);
      setValue("username", params.get("username").trim().replace(" ", ""));
    }
  }, [location]);

  return (
    <section className="mt-10 w-full min-h-screen md:flex md:justify-center md:items-center">
      <Helmet>
        <title>Signup - Linkbridge</title>
      </Helmet>
      
      <div className="">
        <div className="text-center">
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl dark:text-gray-50">Sign up</h3>
            <p className="">
              Already have an account?{" "}
              <Link to="/sign-in" className="font-medium text-purple-80 hover:text-purple-70">
                Log in
              </Link>
            </p>
          </div>
        </div>
        <div className="w-full rounded-md pb-10 max-w-md space-y-8 px-4 md:px-8 bg-white shadow-md text-gray-600 sm:px-0 dark-mode">
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 pt-5 space-y-5">
            {formFields.map(field => (
              <div key={field}>
                <label className="font-medium">{field}</label>
                <input
                  type={`${field === "Password" ? "password" : field === "Email" ? "email" : "text"}`}
                  required
                  className="auth-form-input"
                  {...register(field.toLowerCase())}
                />
                <p className="error-message">{errors[field.toLowerCase()] && capitalizeFirstLetter(errors[field.toLowerCase()]?.message)}</p>
              </div>
            ))}
            <button
              disabled={isCreatingAccount}
              className="w-full px-4 py-2 text-white font-medium bg-black/90 hover:bg-black/95 rounded-lg duration-150 disabled:bg-black/70 dark:bg-white dark:text-black/90"
            >
              {isCreatingAccount ? <Loading /> : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
