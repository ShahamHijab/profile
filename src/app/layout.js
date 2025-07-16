export const metadata = {
  title: "Profile",
  description: "Developer portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>{`
          body {
            font-family: "Times New Roman", serif;
          }

          .neon-link {
            position: relative;
            color: white;
            text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff;
            transition: all 0.3s ease-in-out;
          }

          .neon-link::before {
            content: "";
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0%;
            height: 2px;
            background: #ff00ff;
            box-shadow: 0 0 10px #ff00ff, 0 0 20px #ff00ff;
            transition: width 0.4s ease-in-out;
          }

          .neon-link:hover::before {
            width: 100%;
          }

          .neon-link:hover {
            text-shadow:
              0 0 5px #ff00ff,
              0 0 10px #ff00ff,
              0 0 20px #ff00ff,
              0 0 40px #ff00ff,
              0 0 60px #ff00ff;
          }

          .neon-icon {
            filter: drop-shadow(0 0 5px #ff00ff) drop-shadow(0 0 10px #ff00ff);
            transition: filter 0.3s ease-in-out;
          }

          .neon-icon:hover {
            filter:
              drop-shadow(0 0 5px #ff00ff)
              drop-shadow(0 0 10px #ff00ff)
              drop-shadow(0 0 20px #ff00ff)
              drop-shadow(0 0 40px #ff00ff);
          }
        `}</style>
      </head>

      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
