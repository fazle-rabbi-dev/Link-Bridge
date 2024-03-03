import MoonLoader from "react-spinners/MoonLoader";

export const Loading = ({ color, size }) => {
  return (
    <>
      <p className="dark:hidden flex justify-center items-center">
        <MoonLoader
          color={color || "#ededed"}
          // loading={loading}
          // cssOverride={override}
          size={size || 20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </p>
      <p className="hidden dark:flex justify-center items-center">
        <MoonLoader
          color={color || "#222"}
          // loading={loading}
          // cssOverride={override}
          size={size || 20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </p>
    </>
  );
};
