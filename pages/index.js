import React from "react";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <main className=" flex items-center justify-center h-screen">
        <button className="flex justify-content transition ease-in-out hover:text-purple-800 font-bold ">
          <Link href="/profiles">
            <a className="text-5xl font-bold flex content-align">
              Get Started
              <FaGithub className="ml-5" />
            </a>
          </Link>
        </button>
      </main>
    </div>
  );
}
