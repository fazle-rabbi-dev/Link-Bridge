import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Rocket } from "lucide-react";
import { useGetLinktreeProfile } from "@/lib/react-query";
import { PageLoader, Avatar } from "@/components";
import { socials } from "@/constants";
import { cn } from "@/lib/utils";
import { countLinkClick } from "@/lib/api";
import { Helmet } from "react-helmet-async";

const generateIcon = social => {
  return socials?.find(item => item.name.toLowerCase() === social.title.toLowerCase()).icon;
};

export const LinkTree = () => {
  const { username } = useParams();
  const { data: user, isPending: isLoadingUser } = useGetLinktreeProfile(username);
  const design = user?.design;

  const handleClickCount = async (linkType, linkId) => {
    const data = {
      creator: user?._id.toString(),
      linkType
    };

    const res = await countLinkClick(linkId, data);
  };

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, [user]);

  if (isLoadingUser) {
    return <PageLoader />;
  }

  if (!isLoadingUser && !user) {
    return (
      <div className="m-5">
        <h1 className="mb-5 heading3">Profile Not Found.</h1>
        <Link className="px-4 py-3 rounded-md bg-black/90 text-white" to="/">
          Go to home
        </Link>
      </div>
    );
  }

  return (
    <main
      style={{
        backgroundColor: design?.theme !== "default" && design?.background?.color,
        color: design?.fontStyle?.fontColor,
        backgroundImage: design?.background.image.url && `url(${design?.background.image.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      className={cn("min-h-screen py-10 md:py-20", design?.theme, design?.fontStyle?.fontFamily)}
    >
      <Helmet>
        <title>{user?.seoMetadata?.title || "Linktree"}</title>
        <meta name="description" content={user?.seoMetadata?.desc || "Linktree profile"} />
      </Helmet>
      
      <div className="max-container padding-container">
        <section>
          <div className="">
            <button className="bg-gray-800 text-white p-2 rounded-full" type="button">
              <Link className="" to="/">
                <Rocket />
              </Link>
            </button>
          </div>

          <div className="text-center">
            <div className="flex justify-center items-center">
              {user?.profilePic?.url ? (
                <img className="w-20 h-20 block mx-auto rounded-full" src={user?.profilePic?.url} alt={username} />
              ) : (
                <Avatar text={user?.name.slice(0, 2)} />
              )}
            </div>
            <h2 className="heading3 mt-2">{user?.name}</h2>
            <p className="text-sm -mt-2">@{user?.username}</p>
            <p className="mt-2">{user?.bio}</p>
          </div>
        </section>

        <section className={`mt-10 flex flex-col gap-6 ${user?.design?.socialPosition.toLowerCase() !== "top" && "flex-col-reverse"}`}>
          <ul className="flex justify-center gap-2">
            {user?.links?.socialLinks.map(social => (
              <li key={social._id} className="text-3xl">
                <Link onClick={() => handleClickCount("social", social?._id)} target="_blank" to={social.url}>
                  <span dangerouslySetInnerHTML={{ __html: generateIcon(social) }}></span>
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex flex-col gap-2">
            {user?.links?.customLinks.map(link => (
              <button
                key={link._id}
                type="button"
                className={cn("text-center bg-black/90 text-white py-2 px-3", design?.buttonStyle.radius)}
                style={{
                  backgroundColor: design?.buttonStyle?.bgColor,
                  color: design?.buttonStyle?.textColor
                }}
              >
                <Link onClick={() => handleClickCount("custom", link?._id)} target="_blank" to={link.url}>
                  {link.title}
                </Link>
              </button>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};
