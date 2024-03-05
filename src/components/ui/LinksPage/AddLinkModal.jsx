import { useState, useEffect } from "react";
import { ImageUploader, Loading } from "@/components";
import { X } from "lucide-react";
import { showToast, cn } from "@/lib/utils";
import { useAddLink, useUpdateLink, useDeleteLink } from "@/lib/react-query";
import { useLinkStore } from "@/zustand-stores";

export const AddLinkModal = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [currentFile, setCurrentFile] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  // States From zustand-stores
  const { isOpenCustomLinkModal, closeCustomLinkModal, clickedLinkItem, shouldEdit } = useLinkStore();

  // Mutations From React-Query
  const { mutateAsync: addLink, isPending: isAddingLink } = useAddLink();
  const { mutateAsync: updateLink, isPending: isUpdatingLink } = useUpdateLink();
  const { mutateAsync: deleteLink, isPending: isDeletingLink } = useDeleteLink();

  const closeModal = () => {
    setTitle("");
    setUrl("");
    setCurrentFile(null);
    setPreviewUrl("");
    closeCustomLinkModal();
  };

  useEffect(() => {
    if (clickedLinkItem) {
      setTitle(clickedLinkItem.title);
      setUrl(clickedLinkItem.url);
    }
  }, [clickedLinkItem]);

  // =====================================================================================================================
  // Add New Link
  // =====================================================================================================================
  const handleAddLink = async e => {
    e.preventDefault();

    if (!title.trim() || !url.trim()) {
      showToast("Oops! invalid title or url.", "error");
      return;
    }

    const data = {
      title,
      url,
      icon: currentFile
    };
    const res = await addLink({ data, docType: "customLinks" });

    if (res?.status) {
      closeModal();
      showToast(res.data?.message || "Oops! something went wrong.");
    }else{
      showToast(res.error?.message || "Something went wrong.Try again later.", "error", 2500)
    }
  };

  // =====================================================================================================================
  // Edit/Update Link
  // =====================================================================================================================
  const handleEditLink = async e => {
    e.preventDefault();

    if (!title.trim() || !url.trim()) {
      showToast("Oops! invalid title or url.", "error");
      return;
    }

    const data = {
      title,
      url,
      icon: currentFile,
      iconId: clickedLinkItem.iconId,
      id: clickedLinkItem._id
    };

    const res = await updateLink({ data, docType: "customLinks" });

    if (res?.status) {
      closeModal();
      showToast(res.data?.message || "Oops! something went wrong.");
    }else{
      showToast(res.error?.message || "Something went wrong.Try again later.", "error", 2500)
    }
  };

  // =====================================================================================================================
  // Delete Link
  // =====================================================================================================================
  const handleDeleteLink = async () => {
    const res = await deleteLink({
      docId: clickedLinkItem?._id,
      docType: "customLinks"
    });

    if (res?.status) {
      closeModal();
      showToast(res.data?.message || "Oops! something went wrong.");
    }else{
      showToast(res.error?.message || "Something went wrong.Try again later.", "error", 2500)
    }
  };

  return (
    <div
      className={cn("fixed z-50 h-screen w-full right-0 left-0 top-0 bottom-0 bg-black/80 flex items-end", {
        hidden: !isOpenCustomLinkModal
      })}
    >
      <div className="add-link-modal">
        <div className="flex justify-between items-center border-b-[1px] border-gray-200/80 py-6 px-4">
          <h2 className="heading3">{shouldEdit ? "Edit link" : "Add a new link"}</h2>
          <button className="close-btn" onClick={closeModal}>
            <X />
          </button>
        </div>

        <form onSubmit={shouldEdit ? handleEditLink : handleAddLink} className="px-4" encType="multipart/form-data">
           <p className="mt-2 text-sm text-center font-patrickhand bg-orange-100 text-black p-2 rounded">
            🙁 Currently, icon uploading isn't working. Please avoid uploading icons for now.
          </p>
          <div className="my-10 flex justify-center">
            <ImageUploader
              currentFile={currentFile}
              setCurrentFile={setCurrentFile}
              previewUrl={clickedLinkItem?.iconUrl || previewUrl}
              setPreviewUrl={setPreviewUrl}
            />
          </div>
          <div className="my-2">
            <input className="addlink-input" required placeholder="Title" type="text" onChange={e => setTitle(e.target.value)} value={title} />
          </div>
          <div className="my-2">
            <input className="addlink-input" required placeholder="URL" type="url" onChange={e => setUrl(e.target.value)} value={url} />
          </div>
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
  );
};
