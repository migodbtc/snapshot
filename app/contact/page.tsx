"use client"

import { ArrowLeft, Briefcase, Code2, Mail, PhoneCallIcon, Send } from "lucide-react";
import { useRouter } from "next/navigation"
import { useState } from "react";

// email me. I don't know why you would email me. But here we go.
export const ContactButton = ({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ElementType;
  label: string;
  href?: string;
}) => {
  return (
    <button
      onClick={() => href && window.open(href, "_blank")}
      className="
        text-xs lg:text-sm
        group
        relative
        overflow-hidden
        rounded-xl
        border border-slate-300
        dark:border-slate-800
        backdrop-blur-md
        py-2 px-4
        flex flex-row gap-2
        justify-center items-center
        cursor-pointer
        text-slate-900
        dark:text-slate-50
        transition-transform
        duration-300
        hover:scale-[1.02]
      "
    >
      {/* Base glass layer, same as cards */}
      <div className="absolute inset-0 -z-10 bg-radial from-slate-400/25 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

      {/* Hover shine layer */}
      <div
        className="
          absolute inset-0 -z-10
          bg-radial from-slate-300/40 via-slate-200/10 to-transparent
          dark:from-slate-400/30 dark:via-slate-300/10 dark:to-transparent
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-300
        "
      />

      <Icon size={18} />
      {label}
    </button>
  );
};

export const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        group
        relative
        overflow-hidden
        w-full
        rounded-xl
        border border-slate-300
        dark:border-slate-800
        backdrop-blur-md
        p-4 md:p-6
        flex flex-col
        gap-2
      "
    >

      {/* Glass base layer (Commented because background already has a gradient)
      <div className="absolute inset-0 -z-10 bg-radial from-slate-400/25 via-slate-200/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" /> */}
        <h1 className="text-base tracking-wide text-justify mb-2 font-semibold flex flex-row gap-2 items-center ">
            <Send size={16} className="text-rose-800"/>
            Let's Chat
        </h1>

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="name"
          className="text-xs lg:text-sm text-slate-700 dark:text-slate-300"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Juan Dela Cruz"
          required
          className="
            rounded-lg
            border border-slate-300
            dark:border-slate-700
            bg-slate-50/50
            dark:bg-slate-900/50
            px-3 py-2
            text-sm
            text-slate-900
            dark:text-slate-50
            placeholder:text-slate-400
            dark:placeholder:text-slate-500
            focus:outline-none
            focus:border-rose-400
            dark:focus:border-rose-700
            transition-colors
          "
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="email"
          className="text-xs lg:text-sm text-slate-700 dark:text-slate-300"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="juan@example.com"
          required
          className="
            rounded-lg
            border border-slate-300
            dark:border-slate-700
            bg-slate-50/50
            dark:bg-slate-900/50
            px-3 py-2
            text-sm
            text-slate-900
            dark:text-slate-50
            placeholder:text-slate-400
            dark:placeholder:text-slate-500
            focus:outline-none
            focus:border-rose-400
            dark:focus:border-rose-700
            transition-colors
          "
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="message"
          className="text-xs lg:text-sm text-slate-700 dark:text-slate-300"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="What's on your mind?"
          required
          className="
            rounded-lg
            border border-slate-300
            dark:border-slate-700
            bg-slate-50/50
            dark:bg-slate-900/50
            px-3 py-2
            text-sm
            text-slate-900
            dark:text-slate-50
            placeholder:text-slate-400
            dark:placeholder:text-slate-500
            focus:outline-none
            focus:border-rose-400
            dark:focus:border-rose-700
            transition-colors
            resize-none
          "
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="
          mt-2
          py-2 px-4
          rounded-lg
          bg-rose-800
          hover:bg-rose-700
          disabled:opacity-60
          disabled:cursor-not-allowed
          text-slate-50
          text-sm
          font-semibold
          cursor-pointer
          transition-colors
          uppercase
          flex
          items-center
          gap-2
          justify-center
        "
      >
        <Send />
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {/* Status messages */}
      {status === "success" && (
        <p className="text-xs lg:text-sm text-rose-700 dark:text-rose-300">
          Message sent! I'll get back to you soon.
        </p>
      )}

      {status === "error" && (
        <p className="text-xs lg:text-sm text-slate-700 dark:text-slate-300">
          Something went wrong — please try again. (P.S. The form isn't working for now since I haven't scaffolded the endpoint ++ other stuff haha)
        </p>
      )}
    </form>
  );
};

export default function EducationPage() {
    const router = useRouter();

    return <main className="w-full h-fit flex flex-col items-center pb-8 min-h-[90vh]">

        {/* Unified responsive layout */}
        <section className="
        flex-1 flex flex-col
        w-full md:w-2xl lg:w-4xl
        px-8 md:px-0
        pb-16 md:pb-8 lg:pb-16
        ">
            {/* Return to Home Option */}
            <div className='text-sm italic text-gray-400 dark:text-gray-600 my-2 flex flex-row gap-2 items-center hover:underline hover:cursor-pointer uppercase' onClick={() => {router.push("/")}}>
                <ArrowLeft size={16}/>
                <span>Return to Home</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-col px-6 w-full h-fit items-center justify-center gap-3">
                <h1 className="text-3xl tracking-wider font-bold uppercase mb-2 flex flex-row items-center gap-2">
                    <PhoneCallIcon className="text-3xl text-rose-800" size={32}/>
                    Contact
                </h1>
            </div> 

            {/* Page Body */}
            <div className="flex flex-col lg:flex-row w-full h-fit overflow-hidden my-auto gap-8">

                {/* Text Block */}
                <div className="w-full bg-transparent flex flex-col items-center justify-center gap-3 text-center">
                    <h1 className="text-2xl tracking-wide text-justify">
                    Got a concern in mind? <b className="text-rose-800">Let's connect!</b>
                    </h1>
                    <p className="text-sm text-gray-700 dark:text-gray-400 text-justify max-w-lg">
                    I'm always up for a conversation about software engineering, web development, or the industry in general. The form below sends a message straight to my email — or if you'd rather reach out directly, I've listed a few social links below.
                    </p>
                    <div className="w-full grid grid-cols-2 grid-rows-auto gap-2">
                    <ContactButton icon={Briefcase} label="Facebook" href="..." />
                    <ContactButton icon={Mail} label="LinkedIn" href="..." />
                    <ContactButton icon={Code2} label="GitHub" href="..." />
                    <ContactButton icon={Code2} label="Communeye IG" href="..." />
                    </div>
                </div>

                {/* Form */}
                <div className="w-full flex items-center justify-center bg-radial from-slate-500/25 dark:from-slate-50/25 to-transparent to-70%">
                    <ContactForm />
                </div>

            </div>
        </section> 
    </main>
}