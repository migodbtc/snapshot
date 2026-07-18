// ContactSection

import {
  Send,
  Briefcase,
  Mail,
  Code2,
  ArrowRight,
  MessageCircleQuestion,
  Phone,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const ContactSection = () => {
  const router = useRouter();

  return (
    <section className="min-h-[60vh] md:min-h-[70vh] lg:min-h-[75vh] flex flex-col w-full h-fit overflow-hidden mb-16 md:mb-20 lg:mb-24 px-4 md:px-6 lg:px-8">
      <div className="flex-1 flex flex-col lg:flex-row gap-4 px-8 lg:px-0">
        <div className="min-h-96 lg:flex-1 flex flex-col items-center lg:items-start justify-center gap-2 lg:gap-3">
          <span className="text-lg lg:text-xl">
            Got a concern you want to discuss?
          </span>
          <h1 className="font-semibold text-3xl lg:text-4xl text-rose-800">
            Let's have a conversation!
          </h1>
          <p className="text-justify w-md md:w-2xl lg:w-full text-gray-700 dark:text-gray-400 text-lg">
            Interested in my professional career or in similar topics? This
            website has a dedicated section for leaving a message, with my
            socials also included within the website. Click to button below to
            navigate!
          </p>
          <div className="w-fill lg:w-full flex flex-row gap-2">
            <button
              className="
            w-fit
            h-fill
            flex items-center justify-center
            text-lg
            gap-4 mt-4
            py-3 px-5
            rounded-xl
            bg-rose-800
            disabled:opacity-60
            disabled:cursor-not-allowed
            text-slate-50
            font-semibold
            cursor-pointer
            transition-colors
          "
            >
              <Phone size={22} />
              VISIT CONTACT PAGE
              <ArrowRight size={22} />
            </button>
          </div>
        </div>
        <div className="w-md md:w-2xl mx-auto lg:flex-1 flex items-center justify-center relative min-h-120">
          {/* glow — bigger than the image, sits behind it */}
          <div
            className="absolute -inset-8 rounded-xl bg-radial 
          from-slate-500/70 via-slate-300/70
          to-transparent to-60%
          dark:from-slate-500/40 dark:via-slate-400/20 
          dark:to-transparent blur-xl
          "
          />
          <div className="relative w-[60%] md:w-[40%] lg:w-[60%] aspect-3/4">
            {/* image — on top, clips its own corners */}
            <div className="relative w-full h-full rounded-xl overflow-hidden animate-spin [animation-duration:30s]">
              <Image
                src="/images/polaroid.jpg"
                alt="Polaroid"
                className="object-cover"
                loading="eager"
                fill
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
