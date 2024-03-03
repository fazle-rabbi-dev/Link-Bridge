export const PageLoader = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div class="spinner">
        {new Array(10).fill().map((_, index) => (
          <div key={index} class="dark:bg-white"></div>
        ))}
      </div>
    </div>
  );
};
