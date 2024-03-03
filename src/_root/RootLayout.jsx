import { Outlet, Navigate } from "react-router-dom";
import { HeaderGuest, Footer, PageLoader } from "@/components";
import { useAuthStore } from "@/zustand-stores";

export const RootLayout = () => {
  const { isLoadingAuth, isLoggedIn } = useAuthStore(state => ({
    isLoadingAuth: state.isLoadingAuth,
    isLoggedIn: state.isLoggedIn
  }));

  if (isLoadingAuth) {
    return <PageLoader />;
  }

  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/dashboard/links" />
      ) : (
        <>
          <HeaderGuest />
          <main className="min-h-screen mt-20 md:mt-32 py-6 max-container padding-container">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};
