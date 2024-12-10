import { Logo } from "@/lib/static";
import {
  Dribbble,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="p-4 bg-primary sm:p-6 w-full">
      <div className="flex justify-center md:justify-start items-center">
        <div className="mb-3 md:mb-0">
          <Link href="/" className="flex gap-8 items-center">
            <Image
              src={Logo}
              className="w-10 md:w-36 object-contain"
              alt="Logo"
              width={144}
              height={100}
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-headingColor">
              Mealify
            </span>
          </Link>
        </div>
      </div>
      <hr className="my-2 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
        <span className="text-sm text-gray-500 text-center dark:text-gray-400">
          © {new Date().getFullYear()} a7mdmo74. All Rights Reserved.
        </span>
        <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0 md:text-xl">
          <Link
            target={"_blank"}
            rel="noreferrer"
            href="https://qbentil.me"
            className="text-textColor h-10 w-10 bg-primary rounded-full flex items-center justify-center"
          >
            <Dribbble />
          </Link>
          <Link
            target={"_blank"}
            rel="noreferrer"
            href="https://github.com/qbentil"
            className="text-textColor h-10 w-10 bg-primary rounded-full flex items-center justify-center"
          >
            <Github />
          </Link>
          <Link
            target={"_blank"}
            rel="noreferrer"
            href="https://linkedin.com/in/bentil"
            className="text-textColor h-10 w-10 bg-primary rounded-full flex items-center justify-center"
          >
            <Linkedin />
          </Link>
          <Link
            target={"_blank"}
            rel="noreferrer"
            href="https://twitter.com/themanbentil"
            className="text-textColor h-10 w-10 bg-primary rounded-full flex items-center justify-center"
          >
            <Twitter />
          </Link>
          <Link
            target={"_blank"}
            rel="noreferrer"
            href="https://instagram.com/qbentil"
            className="text-textColor h-10 w-10 bg-primary rounded-full flex items-center justify-center"
          >
            <Instagram />
          </Link>
          <Link
            target={"_blank"}
            rel="noreferrer"
            href="https://facebook.com/qbentil"
            className="text-textColor h-10 w-10 bg-primary rounded-full flex items-center justify-center"
          >
            <Facebook />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
