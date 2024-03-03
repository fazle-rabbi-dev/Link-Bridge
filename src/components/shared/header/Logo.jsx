import { Link } from "react-router-dom";

export const Logo = ({ redirect = "/" }) => {
  return (
    <Link to={redirect}>
      <p className="h-8 w-12 tracking-wide md:h-10 md:w-16 border-[1.7px] border-black/80 text-[10px] md:text-[13px] text-black/80 font-satoshi-medium font-bold flex flex-col justify-center pl-1 dark:text-ghostwhite dark:border-ghostwhite">
        <span>LINK</span>
        <span className="-mt-1">BRIDGE</span>
      </p>
    </Link>
  );
};
