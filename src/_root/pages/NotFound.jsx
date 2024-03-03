import { Helmet } from "react-helmet-async";

export const NotFound = () => {
  return (
    <section className="font-patrickhand text-2xl min-h-screen flex justify-center items-center">
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      
      <div className="flex gap-2 justify-center items-center">
        <p className="font-bold font-black">404</p>
        <span> | </span>
        <p className="">Page Not Found</p>
      </div>
    </section>
  );
};
