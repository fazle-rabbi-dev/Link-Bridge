export const Button = ({ onClick, Icon, label, type, variant, full }) => {
  return (
    <button
      onClick={onClick || (() => {})}
      className={`rounded-md px-4 py-2 ${variant} ${full && "w-full justify-center"} ${Icon && "flex gap-1 items-center"}`}
      type={type || "button"}
    >
      {Icon && (
        <span>
          <Icon size={20} />
        </span>
      )}
      {label}
    </button>
  );
};
