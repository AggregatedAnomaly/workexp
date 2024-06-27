import { Inter } from "next/font/google";

import Starfield from "@/components/starfield";
import { cn } from "@/utils/styling";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spacefarer's Datapad",
  description:
    "The galactic traveller's best friend, recommended by all ace starship pilots: the Spacefarer's Datapad.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(inter, "flex flex-col w-full h-screen justify-between")}
      >
        <div className="w-full mx-auto mb-auto pb-4 rounded-lg md:w-11/12 md:px-3 md:max-w-screen-xl">
          <Starfield />
          <div className="text-yellow-500 py-6 h-full">{children}</div>
        </div>
        <footer className="bg-teal-500/30 border-t-2 w-full border-teal-500 p-3 text-yellow-600">
          <div className="flex flex-row gap-4 mx-auto justify-evenly">
            <div>
              <h3>Made with:</h3>
              <ul>
                <li>
                  <a
                    className="underline text-teal-300"
                    href="https://stapi.co/"
                    target="_blank"
                  >
                    Star Trek API
                  </a>
                </li>
                <li>
                  <a
                    className="underline text-teal-300"
                    href="https://swapi.dev/"
                    target="_blank"
                  >
                    Star Wars API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3>Our Team</h3>
              <ul>
                <li>Dev Name #1</li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
