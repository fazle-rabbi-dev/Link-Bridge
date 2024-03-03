import { generateAvatar } from "@/lib/utils";

export const Avatar = ({ text }) => {
  return (
    <div className="flex justify-center items-center gap-1 w-8 h-8 rounded-full bg-purple-80 text-purple-100 p-2 dark:bg-purple-70">
      <span>{generateAvatar(text)}</span>
    </div>
  );
};
