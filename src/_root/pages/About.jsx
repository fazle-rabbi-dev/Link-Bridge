// The README.md file converted to html and written here
import { Helmet } from "react-helmet-async";

export const About = () => {
  return (
    <section className="prose mt-4 dark:text-white">
      <Helmet>
        <title>About LinkBridge - Your Personal Link Hub for Easy Connections</title>
      </Helmet>

      <h1 id="linkbridge">LinkBridge</h1>

      <p>
        <img src="/thumbnail.jpg" alt="LinkBridge" />
      </p>

      <p>
        LinkBridge is a full-stack MERN linktree application designed to help you organize your social media and other links in one convenient
        location. With LinkBridge, you can create your own profile, essentially a single-page website, in just a few moments.
      </p>

      <h2 id="funfact">Fun Fact</h2>

      <blockquote>
        <p>
          I created this project entirely using my <strong>Android Phone</strong> with apps: Acode &amp; Termux.
        </p>
      </blockquote>

      <h2 id="unveilingthejourneyofbuildinglinkbridge">🔴 Unveiling the Journey of Building LinkBridge</h2>

      <blockquote>
        <p>
          This project represents a significant milestone in my journey as a mern-stack developer. I poured my heart and soul into crafting this
          application, leveraging my MERN stack skills and embracing the principles of clean code and industry best practices.
        </p>
      </blockquote>

      <p>
        👉 I took design inspiration for this project from{" "}
        <a target="_blank" href="https://bio.link">
          bio link.
        </a>
      </p>

      <h2 id="projectcreatedat">Project Created at</h2>

      <ul>
        <li>
          🗓 <strong>Feb 2024 - March 2024</strong>
        </li>
      </ul>

      <h2 id="technologiesused">Technologies Used ⚒️</h2>

      <ul>
        <li>Vite + React</li>

        <li>Tailwind CSS</li>

        <li>Float UI</li>

        <li>Appwrite</li>

        <li>Cloudinary</li>

        <li>React-Query</li>

        <li>Zustand</li>

        <li>Node.js + Express.js</li>

        <li>MongoDB with Mongoose</li>

        <li>Jsonwebtoken</li>
      </ul>

      <h2 id="features">Features</h2>

      <ul>
        <li>👥 Authentication with email &amp; password, Google, and GitHub</li>

        <li>🔑 Forgot password functionality</li>

        <li>🔒 Secure password change</li>

        <li>💼 Update account details</li>

        <li>🖼 Change profile photo</li>

        <li>🔗 Add custom links with title, URL &amp; icon</li>

        <li>🌐 Add social media links</li>

        <li>🎨 Customize with predefined themes</li>

        <li>🎨 Create your own theme</li>

        <li>📝 Change fonts</li>

        <li>🚪 Logout functionality</li>

        <li>🌙 Dark theme feature</li>

        <li>📈 Link stats (showing how many times and at what times your links get clicked)</li>
      </ul>

      <h2 id="screenshots">Screenshots</h2>

      <div align="center" class="">
        <img width="100%" src="/showcase.jpg" alt="" />
      </div>

      <h2 id="livedemo">Live Demo 🎉</h2>

      <ul>
        <li>
          Explore the live version of LinkBridge{" "}
          <a target="_blank" href="https://linkbridge.vercel.app">
            here
          </a>
          .
        </li>

        <li>
          <strong>Backend:</strong> Explore the backend part of this app{" "}
          <a target="_blank" href="https://github.com/fazle-rabbi-dev/link-bridge-api">
            here
          </a>
          .
        </li>
      </ul>

      <h2 id="connectwithme">📬 Connect with me</h2>

      <blockquote>
        <p>Let's connect! Reach out for collaborations, projects, or just a friendly chat.</p>
      </blockquote>

      <ul>
        <li>
          <a target="_blank" href="https://linkedin.com/in/fazlerabbidev">
            LinkedIn
          </a>
        </li>

        <li>
          <a target="_blank" href="https://twitter.com/fazle_rabbi_dev">
            Twitter
          </a>
        </li>

        <li>
          <a target="_blank" href="https://medium.com/@fazle-rabbi-dev">
            Medium
          </a>
        </li>

        <li>
          <a target="_blank" href="https://dev.to/fazle-rabbi-dev">
            Dev.to
          </a>
        </li>

        <li>
          <a target="_blank" href="https://facebook.com/fazlerabbidev">
            Facebook
          </a>
        </li>

        <li>
          <a target="_blank" href="https://instagram.com/fazle_rabbi_dev">
            Instagram
          </a>
        </li>
      </ul>
    </section>
  );
};
