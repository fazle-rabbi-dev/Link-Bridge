import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { ImageUploader, Loading } from "@/components";
import { showToast } from "@/lib/utils";
import { useGetUser, useUpdateProfile } from "@/lib/react-query";
import { useAuthStore } from "@/zustand-stores";

export const Profile = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [currentFile, setCurrentFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState();
  
  const user = useAuthStore(state => state.user);
  const { mutateAsync: updateProfile, isPending: isUpdating } = useUpdateProfile();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio);
      setPreviewUrl(user.profilePic.url || "");
    }
  }, [user]);

  const removeProfilePic = () => {
    setPreviewUrl("");
    setCurrentFile(null);
  };
  
  // =====================================================================================================================
  // Update Profile
  // =====================================================================================================================
  const handleSubmit = async e => {
    e.preventDefault();

    if (!name.trim() || !(name.trim().length > 2) || !bio.trim()) {
      return showToast("Invalid name or bio.Name must be at least 3 digit.", "error", 3000);
    }

    if (!user?._id) {
      return showToast("Oops! Something went wrong.", "error");
    }

    const data = {
      name,
      bio,
      avatar: currentFile,
      id: user?._id,
      profilePicPublicId: user?.profilePic?.publicId,
      removeProfilePic: !previewUrl ? "yes" : "no"
    };

    const res = await updateProfile({ data, type: "profile" });

    if (res?.status === "Success") {
      showToast(res.data.message);
    } else {
      showToast("Account update failed.", "error");
    }
  };

  return (
    <section className="bg-white rounded-md my-6 px-4 py-6 dark-mode">
      <h2 className="base-semibold">Profile</h2>
      <div className="my-6 relative inline-block text-start">
        <ImageUploader
          currentFile={currentFile}
          setCurrentFile={setCurrentFile}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
          usedFor="profile-pic"
        />
        {previewUrl && (
          <button
            onClick={removeProfilePic}
            className="ring-2 ring-white absolute bg-black p-[2px] rounded-full text-white right-0 top-2 dark:ring-dark-70"
          >
            <X size={17} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input className="addlink-input" required placeholder="Name" type="text" value={name} onChange={e => setName(e.target.value)} />
        <input className="addlink-input" required placeholder="Bio" type="text" value={bio} onChange={e => setBio(e.target.value)} />
        <button disabled={isUpdating} className="submit-btn" type="submit">
          {isUpdating ? <Loading size={20} color="#fff" /> : "Save"}
        </button>
      </form>
    </section>
  );
};
