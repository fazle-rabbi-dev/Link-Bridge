import { useEffect } from "react"
import { Hero, FeatureCard } from "@/components";
import OverviewVideo from "@/components/Misc/OverviewVideo.jsx";
import { features } from "@/constants";
import { Helmet } from "react-helmet-async";

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>LinkBridge - Your Personal Link Hub for Easy Connections</title>
      </Helmet>
      
      <Hero />
      
      {/* Features */}
      <section className="">
        <ul className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
          {features?.map(feature => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </ul>
      </section>
    </>
  );
};
