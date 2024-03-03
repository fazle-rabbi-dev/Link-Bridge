import { useLinkStore } from "@/zustand-stores";

export const LinkCard = ({ cardData }) => {
  const { openCustomLinkModal, setClickedLinkItem, setShouldEdit } = useLinkStore(state => ({
    openCustomLinkModal: state.openCustomLinkModal,
    setClickedLinkItem: state.setClickedLinkItem,
    setShouldEdit: state.setShouldEdit
  }));

  const handleClick = () => {
    openCustomLinkModal();
    setClickedLinkItem(cardData);
    setShouldEdit(true);
  };
  
  return (
    <button onClick={handleClick} className="link-card">
      <h2 className="base-semibold ">{cardData?.title}</h2>
      <p className="body-text break-all">
        {cardData?.url.slice(0, 30)} {cardData?.url.length > 30 && "..."}
      </p>
    </button>
  );
};
