import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-slate-50 dark:bg-slate-950">

      {/* Header */}
      <div className="flex flex-row px-4 sm:px-8 py-4 w-full bg-rose-800">

        {/* Header Title & Logo */}
        <div className="flex-1 bg-yellow-300">
          Logo and Project Name
        </div>

        {/* Header Links (Web & Tablet) */}
        <div className="hidden sm:block flex-1 bg-green-300 text-right">
          Skills | Experience | Education | Projects | Blog
        </div>

        {/* Header Links (Mobiles) */}
        <div className="block sm:hidden flex-1 bg-green-300 text-right">
          Hamburger Menu
        </div>

      </div>

      {/* Main Content */}
      <main className="flex flex-1 w-full max-w-7xl flex-col items-center justify-between py-8 px-12 sm:items-start bg-slate-300">
        Boss Portfolio ko pala
      </main>
    </div>
  );
}
