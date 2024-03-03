// The README.md file converted to html and written here
import { Helmet } from "react-helmet-async";

export const About = () => {
  return (
    <section className="prose dark:text-white">
      <Helmet>
        <title>About LinkBridge - Your Personal Link Hub for Easy Connections</title>
      </Helmet>
      
      <h1 id="linkbridge">LinkBridge</h1>

      <p>
        <img src="/public/thumbnail.jpg" alt="LinkBridge" />
      </p>

      <p>
        LinkBridge is a full-stack MERN linktree application designed to help you organize your social media and other links in one convenient
        location. With LinkBridge, you can create your own profile, essentially a single-page website, in just a few moments.
      </p>

      <h2 id="unveilingthejourneyofbuildinglinkbridge">🔴 Unveiling the Journey of Building LinkBridge</h2>

      <p>
        This project represents a significant milestone in my journey as a full-stack developer. I poured my heart and soul into crafting this
        application, leveraging my MERN stack skills and embracing the principles of clean code and industry best practices.
      </p>

      <h2 id="projectcreatedat">Project Created at</h2>

      <ul>
        <li>
          🗓 <strong>Feb 2024 - Feb 2024</strong>
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
      </ul>

      <h2 id="livedemo">Live Demo 🎉</h2>

      <ul>
        <li>
          Explore the live version of LinkBridge <a href="https://linkbridge.vercel.app">here</a>.
        </li>

        <li>
          <strong>Backend:</strong> Explore the backend part of this app <a href="#">here</a>.
        </li>
      </ul>

      <h2 id="envsetup">.env Setup</h2>

      <pre>
        <code class="sh language-sh"># Add your environment variables here</code>
      </pre>

      <h2 id="connectwithme">📬 Connect with me</h2>

      <p>Let's connect! Reach out for collaborations, projects, or just a friendly chat.</p>

      <ul>
        <li>
          <a href="https://linkedin.com/in/fazlerabbidev">LinkedIn</a>
        </li>

        <li>
          <a href="https://twitter.com/fazle_rabbi_dev">Twitter</a>
        </li>

        <li>
          <a href="https://medium.com/@fazle-rabbi-dev">Medium</a>
        </li>

        <li>
          <a href="https://dev.to/fazle-rabbi-dev">Dev.to</a>
        </li>

        <li>
          <a href="https://facebook.com/fazlerabbidev">Facebook</a>
        </li>

        <li>
          <a href="https://instagram.com/fazle_rabbi_dev">Instagram</a>
        </li>
      </ul>

      <p>Feel free to explore, contribute, and get inspired!</p>
    </section>
  );
};
