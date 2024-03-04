import { X } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const DateModal = ({ openDateModal, setOpenDateModal, link }) => {
  return (
    <div className={`${!openDateModal && "hidden"} fixed z-50 top-0 bottom-0 left-0 w-full min-h-screen bg-black/70 flex`}>
      <div className="w-full overflow-auto m-4 bg-white shadow-md rounded-md p-4 dark-mode">
        <div className="flex justify-end">
          <button className="close-btn" onClick={() => setOpenDateModal(false)} type="button">
            <X />
          </button>
        </div>
        <h2 className="heading3">Link Clicked At 👇</h2>

        <ul className="h-[80%] border-[.5px] border-gray-100 p-2 overflow-scroll mt-4 space-y-2 dark:border-gray-50/20">

          {link?.clickHistory.length === 0 && <span>Haven't clicked yet !</span>}

          {link?.clickHistory.map((history, index) => (
            <li key={history._id} className="text-sm text-gray-80 dark:text-gray-50">
              {formatDate(history.clickedAt)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
