import { generateAvatar } from "@/lib/utils";

export const Avatar = ({ text, size }) => {
  return (
    <div style={{
        height: size || "32px",
        width: size || "32px"
      }} 
      className={`flex justify-center items-center gap-1 rounded-full bg-purple-80 text-purple-100 p-2 dark:bg-purple-70`}
    >
      <span className={`${parseInt(size) > 50 && "text-3xl"}`}>{generateAvatar(text)}</span>
    </div>
  );
};
