import ClipLoader from "react-spinners/ClipLoader";

export const Loading = ({ color, size }) => {
  return (
    <>
      <p className="dark:hidden flex justify-center items-center">
        <ClipLoader
          color={color || "#c7c7c7"}
          size={size || 30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </p>
      <p className="hidden dark:flex justify-center items-center">
        <ClipLoader
          color={color || "#f8f8ff"}
          size={size || 30}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </p>
    </>
  );
};
