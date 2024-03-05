import { Plus } from "lucide-react";
import { useState } from "react";
import { Button, LinkCard, SocialLinkCard, AddLinkModal, AddSocialLinkModal, Loading } from "@/components";
import { useGetLinks } from "@/lib/react-query";
import { useLinkStore, useAuthStore } from "@/zustand-stores";
import { Helmet } from 'react-helmet-async';

export const Links = () => {
  const { openCustomLinkModal, openSocialLinkModal } = useLinkStore(state => ({
    openCustomLinkModal: state.openCustomLinkModal,
    openSocialLinkModal: state.openSocialLinkModal
  }));

  // Queries & Mutation From React-Query
  const { data: links, isPending: isLoadingLinks, isError } = useGetLinks();
  const customLinks = links?.data?.data?.customLinks || [];
  const socialLinks = links?.data?.data?.socialLinks || [];
  
  if (isError) {
    return <p className="error-message text-center m-4">⚠️ Something went wrong!</p>;
  }
  
  return (
    <>
      <Helmet>
        <title>Your Links</title>
      </Helmet>
    
      {/* All Custom Links */}
      <section className="my-6">
        <button class="comic-button flex items-center gap-2" onClick={openCustomLinkModal}>
          <Plus />
          Add Link
        </button>

        <ul className="mt-8 flex flex-col gap-4">
          {customLinks?.map((cardData, index) => (
            <li key={cardData._id?.toString() || index}>
              <LinkCard cardData={cardData} />
            </li>
          ))}
        </ul>

        {isLoadingLinks && (
          <div className="my-2">
            <Loading size={20} />
          </div>
        )}
      </section>

      {/* Social Links */}
      <section className="mt-16">
        <h2 className="heading4 text-gray-80 dark:text-gray-60">SOCIALS</h2>

        <ul className="mt-4 flex flex-col gap-4">
          {socialLinks?.map((cardData, index) => (
            <li key={cardData._id?.toString() || index}>
              <SocialLinkCard cardData={cardData} />
            </li>
          ))}
        </ul>

        {isLoadingLinks && (
          <div className="mt-2">
            <Loading size={24} />
          </div>
        )}

        <Button onClick={() => openSocialLinkModal(true)} Icon={Plus} label="Add socials" variant="mt-4 text-purple-70 dark:text-purple-60" full />
      </section>

      <AddLinkModal />
      <AddSocialLinkModal />
    </>
  );
};
