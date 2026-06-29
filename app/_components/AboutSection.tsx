import { ABOUT_ME_INFO } from "@/lib/constants"
import { User } from "lucide-react"
import { AboutMeCard } from "./cards"

// AboutSection: Dedicated section for a small summary of myself
export const AboutSection = () => {
  return <section className="w-full aspect-video flex flex-col pb-12">
    <div className="flex flex-col px-6 py-4 w-full h-fit items-center justify-center gap-3 ">
      <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-400">About Me</h1>
    </div>
    <div className="flex flex-1 w-full h-fill px-8 pb-8 gap-4 align-middle justify-center">
      <div className="flex-1 bg-transparent flex flex-col items-center py-2 px-4 lg:py-4 lg:px-6 gap-3">
        <div className="border-3 border-slate-950 dark:border-slate-50 rounded-full bg-transparent w-12 lg:w-20 h-12 lg:h-20 flex items-center justify-center align-middle">
          <User className="w-6 lg:w-10 h-6 lg:h-10 text-slate-950 dark:text-slate-50"/>
        </div>
        <h1 className="text-lg lg:text-2xl font-bold tracking-wide">Who is <span className="text-rose-800">Migo?</span></h1>
        <p className="w-full text-justify text-gray-700 dark:text-gray-300 text-xs md:text-sm lg:text-base">
          <b>Miguel Justin Bunda</b> is a software engineer dedicated to building modern, technical solutions that put people first. A graduate of Don Bosco Technical College in Mandaluyong City with a Bachelor of Science in Information Technology, Migo earned Magna Cum Laude honors, a Service Award, and the distinction of Batch Valedictorian.
        </p>
        <p className="w-full text-justify text-gray-700 dark:text-gray-300 text-xs md:text-sm lg:text-base">
          Migo first started programming by developing simple web pages on his laptop. Raw HTML, CSS, with little JavaScript. Now, Migo primarily uses both <b>TypeScript</b> and <b>Python</b>, along with a consortium of languages, frameworks, and technologies such as GitHub, Docker, AWS, Nextjs, Supabase, and more.
        </p>
      </div>
      <div className="flex-1 flex items-center justify-center bg-radial from-slate-500/25 dark:from-slate-50/25 to-transparent to-70%">
        <div className="w-full h-full grid grid-cols-2 gap-4 m-auto">
            {ABOUT_ME_INFO.map((item) => (
              <AboutMeCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                value={item.value}
                className="h-full"
              />
            ))}
        </div>
      </div>
      
    </div>
  </section>
}

export const AboutSectionSmall = () => {
  return <section className="w-full aspect-video flex flex-col pb-4">
    <div className="flex flex-col px-6 w-full h-fit items-center justify-center gap-3 ">
      <h1 className="text-2xl lg:text-4xl tracking-wider font-bold uppercase text-slate-400">About Me</h1>
    </div>
    <div className="flex flex-col flex-1 w-full h-fill px-8 pb-8 gap-4 align-middle justify-center">
      <div className="flex-1 bg-transparent flex flex-col items-center py-2 px-4 lg:py-4 lg:px-6 gap-3">
        <div className="border-3 border-slate-950 dark:border-slate-50 rounded-full bg-transparent w-12 lg:w-20 h-12 lg:h-20 flex items-center justify-center align-middle">
          <User className="w-6 lg:w-10 h-6 lg:h-10 text-slate-950 dark:text-slate-50"/>
        </div>
        <h1 className="text-lg lg:text-2xl font-bold tracking-wide">Who is <span className="text-rose-800">Migo?</span></h1>
        <p className="w-full text-justify text-gray-700 dark:text-gray-300 text-xs md:text-sm lg:text-base">
          <b>Miguel Justin Bunda</b> is a software engineer dedicated to building modern, technical solutions that put people first. A graduate of Don Bosco Technical College in Mandaluyong City with a Bachelor of Science in Information Technology, Migo earned Magna Cum Laude honors, a Service Award, and the distinction of Batch Valedictorian.
        </p>
        <p className="w-full text-justify text-gray-700 dark:text-gray-300 text-xs md:text-sm lg:text-base">
          Migo first started programming by developing simple web pages on his laptop. Raw HTML, CSS, with little JavaScript. Now, Migo primarily uses both <b>TypeScript</b> and <b>Python</b>, along with a consortium of languages, frameworks, and technologies such as GitHub, Docker, AWS, Nextjs, Supabase, and more.
        </p>
      </div>

      <div className="mx-4 flex gap-3 overflow-x-auto pb-2">
        {ABOUT_ME_INFO.map((item) => (
          <AboutMeCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            value={item.value}
            className="aspect-5/3 min-w-fit"
          />
        ))}
      </div>
    </div>
  </section>
}