import Link from "next/link";
import Image from "next/image";
import config from "@/config";
import logo from "@/app/icon.png";

// Add the Footer to the bottom of your landing page and more.
// The support link is connected to the config.js file. If there's no config.mailgun.supportEmail, the link won't be displayed.

const Footer = () => {
  return (
    <footer className="bg-black border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div
          clas
          sName=" flex lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col"
        >
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <Link
              href="/#"
              aria-current="page"
              className="flex gap-2 justify-center md:justify-start items-center"
            >
              <Image
                src={logo}
                alt={`${config.appName} logo`}
                priority={true}
                className="w-6 h-6"
                width={24}
                height={24}
              />
              <strong className="font-extrabold tracking-tight text-base md:text-lg text-white">
                {config.appName}
              </strong>
            </Link>

            <p className="mt-3 text-sm text-white/80">
              {config.appDescription}
            </p>
            <p className="mt-3 text-sm text-white/60">
              Copyright © {new Date().getFullYear()} - All rights reserved
            </p>
          </div>
          <div className="flex-grow flex flex-wrap justify-center -mb-10 md:mt-0 mt-10 text-center">
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="font-semibold text-white tracking-widest text-sm md:text-left mb-3">
                LINKS
              </div>

              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                {config.mailgun.supportEmail && (
                  <a
                    href={`mailto:${config.mailgun.supportEmail}`}
                    target="_blank"
                    className="text-white/70 hover:text-white transition-colors"
                    aria-label="Contact Support"
                  >
                    Support
                  </a>
                )}
                <Link
                  href="/#pricing"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="/blog"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Blog
                </Link>
                <a
                  href="/#"
                  target="_blank"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Affiliates
                </a>
              </div>
            </div>

            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <div className="font-semibold text-white tracking-widest text-sm md:text-left mb-3">
                LEGAL
              </div>

              <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-10 text-sm">
                <Link
                  href="/tos"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Terms of services
                </Link>
                <Link
                  href="/privacy-policy"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Privacy policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
