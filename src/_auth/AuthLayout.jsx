import { Outlet, Navigate } from "react-router-dom";
import { HeaderGuest, Footer, PageLoader } from "@/components";
import { useAuthStore } from "@/zustand-stores";

export const AuthLayout = () => {
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
          <main className="min-h-screen my-28 md:mt-32 py-6 max-container px-6">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};
