import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Hero = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    if (!username.trim()) {
      setUsername("");
      return;
    }

    navigate(`/sign-up?username=${username}`);
  };

  return (
    <section className="">
      <h1 className="text-center heading3 ">Launch your site in seconds</h1>

      <form onSubmit={handleSubmit} className="mt-10 rounded-md gradient_purple-pink flex items-center ">
        <div className="bg-white rounded-l-md m-[1.6px] px-2 py-3 flex gap-1 flex-1 items-center dark:bg-dark-primary">
          <span className="font-normal">linkbridge/</span>
          <input
            required
            onChange={e => setUsername(e.target.value)}
            placeholder="yourname"
            className="w-full font-normal text-black outline-0 bg-transparent focus:ring-0 dark:text-white"
            type="text"
            value={username}
          />
        </div>
        <button className="w-[40%] md:w-[30%] text-white text-sm m-[1.6px] py-3" type="submit">
          Claim my link
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm">It’s free, and takes less than a minute</p>
        <h2 className="mt-4 heading3">
          Unmatchable features.
          <span className="text-gradient_purple-pink">Free, forever.</span>
        </h2>
      </div>

      <div className="mt-4 w-full text-center" type="button">
        <Link className="font-bold underline" to="/about/linkbridge">
          About
        </Link>
      </div>
    </section>
  );
};
