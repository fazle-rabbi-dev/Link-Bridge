import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { NavLinks } from "@/constants";
import { createSlug } from "@/lib/utils";

export const DashboardNavLinks = () => {
  const { pathname } = useLocation();
  
  return (
    <nav className="max-container mt-5 md:mt-8">
      <ul className="flex gap-4 items-center overflow-auto hide-scrollbar dark:text-ghostwhite">
        {NavLinks?.map(link => (
          <li
            key={link.id}
            className={`${
              createSlug(link) === pathname &&
              "border-b-[1.6px] border-purple-70"
            }`}
          >
            <Link className="py-1 md:text-[20px]" to={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
