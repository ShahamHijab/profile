import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* Tailwind CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        <style>{`
          .neon-link {
            color: white;
            text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff;
          }
          .neon-link:hover {
            text-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff;
          }
        `}</style>
      </Head>
      <body className="bg-black text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}