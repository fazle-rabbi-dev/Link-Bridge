import { Twitter } from "lucide-react";
import { useLinkStore } from "@/zustand-stores";

export const SocialLinkCard = ({ cardData }) => {
  const { openSocialLinkModal, setClickedLinkItem, setShouldEdit } = useLinkStore(state => ({
    openSocialLinkModal: state.openSocialLinkModal,
    setClickedLinkItem: state.setClickedLinkItem,
    setShouldEdit: state.setShouldEdit
  }));
  
  const handleClick = () => {
    openSocialLinkModal(true);
    setClickedLinkItem(cardData);
    setShouldEdit(true);
  };

  return (
    <button onClick={handleClick} className="social-card">
      <div className="flex items-center gap-2">
        <span>
          <Twitter size={20} />
        </span>
        <h2 className="base-semibold">{cardData?.title}</h2>
      </div>
      <p className="body-text">
        {cardData?.url.slice(0, 20)} {cardData?.url.length > 20 && "..."}
      </p>
    </button>
  );
};
