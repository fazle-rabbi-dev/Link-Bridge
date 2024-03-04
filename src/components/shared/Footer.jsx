import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white mt-10 px-6 py-4 md:bg-transparent md:max-w-4xl md:mx-auto dark-mode md:dark:bg-transparent">
      <div className="my-4 text-sm flex flex-col gap-2 md:flex-row md:justify-center md:items-center md:gap-6">
        <p>
          Made with &hearts; by{" "}
          <Link className="border-b-[1px] border-purple-70" target="_blank" to="https://bio.link/fazle_rabbi_dev">
            Fazle Rabbi
          </Link>
        </p>
        <span className="text-sm text-gray-80 dark-text2">&copy; 2024-{new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};
