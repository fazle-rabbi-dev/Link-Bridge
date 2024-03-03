import { Routes, Route } from "react-router-dom";
import { AuthLayout, Signin, Signup, ForgotPassword, ConfirmAccount, ResetPassword } from "@/_auth";
import { PrivateLayout, Links, Design, Stats, Settings, AccountSettings } from "@/_private";
import { RootLayout, Home, About, NotFound } from "@/_root";

import { LinkTree } from "@/_linktree";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<Signin />} />,
        <Route path="/sign-up" element={<Signup />} />,
        <Route path="/forgot-password" element={<ForgotPassword />} />,
        <Route path="/reset-password" element={<ResetPassword />} />,
        <Route path="/confirm-account" element={<ConfirmAccount />} />
      </Route>

      <Route element={<PrivateLayout />}>
        <Route path="/dashboard/links" element={<Links />} />
        <Route path="/dashboard/design" element={<Design />} />
        <Route path="/dashboard/stats" element={<Stats />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/user/account-settings" element={<AccountSettings />} />
      </Route>

      <Route path="/:username" element={<LinkTree />} />

      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/about/linkbridge" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
