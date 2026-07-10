// ContactSection

import { Send, Briefcase, Mail, Code2, ArrowRight, MessageCircleQuestion } from "lucide-react";
import { useRouter } from "next/navigation";

export const ContactSection = () => {
  const router = useRouter();

  return (
    <section className="min-h-[60vh] md:min-h-[70vh] lg:min-h-[75vh] flex flex-col w-full h-fit overflow-hidden mb-16 md:mb-20 lg:mb-24 px-4 md:px-6 lg:px-8">

      {/* Header */}
      <div className="flex flex-col px-6 mb-4 w-full h-fit items-center justify-center gap-3 mt-8 md:mt-10 lg:mt-12">
        <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-600 dark:text-slate-400">
          Contact
        </h1>
      </div>

      {/* CTA Card */}
      <div
        className="
          relative
          w-full max-w-md md:max-w-xl lg:max-w-2xl mx-auto
          h-fit lg:aspect-video
          overflow-hidden
          rounded-xl
          border border-slate-300
          dark:border-slate-800
          backdrop-blur-md
          bg-slate-50/50
          dark:bg-slate-950/30
          p-6 md:p-7 lg:p-8
          py-6 md:pt-8 lg:py-10
          flex flex-col items-center
          gap-3 md:gap-4
          text-center
          my-auto
          justify-center
        "
      >
        <div className="absolute inset-0 -z-10 bg-radial from-slate-300/40 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

        <MessageCircleQuestion size={28} className="md:hidden text-rose-800" />
        <MessageCircleQuestion size={32} className="hidden md:block lg:hidden text-rose-800" />
        <MessageCircleQuestion size={36} className="hidden lg:block text-rose-800" />

        <h2 className="text-xl md:text-2xl lg:text-3xl tracking-wide">
          Got a concern in mind? <b className="text-rose-800">Let's connect!</b>
        </h2>

        <p className="text-sm md:text-base text-gray-700 dark:text-gray-400 text-justify">
          I'm always up for a conversation about software engineering, web development, or the industry in general. Send me a message directly, or reach out through one of the links below.
        </p>

        {/* CTA Button — routes to full contact form */}
        <button
          onClick={() => router.push('/contact')}
          className="
            mt-2 md:mt-3 lg:mt-4
            flex items-center gap-2 md:gap-2.5 lg:gap-3
            rounded-xl
            bg-rose-800
            hover:bg-rose-700
            transition-colors
            cursor-pointer
            px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4
            text-sm md:text-base lg:text-lg
            font-semibold
            text-slate-50
          "
        >
          <Send size={18} className="md:hidden" />
          <Send size={20} className="hidden md:block lg:hidden" />
          <Send size={22} className="hidden lg:block" />
          Send a Message
          <ArrowRight size={18} className="md:hidden" />
          <ArrowRight size={20} className="hidden md:block lg:hidden" />
          <ArrowRight size={22} className="hidden lg:block" />
        </button>
      </div>

    </section>
  );
};