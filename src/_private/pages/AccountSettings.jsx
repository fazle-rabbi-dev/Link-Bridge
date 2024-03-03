import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { accountSettingsInfoSchema, accountSettingsPasswordSchema } from "@/lib/validation";
import { showToast, showAlert, capitalizeFirstLetter } from "@/lib/utils";
import { useAuthStore } from "@/zustand-stores";
import { useUpdateProfile } from "@/lib/react-query";
import { Loading } from "@/components";
import { Helmet } from "react-helmet-async";

const formFields1 = ["Username"];
const formFields2 = ["Old password", "New password"];

export const AccountSettings = () => {
  const {
    register: registerInfo,
    setValue: setInfoValue,
    handleSubmit: handleInfoSubmit,
    formState: { errors: infoErrors }
  } = useForm({
    resolver: yupResolver(accountSettingsInfoSchema)
  });

  const {
    register: registerPassword,
    setValue: setPasswordValue,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors }
  } = useForm({
    resolver: yupResolver(accountSettingsPasswordSchema)
  });

  const { user } = useAuthStore();
  const { mutateAsync: updateAccountUsername, isPending: isUpdatingAccountUsername } = useUpdateProfile();
  const { mutateAsync: updateAccountPassword, isPending: isUpdatingAccountPassword } = useUpdateProfile();

  useEffect(() => {
    if (user) {
      setInfoValue("name", user?.name);
      setInfoValue("username", user?.username);
    }
  }, [user]);

  const saveInfo = async data => {
    data.id = user?._id;

    const res = await updateAccountUsername({ data, type: "username" });

    if (res.status === "Success") {
      showAlert("Success", "Username updated successfully.");
    } else {
      showAlert("Save failed!", res.error?.message || "Something went wrong try again", "error");
    }
  };

  const savePassword = async data => {
    const { oldpassword, newpassword } = data;

    const newData = {
      oldPassword: oldpassword,
      newPassword: newpassword,
      id: user?._id
    };

    const res = await updateAccountPassword({ data: newData, type: "changePassword" });

    if (res.status === "Success") {
      showAlert("Success", "Password changed successfully.");
    } else {
      showAlert("Save failed!", res.error?.message || "Something went wrong try again", "error");
    }
  };

  return (
    <section className="my-6">
      <Helmet>
        <title>Account Settings</title>
      </Helmet>

      <h1 className="heading3 mb-4">Account Settings</h1>
      <form onSubmit={handleInfoSubmit(saveInfo)} className="mt-4 p-5 rounded-md bg-white dark-mode">
        <h2 className="base-semibold mb-4">Change username</h2>

        {formFields1.map(fieldName => (
          <div key={fieldName} className="mb-4">
            <input className="form-input" placeholder={`Your ${fieldName.toLowerCase()}`} type="text" {...registerInfo(fieldName.toLowerCase())} />
            <p className="error-message">
              {infoErrors[fieldName.toLowerCase()] && capitalizeFirstLetter(infoErrors[fieldName.toLowerCase()].message)}
            </p>
          </div>
        ))}
        <button disabled={isUpdatingAccountUsername} className="mb-2 submit-btn" type="submit">
          {isUpdatingAccountUsername ? <Loading /> : "Save"}
        </button>
      </form>

      {user?.authentication?.authMethod === "email+password" && (
        <form onSubmit={handlePasswordSubmit(savePassword)} className="mt-4 p-5 rounded-md bg-white dark-mode">
          <h2 className="base-semibold mb-4">Change password</h2>

          {formFields2.map(fieldName => (
            <div key={fieldName} className="mb-4">
              <input
                className="form-input"
                placeholder={`Your ${fieldName.toLowerCase()}`}
                type="text"
                {...registerPassword(fieldName.replace(" ", "").toLowerCase())}
              />
              <p className="error-message">
                {passwordErrors[fieldName.replace(" ", "").toLowerCase()] &&
                  capitalizeFirstLetter(passwordErrors[fieldName.replace(" ", "").toLowerCase()]?.message)}
              </p>
            </div>
          ))}
          <button disabled={isUpdatingAccountPassword} className="mb-2 submit-btn" type="submit">
            {isUpdatingAccountPassword ? <Loading /> : "Save"}
          </button>
        </form>
      )}
    </section>
  );
};
