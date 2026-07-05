import { Code2, MapPin, GraduationCap, User, Braces, Lightbulb, CheckCircle } from "lucide-react";

const SELECTION_GRID_CONSTS = [
  { label: "How I Started", image: "/images/about_stock_images/stock_1.jpg" },
  { label: "Career Aspirations", image: "/images/about_stock_images/stock_2.jpg" },
  { label: "Thesis Experience", image: "/images/about_stock_images/stock_3.jpg" },
  { label: "Favorite Foods", image: "/images/about_stock_images/stock_4.jpg" },
  { label: "Hobbies & Pasttimes", image: "/images/about_stock_images/stock_5.jpg" },
  { label: "Industry Inspirations", image: "/images/about_stock_images/stock_6.jpg" },
];

// SelectionCard: Helper component for the selection grid
type SelectionCardProps = {
  label: string;
  image: string;
  onClick?: () => void;
};

const SelectionCard = ({ label, image, onClick }: SelectionCardProps) => {
  return (
    <button
      onClick={onClick}
      className="
        relative w-full aspect-3/4 rounded-xl overflow-hidden
        select-none cursor-pointer
        transition-transform duration-300
        hover:scale-[1.03]
      "
    >
      {/* Image */}
      <img
        src={image}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Glass layer */}
      <div className="absolute inset-0 backdrop-blur-sm border border-gray-400/50" />

      {/* Centered text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="
          px-12 py-16 rounded-xl
          bg-radial
          from-zinc-900/90
          to-transparent to-60%
        ">
          <h2 className="text-white text-3xl font-bold text-center">
            {label}
          </h2>
        </div>
      </div>
    </button>
  );
};

export default function AboutPage() {
  return (
    <main className="w-full h-fit min-h-[90vh] flex flex-col items-center">

      {/* Mobile layout: sm and below */}
      <section className="
        w-full
        flex flex-1 md:hidden 
        flex-col 
        gap-2 p-4
        bg-amber-500

        ">
        <h1>Mobile layout</h1>
        <img src="/photo.jpg" className="w-full" />
        <p>Stacked content...</p>
      </section>

      {/* Tablet layout: md only */}
      <section className="
        flex-1 hidden 
        md:flex lg:hidden 
        gap-4 p-6 
        bg-rose-500

        w-3xl
        ">
        <img src="/photo.jpg" className="w-1/3" />
        <p className="w-2/3">Two-column-ish content...</p>
      </section>

      {/* Desktop layout: lg and up */}
      <section className="
        flex-1
        hidden 
        lg:flex flex-col
        w-4xl
        pb-16">

        {/* Info Card/Row */}
        <div className="
            flex flex-row
            w-full h-36
        ">
            
            {/* Avatar */}
            <div className="
                relative
                h-full
                aspect-square 
                rounded-full
                overflow-hidden
                border-4
                border-rose-800
            ">
                <img
                  src="/images/hero_picture.jpg"
                  alt="Miguel Justin Bunda"
                  className="w-full h-full object-cover rounded-full"
                />
            </div>

            {/* Information */}
            <div className="
                flex-1 
                flex flex-col pl-8
            ">
                
                {/* Name Row */}
                <div className="
                    w-full h-1/3
                    flex
                    items-center
                    gap-2
                    text-lg uppercase font-semibold
                ">
                    <span>Miguel Justin Bunda</span>
                    <CheckCircle size={14} className="text-rose-800 dark:text-rose-500" />
                </div>

                {/* Subinfo Row */}
                <div className="
                    w-full flex-1 mt-4
                    grid grid-cols-4 gap-2
                ">
                    {/* Subinfo 1 */}
                    <div className="
                        w-full h-full
                        flex flex-col 
                    ">
                        <span className="text-lg font-bold">Mandaluyong</span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin size={14} />
                          Location
                        </span>
                    </div>
                    {/* Subinfo 2 */}
                    <div className="
                        w-full h-full
                        flex flex-col 
                    ">
                        <span className="text-lg font-bold">BSIT</span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <GraduationCap size={14} />
                          Course
                        </span>
                    </div>
                    {/* Subinfo 3 */}
                    <div className="
                        w-full h-full
                        flex flex-col 
                    ">
                        <span className="text-lg font-bold">Male</span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <User size={14} />
                          Gender
                        </span>
                    </div>
                    {/* Subinfo 4 */}
                    <div className="
                        w-full h-full
                        flex flex-col 
                    ">
                        <span className="text-lg font-bold">Python</span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <Braces size={14} />
                          First Language
                        </span>
                    </div>
                </div>
            </div>
        </div>

        {/* Major Card Row */}
        <div className="
            flex flex-row
            w-full h-24 
            my-4
        "> 
            <div className="
                relative
                overflow-hidden
                w-full h-full 
                flex flex-col 
                items-start justify-center
                rounded-lg 
                border border-slate-300 dark:border-slate-800
                backdrop-blur-md
                py-6 px-4
                
            ">
                {/* Glass base layer */}
                <div className="absolute inset-0 -z-10 bg-radial from-slate-500/40 via-slate-400/20 to-transparent dark:from-slate-500/20 dark:via-slate-400/5 dark:to-transparent" />

                <span className="
                    w-full h-fit
                    flex items-center gap-1
                    uppercase 
                    text-gray-500
                    font-semibold
                    text-sm
                    mb-1
                ">
                  <Lightbulb size={16} />
                  Helpful Tip
                </span>
                <span className="w-full h-fit text-sm">The cards below are interactable! Click on them and a modal will pop up.</span>
            </div>
        </div>

        {/* Selection Grid */}
        <div className="w-full h-full grid grid-cols-3 gap-4">
            {SELECTION_GRID_CONSTS.map((card) => (
                <SelectionCard
                key={card.label}
                label={card.label}
                image={card.image}
                />
            ))}
        </div>
      </section>
    </main>
  );
}
