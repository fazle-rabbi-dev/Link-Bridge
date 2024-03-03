import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button, ImageUploader, Loading } from "@/components";
import { socials } from "@/constants";
import { showToast, validateURL, cn } from "@/lib/utils";
import { useAddLink, useUpdateLink, useDeleteLink } from "@/lib/react-query";
import { useLinkStore } from "@/zustand-stores";

export const AddSocialLinkModal = () => {
  const [socialItems, setSocialItems] = useState(socials || []);
  const [filterText, setFilterText] = useState();
  const [clickedItem, setClickedItem] = useState("");
  const [socialUrl, setSocialUrl] = useState("");

  // States From zustand-stores
  const { isOpenSocialLinkModal, closeSocialModal, clickedLinkItem, shouldEdit } = useLinkStore();

  // Mutations From React-Query
  const { mutateAsync: addLink, isPending: isAddingLink } = useAddLink();
  const { mutateAsync: updateLink, isPending: isUpdatingLink } = useUpdateLink();
  const { mutateAsync: deleteLink, isPending: isDeletingLink } = useDeleteLink();

  // Set initial value when editing
  useEffect(() => {
    if (clickedLinkItem) {
      setClickedItem(clickedLinkItem.title);
      setSocialUrl(clickedLinkItem.url);
    }
  }, [clickedLinkItem, shouldEdit]);

  // Filter social platform
  const handleFilter = e => {
    const value = e.target.value;
    setFilterText(value);

    const filteredItems = socials.filter(item => item.name.toLowerCase().startsWith(value.toLowerCase()));

    if (filteredItems.length > 0) {
      setSocialItems(filteredItems);
    } else {
      setSocialItems([]);
    }

    if (!value) {
      setSocialItems(socials);
    }
  };

  const handleBtnClick = socialName => {
    setClickedItem(socialName);
  };

  const dismissModal = () => {
    setClickedItem("");
    setSocialUrl("");
    closeSocialModal();
    setFilterText("");
    setSocialItems(socials);
  };

  // =====================================================================================================================
  // Add New Social Link
  // =====================================================================================================================
  const handleAddSocial = async e => {
    e.preventDefault();

    const isValidUrl = validateURL(socialUrl.trim());
    if (!isValidUrl) {
      return showToast("Oops! invalid url.", "error", 1500);
    }

    const data = {
      title: clickedItem,
      url: socialUrl
    };
    const res = await addLink({
      data,
      docType: "socialLinks"
    });

    if (res?.status === "Success") {
      dismissModal();
      showToast(res.data.message || "Success");
    }
  };

  // =====================================================================================================================
  // Update Link
  // =====================================================================================================================
  const handleUpdateLink = async e => {
    e.preventDefault();

    const isValidUrl = validateURL(socialUrl.trim());
    if (!isValidUrl) {
      return showToast("Oops! invalid url.", "error", 1500);
    }

    const data = {
      title: clickedItem,
      url: socialUrl,
      id: clickedLinkItem?._id
    };
    const res = await updateLink({
      data,
      docType: "socialLinks"
    });

    if (res?.status === "Success") {
      dismissModal();
      showToast(res.data.message || "Success");
    }
  };

  // =====================================================================================================================
  // Delete Link
  // =====================================================================================================================
  const handleDeleteLink = async e => {
    const res = await deleteLink({
      docId: clickedLinkItem?._id,
      docType: "socialLinks"
    });

    if (res?.status === "Success") {
      dismissModal();
      showToast(res.data.message || "Success");
    }
  };

  return (
    <div
      className={cn("fixed z-50 h-screen w-full right-0 left-0 top-0 bottom-0 bg-black/80 flex items-end", {
        hidden: !isOpenSocialLinkModal
      })}
    >
      {clickedItem || shouldEdit ? (
        <div className="add-link-modal py-10">
          <div className="flex justify-between items-center border-b-[1px] border-gray-200/80 pb-6 px-4">
            <h2 className="heading3">{shouldEdit ? "Edit social" : "Add a new socials"}</h2>
            <button className="close-btn" onClick={dismissModal}>
              <X />
            </button>
          </div>

          <div className="px-6 py-4">
            <h2 className="heading4 mb-2 flex items-center gap-2">
              <span
                dangerouslySetInnerHTML={{
                  __html: socials.find(item => item.name === clickedItem)?.icon
                }}
              ></span>
              {clickedItem}
            </h2>
            <form onSubmit={shouldEdit ? handleUpdateLink : handleAddSocial} className="">
              <input
                className="addlink-input"
                required
                placeholder="URL"
                type="text"
                name=""
                id=""
                onChange={e => setSocialUrl(e.target.value)}
                value={socialUrl}
              />
              {shouldEdit && (
                <button onClick={handleDeleteLink} className="text-rose-500 py-1 my-2" type="button">
                  Delete
                </button>
              )}
              <button disabled={isAddingLink} className="submit-btn mt-2 flex gap-2 justify-center items-center" type="submit">
                {isAddingLink ? (
                  <>
                    <Loading color="#f8f8f8" size={16} />
                    <span>Saving ..</span>
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-md shadow-md w-full h-[90vh] pb-10 dark-mode md:max-w-3xl md:mx-auto">
          <div className="flex justify-between items-center border-b-[1px] border-gray-200/80 py-6 px-4">
            <h2 className="heading3">Add a new social</h2>
            <button className="close-btn" onClick={dismissModal}>
              <X />
            </button>
          </div>

          <div className="overflow-auto h-[70%] my-6 px-8">
            {/* Search Field */}
            <form onSubmit={e => e.preventDefault()} className="max-w-md mx-auto mb-4">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input value={filterText} onChange={handleFilter} type="text" placeholder="Search" className="add-social-link-modal-searchbar" />
              </div>
            </form>

            {/* Display All Socials To Add */}
            <ul className="flex flex-col gap-4">
              {socialItems.map(social => (
                <SocialCard key={social.id} name={social.name} icon={social.icon} handleBtnClick={handleBtnClick} />
              ))}
              <p className="text-sm text-rose-500 font-light">{socialItems.length === 0 && "No result found :)"}</p>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// To display social item inside modal
const SocialCard = ({ name, icon, handleBtnClick }) => {
  return (
    <button onClick={() => handleBtnClick(name)} className="social-btn">
      <div className="flex gap-3 items-center " type="submit">
        <span dangerouslySetInnerHTML={{ __html: icon }}></span>
        <span>{name}</span>
      </div>
      <div className="text-purple-70 dark:text-purple-60" type="button">
        Add
      </div>
    </button>
  );
};
