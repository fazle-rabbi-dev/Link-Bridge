import { Outlet, Navigate } from "react-router-dom";
import { HeaderDashboard, PageLoader } from "@/components";
import { useAuthStore } from "@/zustand-stores";

export const PrivateLayout = () => {
  const { isLoadingAuth, isLoggedIn } = useAuthStore(state => ({
    isLoadingAuth: state.isLoadingAuth,
    isLoggedIn: state.isLoggedIn
  }));

  if (isLoadingAuth) {
    return <PageLoader />;
  }

  return (
    <>
      {!isLoadingAuth && !isLoggedIn ? (
        <Navigate to="/sign-in" />
      ) : (
        <>
          <HeaderDashboard />
          <main className="min-h-screen pt-36 pb-10 md:pt-44 max-container padding-container">
            <Outlet />
          </main>
        </>
      )}
    </>
  );
};
