import React from "react";

export const FeatureCard = ({ feature }) => {
  const { title, icon, description } = feature;

  return (
    <li className="bg-white rounded-md shadow-md p-6 dark-mode">
      <div className="">
        <p className="mb-4">
          <span className="bg-gray-50/30 p-2 rounded text-xl dark:bg-gray-500/30">{icon}</span>
        </p>
        <h2 className="heading4">{title}</h2>
        <p className="mt-2 body-regular">{description}</p>
      </div>
    </li>
  );
};
