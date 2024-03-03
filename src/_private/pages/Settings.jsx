import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { settingsSchema } from "@/lib/validation";
import { capitalizeFirstLetter, copyTextToClipboard, showToast, showAlert } from "@/lib/utils";
import { useAuthStore } from "@/zustand-stores";
import { useUpdateProfile } from "@/lib/react-query";
import { Loading } from "@/components";
import { Helmet } from 'react-helmet-async';

const HOST_NAME = import.meta.env.VITE_HOST_NAME;

export const Settings = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(settingsSchema)
  });

  // States from zustand-stores
  const user = useAuthStore(state => state.user);
  const PUBLIC_PROFILE_URL = `${HOST_NAME}${user?.username}`;

  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } = useUpdateProfile();

  const copyUrl = () => {
    const isSuccess = copyTextToClipboard(PUBLIC_PROFILE_URL);
    if (isSuccess) {
      showToast("Copied to clipboard.");
    } else {
      showToast("Copy to clipboard failed.");
    }
  };

  const onSubmit = async data => {
    data.id = user?._id;
    const res = await updateProfile({ data, type: "seo" });

    if (res.status === "Success") {
      showToast(res.data.message);
    } else {
      showAlert("Save failed", res.error.message || "Something went wrong try again.");
    }
  };

  useEffect(() => {
    const seoMetadata = user?.seoMetadata;
    if (seoMetadata) {
      setValue("title", seoMetadata.title);
      setValue("description", seoMetadata.desc);
    }
  }, [user]);

  return (
    <section className="my-6">
      <Helmet>
        <title>Settings</title>
      </Helmet>
      
      <h1 className="heading3 mb-4">Settings</h1>
      <div className="md:space-y-10">
        <div className="mt-4 p-5 bg-white rounded-md dark-mode">
          <h2 className="base-semibold">Your link</h2>
          <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
            <Link to={PUBLIC_PROFILE_URL} target="_blank" className="mt-2 break-all text-purple-500">
              {PUBLIC_PROFILE_URL}
            </Link>
            <button onClick={copyUrl} className="mt-2 bg-gray-200 rounded p-2 text-sm dark:bg-ghostwhite/10" type="button">
              Copy
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 p-5 bg-white rounded-md dark-mode">
          <h2 className="base-semibold mb-4">SEO metadata</h2>
          <div className="">
            <label htmlFor="" className="">
              Title
            </label>
            <input className="form-input" placeholder="Write your title" type="text" {...register("title")} />
            <p className="error-message">{errors?.title && capitalizeFirstLetter(errors.title?.message)}</p>
          </div>
          <div className="mt-4">
            <label htmlFor="" className="">
              Description
            </label>
            <input className="form-input" placeholder="Write you description" type="text" {...register("description")} />
            <p className="error-message">{errors?.description && capitalizeFirstLetter(errors.description?.message)}</p>
          </div>
          <button disabled={isUpdatingProfile} className="submit-btn mt-4" type="submit">
            {isUpdatingProfile ? <Loading /> : "Save"}
          </button>
        </form>
      </div>
    </section>
  );
};
