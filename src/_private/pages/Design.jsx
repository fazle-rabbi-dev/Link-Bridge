import { Profile, Themes, CustomStyle, Position, PageLoader } from "@/components";
import { useAuthStore, useThemeStore } from "@/zustand-stores";
import { useEffect } from "react";
import { Helmet } from 'react-helmet-async';

export const Design = () => {
  const user = useAuthStore(state => state.user);
  const setDesign = useThemeStore(state => state.setDesign);

  useEffect(() => {
    if (user?.design) {
      setDesign(user?.design);
    }
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Customize Profile</title>
      </Helmet>
      <Profile />
      <Themes />
      <CustomStyle />
      <Position />
    </>
  );
};
