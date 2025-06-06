import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex flex-col w-full p-2 py-8 mt-auto justify-center items-center text-tx-secondary font-semibold">
      <div className="flex w-full gap-2 p-4 border-t border-lines/50 justify-center items-center text-tx-on-primary">
        <Link
          href="https://github.com/danielsantosbr255"
          target="_blank"
          className="bg-primary shadow-xs p-1 rounded-md hover:scale-110 transition-transform duration-300"
        >
          <FaGithub size={20} />
        </Link>
        <Link
          href="https://www.linkedin.com/in/daniel-santos-7826051b4/"
          target="_blank"
          className="bg-primary shadow-xs p-1 rounded-md hover:scale-110 transition-transform duration-300"
        >
          <FaLinkedin size={20} />
        </Link>
      </div>

      <p>©2024 Fireforge Labs. All rights reserved.</p>

      <p>Privacy Policy | Terms of Service</p>
      <p className="text-sm text-tx-secondary flex gap-2">
        <a className="flex gap-2" href="https://github.com/danielsantosbr255" target="_blank">
          <FaGithub size={20} /> Created by Daniel Santos
        </a>
      </p>
    </footer>
  );
}
